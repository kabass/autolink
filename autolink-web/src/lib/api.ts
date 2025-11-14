const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export interface ApiUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'BUYER' | 'SELLER' | 'SUPERVISOR';
  isVerified: boolean;
  city?: string;
  birthDate?: string;
  gender?: 'MALE' | 'FEMALE';
  createdAt: string;
  canSell: boolean;
  canBuy: boolean;
  canRent: boolean;
  canSupervise: boolean;
  canManageUsers: boolean;
}

export interface ApiVehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  rentalPricePerDay?: number;
  rentalPricePerWeek?: number;
  rentalPricePerMonth?: number;
  mileage: number;
  fuelType: 'ESSENCE' | 'DIESEL' | 'ELECTRIC' | 'HYBRID';
  transmission: 'MANUELLE' | 'AUTOMATIQUE';
  seats: number;
  doors?: number;
  color?: string;
  condition?: string;
  isRental: boolean;
  description?: string;
  images: string[];
  features: string[];
  city: string;
  latitude?: number;
  longitude?: number;
  availableFrom?: string;
  availableTo?: string;
  pickupLocation?: string;
  views: number;
  favoritesCount: number;
  isActive: boolean;
  userId: number;
  userFirstName: string;
  userLastName: string;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleSearchParams {
  query?: string;
  make?: string;
  model?: string;
  city?: string;
  maxMileage?: string;
  type?: string;
  minPrice?: string;
  maxPrice?: string;
  minYear?: string;
  maxYear?: string;
  fuelType?: string;
  transmission?: string;
  page?: number;
  size?: number;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<ApiUser> {
    return this.request<ApiUser>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    role?: 'BUYER' | 'SELLER' | 'SUPERVISOR';
    city?: string;
  }): Promise<ApiUser> {
    return this.request<ApiUser>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getCurrentUser(email: string): Promise<ApiUser> {
    return this.request<ApiUser>(`/auth/me?email=${encodeURIComponent(email)}`);
  }
  
  async completeSocialLogin(data: { code: string; redirectUri: string }): Promise<ApiUser> {
    return this.request<ApiUser>('/auth/social/callback', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
  // Vehicle endpoints
  async searchVehicles(params: VehicleSearchParams): Promise<PageResponse<ApiVehicle>> {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });
    return this.request<PageResponse<ApiVehicle>>(`/vehicles?${queryParams.toString()}`);
  }

  async getVehicleById(id: number): Promise<ApiVehicle> {
    return this.request<ApiVehicle>(`/vehicles/${id}`);
  }

  async createVehicle(userId: number, vehicle: Partial<ApiVehicle>): Promise<ApiVehicle> {
    return this.request<ApiVehicle>(`/vehicles?userId=${userId}`, {
      method: 'POST',
      body: JSON.stringify(vehicle),
    });
  }

  async updateVehicle(id: number, userId: number, vehicle: Partial<ApiVehicle>): Promise<ApiVehicle> {
    return this.request<ApiVehicle>(`/vehicles/${id}?userId=${userId}`, {
      method: 'PUT',
      body: JSON.stringify(vehicle),
    });
  }

  async deleteVehicle(id: number, userId: number): Promise<void> {
    return this.request<void>(`/vehicles/${id}?userId=${userId}`, {
      method: 'DELETE',
    });
  }

  async getUserVehicles(userId: number, page: number = 0, size: number = 20): Promise<PageResponse<ApiVehicle>> {
    return this.request<PageResponse<ApiVehicle>>(`/vehicles/user/${userId}?page=${page}&size=${size}`);
  }

  async incrementViews(id: number): Promise<void> {
    return this.request<void>(`/vehicles/${id}/view`, {
      method: 'POST',
    });
  }

  // Favorite endpoints
  async addFavorite(userId: number, vehicleId: number): Promise<void> {
    return this.request<void>(`/favorites?userId=${userId}&vehicleId=${vehicleId}`, {
      method: 'POST',
    });
  }

  async removeFavorite(userId: number, vehicleId: number): Promise<void> {
    return this.request<void>(`/favorites?userId=${userId}&vehicleId=${vehicleId}`, {
      method: 'DELETE',
    });
  }

  async isFavorite(userId: number, vehicleId: number): Promise<boolean> {
    return this.request<boolean>(`/favorites/check?userId=${userId}&vehicleId=${vehicleId}`);
  }

  async getUserFavorites(userId: number, page: number = 0, size: number = 20): Promise<PageResponse<ApiVehicle>> {
    return this.request<PageResponse<ApiVehicle>>(`/favorites/user/${userId}?page=${page}&size=${size}`);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

// Helper function to convert API user to frontend user format
export function mapApiUserToUser(apiUser: ApiUser) {
  return {
    id: String(apiUser.id),
    firstName: apiUser.firstName,
    lastName: apiUser.lastName,
    email: apiUser.email,
    phone: apiUser.phone,
    avatar: apiUser.avatar,
    isVerified: apiUser.isVerified,
    role: apiUser.role.toLowerCase() as 'buyer' | 'seller' | 'supervisor',
    permissions: {
      canSell: apiUser.canSell,
      canBuy: apiUser.canBuy,
      canRent: apiUser.canRent,
      canSupervise: apiUser.canSupervise,
      canManageUsers: apiUser.canManageUsers,
    },
  };
}

// Helper function to convert API vehicle to frontend vehicle format
export function mapApiVehicleToVehicle(apiVehicle: ApiVehicle) {
  return {
    id: String(apiVehicle.id),
    make: apiVehicle.make,
    model: apiVehicle.model,
    year: apiVehicle.year,
    price: apiVehicle.price,
    mileage: apiVehicle.mileage,
    fuelType: apiVehicle.fuelType,
    transmission: apiVehicle.transmission,
    seats: apiVehicle.seats,
    doors: apiVehicle.doors,
    color: apiVehicle.color,
    condition: apiVehicle.condition,
    imageUrl: apiVehicle.images && apiVehicle.images.length > 0 ? apiVehicle.images[0] : '',
    images: apiVehicle.images || [],
    isRental: apiVehicle.isRental,
    rentalPricePerDay: apiVehicle.rentalPricePerDay,
    rentalPricePerWeek: apiVehicle.rentalPricePerWeek,
    rentalPricePerMonth: apiVehicle.rentalPricePerMonth,
    city: apiVehicle.city,
    description: apiVehicle.description,
    features: apiVehicle.features || [],
    views: apiVehicle.views,
    favoritesCount: apiVehicle.favoritesCount,
    availableFrom: apiVehicle.availableFrom,
    availableTo: apiVehicle.availableTo,
    pickupLocation: apiVehicle.pickupLocation,
  };
}

