import { create } from "zustand";

const usuarioInicial = {
  id: "mock-user-1",
  nome: "Cliente LUTB",
  email: "cliente@lutb.com",
  tipo: "Usuário comum",
  status: "Sessão mockada",
};

export const useAuthStore = create((set, get) => ({
  usuario: null,
  autenticado: false,
  modo: "mock",
  ultimaAcao: "Nenhuma ação executada",

  login: async ({ email, senha }) => {
    const emailTratado = String(email || "").trim().toLowerCase();
    const senhaTratada = String(senha || "").trim();

    if (!emailTratado || !senhaTratada) {
      return {
        sucesso: false,
        mensagem: "Informe email e senha.",
      };
    }

    const usuarioLogado = {
      ...usuarioInicial,
      email: emailTratado,
      status: "Logado por autenticação temporária",
    };

    set({
      usuario: usuarioLogado,
      autenticado: true,
      ultimaAcao: `Login temporário realizado para ${emailTratado}`,
    });

    return {
      sucesso: true,
      mensagem: "Login temporário realizado com sucesso.",
      usuario: usuarioLogado,
    };
  },

  cadastrar: async ({ nome, email, senha, confirmarSenha }) => {
    const nomeTratado = String(nome || "").trim();
    const emailTratado = String(email || "").trim().toLowerCase();
    const senhaTratada = String(senha || "").trim();
    const confirmarSenhaTratada = String(confirmarSenha || "").trim();

    if (!nomeTratado || !emailTratado || !senhaTratada || !confirmarSenhaTratada) {
      return {
        sucesso: false,
        mensagem: "Preencha todos os campos.",
      };
    }

    if (senhaTratada !== confirmarSenhaTratada) {
      return {
        sucesso: false,
        mensagem: "As senhas não são iguais.",
      };
    }

    if (senhaTratada.length < 6) {
      return {
        sucesso: false,
        mensagem: "A senha precisa ter pelo menos 6 caracteres.",
      };
    }

    const novoUsuario = {
      id: `mock-user-${Date.now()}`,
      nome: nomeTratado,
      email: emailTratado,
      tipo: "Usuário comum",
      status: "Cadastrado por autenticação temporária",
    };

    set({
      usuario: novoUsuario,
      autenticado: true,
      ultimaAcao: `Cadastro temporário realizado para ${emailTratado}`,
    });

    return {
      sucesso: true,
      mensagem: "Cadastro temporário realizado com sucesso.",
      usuario: novoUsuario,
    };
  },

  logout: async () => {
    const usuarioAtual = get().usuario;

    set({
      usuario: null,
      autenticado: false,
      ultimaAcao: usuarioAtual
        ? `Logout temporário realizado para ${usuarioAtual.email}`
        : "Logout temporário realizado",
    });

    return {
      sucesso: true,
      mensagem: "Logout temporário realizado com sucesso.",
    };
  },

  carregarUsuarioMock: () => {
    set({
      usuario: usuarioInicial,
      autenticado: true,
      ultimaAcao: "Usuário mock carregado manualmente",
    });
  },
}));
