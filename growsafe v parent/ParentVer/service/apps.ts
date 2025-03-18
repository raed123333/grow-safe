import axiosInstance from "@/lib/config";
import { saveToken } from "../lib/TokenManager";

export const getEnfantApps = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get("/parents/apps/get-apps");

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
    const response = await axiosInstance.post("/parents/apps/lock-apps", {
      packageName,
      password,
    });
    return response.data;
  } catch (error) {
    console.log("Error locking app:", error);
    throw error;
  }
};
