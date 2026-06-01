import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export const useAuthStore = create((set, get) => ({
  usuario: null,
  autenticado: false,
  carregando: false,
  ultimaAcao: 'Nenhuma ação executada',
  modo: 'supabase',

  inicializar: async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session?.user) {
      set({
        usuario: {
          id: data.session.user.id,
          email: data.session.user.email,
          nome: data.session.user.user_metadata?.nome || data.session.user.email,
          tipo: 'Usuário comum',
          status: 'Sessão ativa',
        },
        autenticado: true,
        ultimaAcao: 'Sessão restaurada',
      });
    }
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        set({
          usuario: {
            id: session.user.id,
            email: session.user.email,
            nome: session.user.user_metadata?.nome || session.user.email,
            tipo: 'Usuário comum',
            status: 'Sessão ativa',
          },
          autenticado: true,
          ultimaAcao: 'Auth atualizada',
        });
      } else {
        set({ usuario: null, autenticado: false, ultimaAcao: 'Sessão encerrada' });
      }
    });
  },

  login: async ({ email, senha }) => {
    const emailTratado = String(email || '').trim().toLowerCase();
    const senhaTratada = String(senha || '').trim();
    if (!emailTratado || !senhaTratada) return { sucesso: false, mensagem: 'Informe email e senha.' };
    set({ carregando: true });
    const { data, error } = await supabase.auth.signInWithPassword({ email: emailTratado, password: senhaTratada });
    set({ carregando: false });
    if (error) return { sucesso: false, mensagem: error.message };
    set({
      usuario: {
        id: data.user.id,
        email: data.user.email,
        nome: data.user.user_metadata?.nome || data.user.email,
        tipo: 'Usuário comum',
        status: 'Logado',
      },
      autenticado: true,
      ultimaAcao: `Login realizado para ${emailTratado}`,
    });
    return { sucesso: true, mensagem: 'Login realizado com sucesso.' };
  },

  cadastrar: async ({ nome, email, senha, confirmarSenha }) => {
    const nomeTratado = String(nome || '').trim();
    const emailTratado = String(email || '').trim().toLowerCase();
    const senhaTratada = String(senha || '').trim();
    const confirmarSenhaTratada = String(confirmarSenha || '').trim();
    if (!nomeTratado || !emailTratado || !senhaTratada || !confirmarSenhaTratada)
      return { sucesso: false, mensagem: 'Preencha todos os campos.' };
    if (senhaTratada !== confirmarSenhaTratada)
      return { sucesso: false, mensagem: 'As senhas não são iguais.' };
    if (senhaTratada.length < 6)
      return { sucesso: false, mensagem: 'A senha precisa ter pelo menos 6 caracteres.' };
    set({ carregando: true });
    const { data, error } = await supabase.auth.signUp({
      email: emailTratado,
      password: senhaTratada,
      options: { data: { nome: nomeTratado } },
    });
    set({ carregando: false });
    if (error) return { sucesso: false, mensagem: error.message };
    set({
      usuario: {
        id: data.user.id,
        email: data.user.email,
        nome: nomeTratado,
        tipo: 'Usuário comum',
        status: 'Cadastrado',
      },
      autenticado: true,
      ultimaAcao: `Cadastro realizado para ${emailTratado}`,
    });
    return { sucesso: true, mensagem: 'Conta criada com sucesso.' };
  },

  logout: async () => {
    const usuarioAtual = get().usuario;
    await supabase.auth.signOut();
    set({
      usuario: null,
      autenticado: false,
      ultimaAcao: usuarioAtual
        ? `Logout realizado para ${usuarioAtual.email}`
        : 'Logout realizado',
    });
    return { sucesso: true, mensagem: 'Logout realizado com sucesso.' };
  },

  carregarUsuarioMock: () => {
    set({
      usuario: {
        id: 'mock-user-1',
        nome: 'Cliente LUTB',
        email: 'cliente@lutb.com',
        tipo: 'Usuário comum',
        status: 'Sessão mockada',
      },
      autenticado: true,
      ultimaAcao: 'Usuário mock carregado manualmente',
    });
  },
}));