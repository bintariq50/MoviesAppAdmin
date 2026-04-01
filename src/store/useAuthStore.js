
import { create } from "zustand"
import auth from "@react-native-firebase/auth"

export const useAuthStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    login: async (email, password) => {
        try {
            const result = await auth().signInWithEmailAndPassword(email, password)
            set({ user: result.user })
        } catch (error) {
            throw error
        }
    },

    logout: async () => {
        try {
            await auth().signOut();
            set({ user: null })

        } catch (error) {
            throw error
        }
    }

}))