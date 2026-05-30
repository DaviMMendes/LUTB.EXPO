import { create } from "zustand";
import { supabase } from "../lib/supabase";

export const useAuthStore = create((set) => ({
  user: null,
  session: null,
  loading: false,
  error: null,

  loadSession: async () => {
    set({ loading: true, error: null });

    const { data, error } = await supabase.auth.getSession();

    if (error) {
      set({ loading: false, error: error.message });
      return;
    }

    set({
      session: data.session,
      user: data.session?.user ?? null,
      loading: false,
    });
  },

  login: async (email, password) => {
    set({ loading: true, error: null });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      set({ loading: false, error: error.message });
      return false;
    }

    set({
      session: data.session,
      user: data.user,
      loading: false,
    });

    return true;
  },

  signup: async (email, password) => {
    set({ loading: true, error: null });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      set({ loading: false, error: error.message });
      return false;
    }

    set({
      session: data.session,
      user: data.user,
      loading: false,
    });

    return true;
  },

  logout: async () => {
    set({ loading: true, error: null });

    await supabase.auth.signOut();

    set({
      user: null,
      session: null,
      loading: false,
      error: null,
    });
  },
}));