import { create } from "zustand";
import { mockProdutos } from "../data/mockProdutos";

function normalizarProduto(produto) {
  return {
    id: produto.id,
    nome: produto.nome || produto.name || "",
    preco: produto.preco || produto.price || "0",
    descricao: produto.descricao || produto.description || "",
    imagem: produto.imagem || produto.image || produto.foto || null,
    categoriaId:
      produto.categoriaId ||
      produto.categoria_id ||
      produto.categoria ||
      produto.tipo ||
      "camisetas",
  };
}

function gerarId() {
  return String(Date.now());
}

export const useProdutosStore = create((set, get) => ({
  produtos: mockProdutos.map(normalizarProduto),
  resetVersao: 0,

  adicionarProduto: (produto) => {
    const novoProduto = normalizarProduto({
      ...produto,
      id: produto.id || gerarId(),
    });

    set((state) => ({
      produtos: [...state.produtos, novoProduto],
    }));
  },

  editarProduto: (id, dadosAtualizados) => {
    set((state) => ({
      produtos: state.produtos.map((produto) =>
        String(produto.id) === String(id)
          ? normalizarProduto({
              ...produto,
              ...dadosAtualizados,
              id: produto.id,
            })
          : produto
      ),
    }));
  },

  removerProduto: (id) => {
    set((state) => ({
      produtos: state.produtos.filter(
        (produto) => String(produto.id) !== String(id)
      ),
    }));
  },

  restaurarProdutosDoMock: () => {
    set((state) => ({
      produtos: mockProdutos.map(normalizarProduto),
      resetVersao: state.resetVersao + 1,
    }));
  },

  buscarProdutoPorId: (id) => {
    return get().produtos.find((produto) => String(produto.id) === String(id));
  },
}));