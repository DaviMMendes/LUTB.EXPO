import { create } from 'zustand';
import { mockProdutos } from '../data/mockProdutos';
import { supabase } from '../lib/supabase';

const imagensLocais = {};
mockProdutos.forEach((p) => {
  imagensLocais[p.id] = p.imagem;
});

function normalizarProduto(p) {
  return {
    id: String(p.id),
    nome: p.nome || '',
    preco: p.preco || 0,
    descricao: p.descricao || '',
    imagem: imagensLocais[String(p.id)] || p.imagem || null,
    categoriaId: p.categoria_id || p.categoriaId || '',
    categoria: p.categorias?.nome || p.categoria || 'Sem categoria',
  };
}

function gerarId() {
  return String(Date.now());
}

export const useProdutosStore = create((set, get) => ({
  produtos: [],
  carregando: false,
  erro: null,
  resetVersao: 0,

  carregarProdutos: async () => {
    set({ carregando: true, erro: null });
    const { data, error } = await supabase
      .from('produtos')
      .select('*, categorias(id, nome)')
      .order('nome');
    if (error) {
      set({ erro: error.message, carregando: false, produtos: mockProdutos.map(normalizarProduto) });
      return;
    }
    set({ produtos: data.map(normalizarProduto), carregando: false });
  },

  buscarProdutoPorId: (id) => {
    return get().produtos.find((p) => String(p.id) === String(id)) || null;
  },

  adicionarProduto: async (dados) => {
    const novoId = gerarId();
    const { data, error } = await supabase
      .from('produtos')
      .insert({
        id: novoId,
        nome: dados.nome,
        preco: dados.preco,
        descricao: dados.descricao,
        imagem: null,
        categoria_id: dados.categoriaId,
      })
      .select('*, categorias(id, nome)')
      .single();
    if (error) return;
    set((state) => ({ produtos: [...state.produtos, normalizarProduto(data)] }));
  },

  editarProduto: async (id, dados) => {
    const { data, error } = await supabase
      .from('produtos')
      .update({
        nome: dados.nome,
        preco: dados.preco,
        descricao: dados.descricao,
        categoria_id: dados.categoriaId,
      })
      .eq('id', id)
      .select('*, categorias(id, nome)')
      .single();
    if (error) return;
    set((state) => ({
      produtos: state.produtos.map((p) => (p.id === String(id) ? normalizarProduto(data) : p)),
    }));
  },

  removerProduto: async (id) => {
    const { error } = await supabase.from('produtos').delete().eq('id', id);
    if (error) return;
    set((state) => ({
      produtos: state.produtos.filter((p) => p.id !== String(id)),
    }));
  },

  restaurarProdutosDoMock: async () => {
    await supabase.from('produtos').delete().neq('id', '');
    const inserts = mockProdutos.map((p) => ({
      id: p.id,
      nome: p.nome,
      preco: p.preco,
      descricao: p.descricao,
      imagem: null,
      categoria_id: p.categoriaId,
    }));
    await supabase.from('produtos').insert(inserts);
    set((state) => ({
      produtos: mockProdutos.map(normalizarProduto),
      resetVersao: state.resetVersao + 1,
    }));
  },
}));