import axiosInstance from "@/lib/config";
import { saveToken } from "../lib/TokenManager";

export const getEnfantApps = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get("/parents/apps/get-apps/4");

    return response.data.apps;
  } catch (error) {
    console.log("Error fetching apps:", error);
    throw error;
  }
};

export const lockEnfantApps = async (
  packageName: string,
  password: string
): Promise<any> => {
  try {
    const response = await axiosInstance.post("/parents/apps/lock-apps/4", {
      packageName,
      password,
    });
    return response.data;
  } catch (error) {
    
    console.log("Error locking app:", error);
    throw error;
  }
};


export const linkEnfantToParent = async (idp: number, idenf: number): Promise<any> => {
  try {
    const response = await axiosInstance.post(`/parents/link/${idp}/${idenf}`);
    return response.data;
  } catch (error) {
    console.log("Error linking enfant to parent:", error);
    throw error;
  }
};