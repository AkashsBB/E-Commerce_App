import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async({name, email, password, confirmPassword}) => {
    set({ loading: true });
    if(password !== confirmPassword){
      set({ loading: false});
      return toast.error("Password do not match");
    }

    try{
      const res = await axios.post("/auth/signup", {name, email, password});
      set({user: res.data, loading:false});
    }catch(error){
      set({loading:false});
      toast.error(error.response.data.message || "An error occured");

    }
  },

  login: async (email, password) => {
    try {
      set({ loading: true });
      // Create a new axios instance without interceptors for login
      const loginAxios = axios.create({
        baseURL: axios.defaults.baseURL,
        withCredentials: true
      });
      
      const res = await loginAxios.post("/auth/login", { email, password });
      set({ user: res.data, loading: false });
      toast.success('Logged in successfully!');
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Invalid email or password";
      set({ loading: false, error: errorMessage });
      toast.error(errorMessage);
      throw error; // Re-throw to be handled by the component
    }
  },

  logout: async() => {
    try{
      await axios.post("/auth/logout");
      set({ user: null})
      toast.success('Logout is successfully!');

    }catch(error){
      toast.error(error.response?.data?.message || "An error occured during logout");
    }
  },

  checkAuth: async() => {
    set({ checkingAuth: true});
    try{
      const response = await axios.get("/auth/profile");
      set({user:response.data, checkingAuth: false});
    }catch(error){
      set({checkingAuth: false, user: null});
    }
  },

  refreshToken: async () => {
		// Prevent multiple simultaneous refresh attempts
		if (get().checkingAuth) return;

		set({ checkingAuth: true });
		try {
			const response = await axios.post("/auth/refresh-token");
			set({ checkingAuth: false });
			return response.data;
		} catch (error) {
			set({ user: null, checkingAuth: false });
			throw error;
		}
	},
}));

// Skip token refresh for these paths
const skipRefreshForPaths = ['/auth/login', '/auth/signup', '/auth/refresh-token'];

let refreshPromise = null;

// Request interceptor to add auth header and skip refresh for specific requests
axios.interceptors.request.use(config => {
  if (skipRefreshForPaths.some(path => config.url.includes(path))) {
    config._skipAuth = true;
  }
  return config;
});

// Response interceptor for handling token refresh
axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    // Skip interceptor for login/signup/refresh-token or if already retried
    if (originalRequest._skipAuth || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Only handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      originalRequest._retry = true;

      try {
        // If a refresh is already in progress, wait for it to complete
        if (!refreshPromise) {
          refreshPromise = useUserStore.getState().refreshToken()
            .finally(() => {
              refreshPromise = null;
            });
        }
        
        await refreshPromise;
        
        // Retry the original request with new token
        return axios(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear user state
        useUserStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
