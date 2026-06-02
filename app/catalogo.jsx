import { Link } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useAuthStore } from "../src/store/authStore";
import { useCategoriasStore } from "../src/store/categoriasStore";
import { useProdutosStore } from "../src/store/produtosStore";

function formatarPreco(preco) {
  if (!preco) return "0,00";
  return String(preco).replace("R$", "").trim();
}

function obterImagemProduto(imagem) {
  if (!imagem) return null;
  if (typeof imagem === "number") return imagem;
  if (typeof imagem === "string") return { uri: imagem };
  return imagem;
}

export default function Catalogo() {
  const produtos = useProdutosStore((state) => state.produtos);
  const categorias = useCategoriasStore((state) => state.categorias);
  const autenticado = useAuthStore((state) => state.autenticado);

  const [busca, setBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");

  const categoriasPorId = useMemo(() => {
    const mapa = {};
    categorias.forEach((categoria) => { mapa[categoria.id] = categoria; });
    return mapa;
  }, [categorias]);

  const opcoesCategorias = useMemo(() => {
    return ["Todas", ...categorias.map((c) => c.id)];
  }, [categorias]);

  const produtosFiltrados = useMemo(() => {
    return produtos.filter((produto) => {
      const nomeProduto = produto.nome || "";
      const categoriaIdProduto = produto.categoriaId || "sem-categoria";
      const correspondeBusca = nomeProduto.toLowerCase().includes(busca.toLowerCase());
      const correspondeCategoria =
        categoriaSelecionada === "Todas" || categoriaIdProduto === categoriaSelecionada;
      return correspondeBusca && correspondeCategoria;
    });
  }, [produtos, busca, categoriaSelecionada]);

  function obterNomeCategoria(categoriaId, categoriaTexto) {
    return categoriasPorId[categoriaId]?.nome || categoriaTexto || "Sem categoria";
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Catálogo</Text>
        <Text style={styles.subtitle}>
          Explore nossa coleção de colares artesanais feitos à mão.
        </Text>
      </View>

      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          placeholder="Buscar produto..."
          placeholderTextColor="#a89880"
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      <View style={styles.section}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {opcoesCategorias.map((categoriaId) => {
            const ativa = categoriaSelecionada === categoriaId;
            const nomeCategoria =
              categoriaId === "Todas"
                ? "Todas"
                : categoriasPorId[categoriaId]?.nome || categoriaId;

            return (
              <Pressable
                key={categoriaId}
                style={[styles.categoryButton, ativa && styles.categoryButtonActive]}
                onPress={() => setCategoriaSelecionada(categoriaId)}
              >
                <Text style={[styles.categoryButtonText, ativa && styles.categoryButtonTextActive]}>
                  {nomeCategoria}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>Produtos</Text>
          <Text style={styles.counterText}>{produtosFiltrados.length} item(ns)</Text>
        </View>

        {produtosFiltrados.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>Nenhum produto encontrado</Text>
            <Text style={styles.emptyText}>
              Tente alterar a busca ou selecionar outra categoria.
            </Text>
          </View>
        ) : (
          produtosFiltrados.map((produto) => {
            const imagemProduto = obterImagemProduto(produto.imagem);
            const nomeCategoria = obterNomeCategoria(produto.categoriaId, produto.categoria);

            return (
              <Link key={produto.id} href={`/produto/${produto.id}`} asChild>
                <Pressable style={styles.productCard}>
                  <View style={styles.imageBox}>
                    {imagemProduto ? (
                      <Image
                        source={imagemProduto}
                        style={styles.productImage}
                        resizeMode="cover"
                      />
                    ) : (
                      <Text style={styles.imagePlaceholder}>LUTB</Text>
                    )}
                  </View>

                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{produto.nome}</Text>
                    <Text style={styles.productCategory}>{nomeCategoria}</Text>
                    <Text style={styles.productDescription} numberOfLines={2}>
                      {produto.descricao || "Produto sem descrição cadastrada."}
                    </Text>
                    <Text style={styles.productPrice}>
                      R$ {formatarPreco(produto.preco)}
                    </Text>
                  </View>
                </Pressable>
              </Link>
            );
          })
        )}
      </View>

      <View style={styles.buttons}>
        <Link href="/categorias" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Ver Categorias</Text>
          </Pressable>
        </Link>

        {autenticado && (
          <Link href="/admin/produtos" asChild>
            <Pressable style={styles.adminButton}>
              <Text style={styles.adminButtonText}>Gerenciar produtos</Text>
            </Pressable>
          </Link>
        )}

        <Link href="/" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Voltar para Home</Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f1eb",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    backgroundColor: "#2c1f14",
    borderRadius: 24,
    padding: 24,
  },
  title: {
    color: "#f0e6d3",
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 8,
  },
  subtitle: {
    color: "#c8b89a",
    fontSize: 15,
    lineHeight: 22,
  },
  searchBox: {
    marginTop: 18,
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e0d8ce",
    color: "#2c1f14",
    fontSize: 15,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  section: {
    marginTop: 22,
  },
  sectionTitle: {
    color: "#2c1f14",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 14,
  },
  categoryList: {
    gap: 10,
    paddingRight: 20,
  },
  categoryButton: {
    backgroundColor: "#ffffff",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#e0d8ce",
  },
  categoryButtonActive: {
    backgroundColor: "#2c1f14",
    borderColor: "#2c1f14",
  },
  categoryButtonText: {
    color: "#5a4535",
    fontSize: 14,
    fontWeight: "800",
  },
  categoryButtonTextActive: {
    color: "#f0e6d3",
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  counterText: {
    color: "#8a7560",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 14,
  },
  emptyBox: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e0d8ce",
  },
  emptyTitle: {
    color: "#2c1f14",
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 8,
  },
  emptyText: {
    color: "#8a7560",
    fontSize: 14,
    lineHeight: 21,
  },
  productCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e0d8ce",
    marginBottom: 14,
    flexDirection: "row",
    gap: 14,
  },
  imageBox: {
    width: 96,
    height: 112,
    borderRadius: 14,
    backgroundColor: "#f5f1eb",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    color: "#c9a96e",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 1,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    color: "#2c1f14",
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 4,
  },
  productCategory: {
    color: "#c9a96e",
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  productDescription: {
    color: "#8a7560",
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 8,
  },
  productPrice: {
    color: "#2c1f14",
    fontSize: 17,
    fontWeight: "900",
  },
  buttons: {
    marginTop: 28,
    gap: 12,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#2c1f14",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#2c1f14",
    fontSize: 15,
    fontWeight: "800",
  },
  adminButton: {
    backgroundColor: "#2c1f14",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  adminButtonText: {
    color: "#f0e6d3",
    fontSize: 15,
    fontWeight: "900",
  },
});