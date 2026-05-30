import { create } from "zustand";
import * as ProdutosData from "../data/mockProdutos";

function carregarProdutosIniciais() {
  if (Array.isArray(ProdutosData.produtos)) {
    return ProdutosData.produtos;
  }

  if (Array.isArray(ProdutosData.default)) {
    return ProdutosData.default;
  }

  if (ProdutosData.default && Array.isArray(ProdutosData.default.produtos)) {
    return ProdutosData.default.produtos;
  }

  return [];
}

function normalizarProduto(produto, indice) {
  return {
    id: String(produto.id || produto.codigo || `produto-${indice + 1}`),
    nome: produto.nome || produto.name || "Produto sem nome",
    preco: produto.preco || produto.price || "0,00",
    categoria: produto.categoria || "Sem categoria",
    descricao:
      produto.descricao ||
      produto.description ||
      "Produto sem descrição cadastrada.",
    imagem: produto.imagem || produto.image || null,
  };
}

const produtosIniciais = carregarProdutosIniciais().map(normalizarProduto);

export const useProdutosStore = create((set, get) => ({
  produtos: produtosIniciais,

  adicionarProduto: (produto) => {
    const novoProduto = {
      id: String(Date.now()),
      nome: produto.nome,
      preco: produto.preco,
      categoria: produto.categoria,
      descricao: produto.descricao || "Produto cadastrado temporariamente.",
      imagem: produto.imagem || null,
    };

    set((state) => ({
      produtos: [novoProduto, ...state.produtos],
    }));
  },

  atualizarProduto: (id, dadosAtualizados) => {
    set((state) => ({
      produtos: state.produtos.map((produto) =>
        String(produto.id) === String(id)
          ? {
              ...produto,
              ...dadosAtualizados,
            }
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

  buscarProdutoPorId: (id) => {
    return get().produtos.find(
      (produto) => String(produto.id) === String(id)
    );
  },

  resetarProdutos: () => {
    set({
      produtos: produtosIniciais,
    });
  },
}));