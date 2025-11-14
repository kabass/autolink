#!/bin/sh
set -euo pipefail

KEYCLOAK_CMD="/opt/keycloak/bin/kc.sh start-dev --import-realm"

echo "▶️  Starting Keycloak with realm import..."
$KEYCLOAK_CMD &
KC_PID=$!

CONFIG_FILE=/tmp/kcadm.config
export KCADM_CONFIG="$CONFIG_FILE"
KCADM="/opt/keycloak/bin/kcadm.sh"
SOCIAL_REDIRECT="${SOCIAL_REDIRECT_URI:-http://localhost:3000/auth/social/callback}"
WEB_ORIGIN="${KEYCLOAK_WEB_ORIGIN:-http://localhost:3000}"
IDP_DISABLE_TRUST_MANAGER="${KEYCLOAK_IDP_DISABLE_TRUST_MANAGER:-false}"

login_kcadm() {
  echo "⏳ Waiting for Keycloak admin API..."
  until $KCADM config credentials \
      --server http://localhost:8080 \
      --realm master \
      --user "${KEYCLOAK_ADMIN:-admin}" \
      --password "${KEYCLOAK_ADMIN_PASSWORD:-admin}" >/dev/null 2>&1; do
    sleep 2
  done
  echo "✅ Connected to Keycloak admin API."
}

wait_for_realm() {
  echo "⏳ Waiting for realm 'autolink' to become available..."
  until $KCADM get realms/autolink >/dev/null 2>&1; do
    sleep 2
  done
  echo "✅ Realm autolink detected."
}

configure_autolink_client() {
  CLIENT_INTERNAL_ID=$($KCADM get clients -r autolink -q clientId=autolink-api --fields id | sed -n 's/.*"id" : "\(.*\)".*/\1/p' | head -n1)
  if [ -z "$CLIENT_INTERNAL_ID" ]; then
    echo "⚠️  Unable to locate autolink-api client. Skipping client configuration."
    return
  fi
  
  echo "⚙️  Updating autolink-api client configuration..."
  $KCADM update "clients/$CLIENT_INTERNAL_ID" -r autolink \
    -s standardFlowEnabled=true \
    -s implicitFlowEnabled=false \
    -s directAccessGrantsEnabled=true \
    -s publicClient=false \
    -s "redirectUris=[\"$SOCIAL_REDIRECT\"]" \
    -s "webOrigins=[\"$WEB_ORIGIN\"]"
}

ensure_idp() {
  alias="$1"
  provider="$2"
  shift 2

  if $KCADM get "identity-provider/instances/$alias" -r autolink >/dev/null 2>&1; then
    echo "↻ Updating identity provider '$alias'..."
    $KCADM update "identity-provider/instances/$alias" -r autolink "$@"
  else
    echo "➕ Creating identity provider '$alias'..."
    $KCADM create identity-provider/instances -r autolink \
      -s alias="$alias" \
      -s providerId="$provider" \
      "$@"
  fi
}

configure_google() {
  if [ -z "${GOOGLE_CLIENT_ID:-}" ] || [ -z "${GOOGLE_CLIENT_SECRET:-}" ]; then
    echo "⚠️  GOOGLE_CLIENT_ID/SECRET not set. Skipping Google provider."
    return
  fi

  ensure_idp google google \
    -s enabled=true \
    -s storeToken=true \
    -s trustEmail=true \
    -s "firstBrokerLoginFlowAlias=first broker login" \
    -s "config.disableTrustManager=$IDP_DISABLE_TRUST_MANAGER" \
    -s "config.clientId=$GOOGLE_CLIENT_ID" \
    -s "config.clientSecret=$GOOGLE_CLIENT_SECRET" \
    -s "config.defaultScope=profile email"
}

configure_facebook() {
  if [ -z "${FACEBOOK_CLIENT_ID:-}" ] || [ -z "${FACEBOOK_CLIENT_SECRET:-}" ]; then
    echo "⚠️  FACEBOOK_CLIENT_ID/SECRET not set. Skipping Facebook provider."
    return
  fi

  ensure_idp facebook facebook \
    -s enabled=true \
    -s storeToken=true \
    -s trustEmail=true \
    -s "firstBrokerLoginFlowAlias=first broker login" \
    -s "config.disableTrustManager=$IDP_DISABLE_TRUST_MANAGER" \
    -s "config.clientId=$FACEBOOK_CLIENT_ID" \
    -s "config.clientSecret=$FACEBOOK_CLIENT_SECRET" \
    -s "config.defaultScope=email,public_profile"
}

login_kcadm
wait_for_realm
configure_autolink_client
configure_google
configure_facebook

wait "$KC_PID"

