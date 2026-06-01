import { create } from 'zustand';
import { mockCategorias } from '../data/mockCategorias';
import { supabase } from '../lib/supabase';

function normalizarCategoria(c) {
  return {
    id: c.id || '',
    nome: c.nome || '',
    descricao: c.descricao || '',
    destaque: Boolean(c.destaque),
  };
}

export const useCategoriasStore = create((set, get) => ({
  categorias: [],
  carregando: false,
  erro: null,
  resetVersaoCategorias: 0,

  carregarCategorias: async () => {
    set({ carregando: true, erro: null });
    const { data, error } = await supabase.from('categorias').select('*').order('nome');
    if (error) {
      set({ erro: error.message, carregando: false, categorias: mockCategorias.map(normalizarCategoria) });
      return;
    }
    set({ categorias: data.map(normalizarCategoria), carregando: false });
  },

  buscarCategoriaPorId: (id) => {
    return get().categorias.find((c) => String(c.id) === String(id)) || null;
  },

  restaurarCategoriasDoMock: async () => {
    await supabase.from('categorias').delete().neq('id', '');
    const inserts = mockCategorias.map(normalizarCategoria);
    await supabase.from('categorias').insert(inserts);
    set((state) => ({
      categorias: mockCategorias.map(normalizarCategoria),
      resetVersaoCategorias: state.resetVersaoCategorias + 1,
    }));
  },
}));