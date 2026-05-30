import { create } from "zustand";
import { mockCategorias } from "../data/mockCategorias";

function gerarIdPorNome(nome) {
  return String(nome || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function normalizarCategoria(categoria) {
  return {
    id: categoria.id || gerarIdPorNome(categoria.nome),
    nome: categoria.nome || "",
    descricao: categoria.descricao || "",
    destaque: Boolean(categoria.destaque),
  };
}

export const useCategoriasStore = create((set, get) => ({
  categorias: mockCategorias.map(normalizarCategoria),
  resetVersaoCategorias: 0,

  adicionarCategoria: (categoria) => {
    const novaCategoria = normalizarCategoria(categoria);

    if (!novaCategoria.id || !novaCategoria.nome) {
      return false;
    }

    const jaExiste = get().categorias.some(
      (item) => String(item.id) === String(novaCategoria.id)
    );

    if (jaExiste) {
      return false;
    }

    set((state) => ({
      categorias: [...state.categorias, novaCategoria],
    }));

    return true;
  },

  editarCategoria: (id, dadosAtualizados) => {
    set((state) => ({
      categorias: state.categorias.map((categoria) =>
        String(categoria.id) === String(id)
          ? normalizarCategoria({
              ...categoria,
              ...dadosAtualizados,
              id: categoria.id,
            })
          : categoria
      ),
    }));
  },

  removerCategoria: (id) => {
    set((state) => ({
      categorias: state.categorias.filter(
        (categoria) => String(categoria.id) !== String(id)
      ),
    }));
  },

  restaurarCategoriasDoMock: () => {
    set((state) => ({
      categorias: mockCategorias.map(normalizarCategoria),
      resetVersaoCategorias: state.resetVersaoCategorias + 1,
    }));
  },

  buscarCategoriaPorId: (id) => {
    return get().categorias.find(
      (categoria) => String(categoria.id) === String(id)
    );
  },
}));
