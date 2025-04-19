import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  username: string;
  password: string;
  role: string;
}

interface UserState {
  user: { username: string; role: string } | null;
  isLoggedIn: boolean;
  error: string | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

// Mock user credentials
const mockUsers: User[] = [
  { username: "admin", password: "admin", role: "admin" },
  { username: "user", password: "user", role: "user" },
];

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      error: null,
      login: (username, password) => {
        const user = mockUsers.find(
          (u) => u.username === username && u.password === password
        );

        if (user) {
          set({
            user: { username: user.username, role: user.role },
            isLoggedIn: true,
            error: null,
          });
        } else {
          set({
            user: null,
            isLoggedIn: false,
            error: "Invalid username or password",
          });
        }
      },
      logout: () =>
        set({
          user: null,
          isLoggedIn: false,
          error: null,
        }),
    }),
    {
      name: "user-store", // Key for localStorage
    }
  )
);

export default useUserStore;