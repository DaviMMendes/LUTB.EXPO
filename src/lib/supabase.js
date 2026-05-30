export const supabase = {
  auth: {
    getSession: async () => {
      return {
        data: {
          session: null,
        },
        error: null,
      };
    },

    signInWithPassword: async () => {
      return {
        data: {
          session: null,
          user: null,
        },
        error: {
          message: "Supabase ainda não configurado.",
        },
      };
    },

    signUp: async () => {
      return {
        data: {
          session: null,
          user: null,
        },
        error: {
          message: "Supabase ainda não configurado.",
        },
      };
    },

    signOut: async () => {
      return {
        error: null,
      };
    },
  },
};