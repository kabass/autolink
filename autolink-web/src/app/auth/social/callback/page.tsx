"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { apiClient } from "@/lib/api"
import { Button } from "@/components/ui/button"

export default function SocialCallbackPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { setUserFromApi } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(true)

  useEffect(() => {
    const code = searchParams.get("code")
    const state = searchParams.get("state")

    if (!code) {
      setError("Code de connexion manquant.")
      setIsProcessing(false)
      return
    }

    const storedState = typeof window !== "undefined" ? localStorage.getItem("autolink_social_state") : null
    if (storedState && state !== storedState) {
      setError("La vérification de l'état a échoué. Veuillez réessayer.")
      setIsProcessing(false)
      return
    }

    if (typeof window !== "undefined") {
      localStorage.removeItem("autolink_social_state")
    }

    const redirectUri =
      process.env.NEXT_PUBLIC_SOCIAL_REDIRECT_URI ||
      (typeof window !== "undefined" ? `${window.location.origin}/auth/social/callback` : "")

    const completeLogin = async () => {
      try {
        const apiUser = await apiClient.completeSocialLogin({ code, redirectUri })
        setUserFromApi(apiUser)
        router.replace("/")
      } catch (e) {
        console.error(e)
        setError("Impossible de finaliser la connexion sociale. Merci de réessayer.")
        setIsProcessing(false)
      }
    }

    completeLogin()
  }, [searchParams, router, setUserFromApi])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-2xl font-semibold mb-4">Connexion en cours...</h1>
        {isProcessing && !error && (
          <p className="text-gray-600">
            Merci de patienter pendant que nous finalisons votre connexion.
          </p>
        )}
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200">
            <p className="mb-4">{error}</p>
            <Button asChild>
              <Link href="/auth">Revenir à la page de connexion</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

