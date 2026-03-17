import axios from "axios";

// Use your computer's LAN IP for testing on physical device
// e.g., http://192.168.1.X:3001
const BASE_URL = "http://localhost:3001";

const USE_MOCK = true; // Toggle for demo

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auto-attach JWT token
apiClient.interceptors.request.use((config) => {
  // Token would come from store in real app
  const token = "mock-jwt-token";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn("API Error:", error.message);
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authApi = {
  login: async (email: string, password: string) => {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 1000));
      return { token: "mock-token", user: { id: "u1", email, name: "Demo User" } };
    }
    const res = await apiClient.post("/auth/login", { email, password });
    return res.data;
  },

  register: async (name: string, email: string, password: string) => {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 1200));
      return { token: "mock-token", user: { id: "u1", email, name } };
    }
    const res = await apiClient.post("/auth/register", { name, email, password });
    return res.data;
  },
};

// Lessons endpoints
export const lessonsApi = {
  getModules: async () => {
    if (USE_MOCK) {
      const { MODULES } = await import("../data/mockData");
      return MODULES;
    }
    const res = await apiClient.get("/lessons/modules");
    return res.data;
  },

  getLessons: async (moduleId: string) => {
    if (USE_MOCK) {
      const { LESSONS } = await import("../data/mockData");
      return LESSONS[moduleId] || [];
    }
    const res = await apiClient.get(`/lessons/${moduleId}`);
    return res.data;
  },

  completeLesson: async (lessonId: string, score: number) => {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 500));
      return { xpAwarded: 100, xlmAwarded: 0.5, nftMinted: false };
    }
    const res = await apiClient.post(`/lessons/${lessonId}/complete`, { score });
    return res.data;
  },
};

// Quiz endpoints
export const quizApi = {
  getQuiz: async (lessonId: string) => {
    if (USE_MOCK) {
      const { QUIZZES } = await import("../data/mockData");
      return QUIZZES[lessonId] || null;
    }
    const res = await apiClient.get(`/quiz/${lessonId}`);
    return res.data;
  },
};

// Profile endpoints
export const profileApi = {
  getCertificates: async () => {
    if (USE_MOCK) {
      const { CERTIFICATES } = await import("../data/mockData");
      return CERTIFICATES;
    }
    const res = await apiClient.get("/profile/certificates");
    return res.data;
  },

  getLeaderboard: async () => {
    if (USE_MOCK) {
      const { LEADERBOARD } = await import("../data/mockData");
      return LEADERBOARD;
    }
    const res = await apiClient.get("/leaderboard");
    return res.data;
  },
};

export default apiClient;
