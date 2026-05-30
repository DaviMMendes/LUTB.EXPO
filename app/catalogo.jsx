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

import { useProdutosStore } from "../src/store/produtosStore";
import { useCategoriasStore } from "../src/store/categoriasStore";

function formatarPreco(preco) {
  if (!preco) {
    return "0,00";
  }

  return String(preco).replace("R$", "").trim();
}

function obterImagemProduto(imagem) {
  if (!imagem) {
    return null;
  }

  if (typeof imagem === "number") {
    return imagem;
  }

  if (typeof imagem === "string") {
    return { uri: imagem };
  }

  return imagem;
}

export default function Catalogo() {
  const produtos = useProdutosStore((state) => state.produtos);
  const categorias = useCategoriasStore((state) => state.categorias);

  const [busca, setBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");

  const categoriasPorId = useMemo(() => {
    const mapa = {};

    categorias.forEach((categoria) => {
      mapa[categoria.id] = categoria;
    });

    return mapa;
  }, [categorias]);

  const opcoesCategorias = useMemo(() => {
    return ["Todas", ...categorias.map((categoria) => categoria.id)];
  }, [categorias]);

  const produtosFiltrados = useMemo(() => {
    return produtos.filter((produto) => {
      const nomeProduto = produto.nome || "";
      const categoriaIdProduto = produto.categoriaId || "sem-categoria";

      const correspondeBusca = nomeProduto
        .toLowerCase()
        .includes(busca.toLowerCase());

      const correspondeCategoria =
        categoriaSelecionada === "Todas" ||
        categoriaIdProduto === categoriaSelecionada;

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
          Produtos carregados pelo Zustand. Alterações feitas no admin aparecem
          aqui enquanto o app estiver aberto.
        </Text>
      </View>

      <View style={styles.searchBox}>
        <Text style={styles.label}>Buscar produto</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite o nome do produto"
          placeholderTextColor="#777777"
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categorias</Text>

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
                style={[
                  styles.categoryButton,
                  ativa && styles.categoryButtonActive,
                ]}
                onPress={() => setCategoriaSelecionada(categoriaId)}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    ativa && styles.categoryButtonTextActive,
                  ]}
                >
                  {nomeCategoria}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.relationshipBox}>
        <Text style={styles.relationshipTitle}>Relacionamento exibido</Text>
        <Text style={styles.relationshipText}>
          Cada produto usa o campo categoriaId para se vincular a uma categoria
          cadastrada no Zustand.
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>Produtos</Text>
          <Text style={styles.counterText}>
            {produtosFiltrados.length} item(ns)
          </Text>
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
            const nomeCategoria = obterNomeCategoria(
              produto.categoriaId,
              produto.categoria
            );

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

                    <Text style={styles.productCategory}>
                      Categoria: {nomeCategoria}
                    </Text>

                    <Text style={styles.productCategoryId}>
                      categoriaId: {produto.categoriaId || "não informado"}
                    </Text>

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

        <Link href="/admin/produtos" asChild>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Abrir Admin</Text>
          </Pressable>
        </Link>

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
    backgroundColor: "#0f0f0f",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    backgroundColor: "#171717",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  title: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 10,
  },
  subtitle: {
    color: "#cfcfcf",
    fontSize: 15,
    lineHeight: 22,
  },
  searchBox: {
    marginTop: 22,
    backgroundColor: "#171717",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  label: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#0f0f0f",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#333333",
    color: "#ffffff",
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  section: {
    marginTop: 26,
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 14,
  },
  categoryList: {
    gap: 10,
    paddingRight: 20,
  },
  categoryButton: {
    backgroundColor: "#171717",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  categoryButtonActive: {
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
  },
  categoryButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "800",
  },
  categoryButtonTextActive: {
    color: "#000000",
  },
  relationshipBox: {
    marginTop: 22,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 16,
  },
  relationshipTitle: {
    color: "#000000",
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 6,
  },
  relationshipText: {
    color: "#202020",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  counterText: {
    color: "#bfbfbf",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 14,
  },
  emptyBox: {
    backgroundColor: "#171717",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  emptyTitle: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 8,
  },
  emptyText: {
    color: "#cfcfcf",
    fontSize: 14,
    lineHeight: 21,
  },
  productCard: {
    backgroundColor: "#171717",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    marginBottom: 14,
    flexDirection: "row",
    gap: 14,
  },
  imageBox: {
    width: 96,
    height: 112,
    borderRadius: 14,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 1,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 6,
  },
  productCategory: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 4,
  },
  productCategoryId: {
    color: "#a8a8a8",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 8,
  },
  productDescription: {
    color: "#cfcfcf",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  productPrice: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "900",
  },
  buttons: {
    marginTop: 28,
  },
  primaryButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
  },
  primaryButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "900",
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#ffffff",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
  },
  secondaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
});