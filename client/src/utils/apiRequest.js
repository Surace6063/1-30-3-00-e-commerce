import axios from "axios"
import { useUserStore } from "../zustand/userStore"

const BASE_URL = "http://127.0.0.1:8000/api"


export const apiRequest = axios.create({
    baseURL: BASE_URL
})

// attach access token automatically
apiRequest.interceptors.request.use(
  (config) => {
    // correct way to get Zustand store data outside React components
    const { user } = useUserStore.getState();

    if (user?.access) {
      config.headers.Authorization = `Bearer ${user.access}`;
    }

    return config;
  }
);