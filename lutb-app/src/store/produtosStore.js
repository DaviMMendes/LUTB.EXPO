import { create } from "zustand";
import * as ProdutosData from "../data/mockProdutos";

function carregarProdutosDoArquivo() {
  if (Array.isArray(ProdutosData.produtos)) {
    return ProdutosData.produtos;
  }

  if (Array.isArray(ProdutosData.mockProdutos)) {
    return ProdutosData.mockProdutos;
  }

  if (Array.isArray(ProdutosData.produtosMock)) {
    return ProdutosData.produtosMock;
  }

  if (Array.isArray(ProdutosData.default)) {
    return ProdutosData.default;
  }

  if (ProdutosData.default && Array.isArray(ProdutosData.default.produtos)) {
    return ProdutosData.default.produtos;
  }

  if (ProdutosData.default && Array.isArray(ProdutosData.default.mockProdutos)) {
    return ProdutosData.default.mockProdutos;
  }

  if (ProdutosData.default && Array.isArray(ProdutosData.default.produtosMock)) {
    return ProdutosData.default.produtosMock;
  }

  return [];
}

function normalizarProduto(produto, indice) {
  return {
    id: String(produto.id || produto.codigo || `mock-produto-${indice + 1}`),
    nome: produto.nome || produto.name || "Produto sem nome",
    preco: produto.preco || produto.price || "0,00",
    categoria: produto.categoria || produto.category || "Sem categoria",
    descricao:
      produto.descricao ||
      produto.description ||
      "Produto sem descrição cadastrada.",
    imagem: produto.imagem || produto.image || null,
  };
}

function clonarProduto(produto) {
  return {
    id: String(produto.id),
    nome: produto.nome,
    preco: produto.preco,
    categoria: produto.categoria,
    descricao: produto.descricao,
    imagem: produto.imagem,
  };
}

function clonarLista(lista) {
  return lista.map((produto) => clonarProduto(produto));
}

const produtosOriginaisDoMock = carregarProdutosDoArquivo().map(
  (produto, indice) => normalizarProduto(produto, indice)
);

export const useProdutosStore = create((set, get) => ({
  produtosOriginais: clonarLista(produtosOriginaisDoMock),
  produtos: clonarLista(produtosOriginaisDoMock),
  totalOriginalMock: produtosOriginaisDoMock.length,
  resetVersao: 0,

  adicionarProduto: (produto) => {
    const novoProduto = {
      id: `novo-${Date.now()}`,
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
    const produtosRestaurados = clonarLista(get().produtosOriginais);

    set((state) => ({
      produtos: produtosRestaurados,
      totalOriginalMock: produtosRestaurados.length,
      resetVersao: state.resetVersao + 1,
    }));
  },
}));