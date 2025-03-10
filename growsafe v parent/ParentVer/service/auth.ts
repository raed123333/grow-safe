import axiosInstance from "@/lib/config"
import { saveToken } from "../lib/TokenManager";
export interface LoginRequest {
  email: string;
  motpasse: string;

}

export interface SignupRequest {
        idp: string;
        nom: string;
        prenom: string;
        image: string;
        email: string;
        motpasse:String;
}

export interface AuthResponse {
    idp: string;
    nom: string;
    prenom: string;
    image: string;
    email: string;
    motpasse:String;
  
}


export const login = async (loginData: LoginRequest): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>('/parents/login', loginData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signup = async (signupData: SignupRequest): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>('/parents', signupData);
    return response.data;
  } catch (error) {
    throw error;
  }
};