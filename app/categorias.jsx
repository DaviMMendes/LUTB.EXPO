import { useMemo } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import { useCategoriasStore } from "../src/store/categoriasStore";
import { useProdutosStore } from "../src/store/produtosStore";

export default function CategoriasScreen() {
  const { categorias, resetVersaoCategorias, restaurarCategoriasDoMock } =
    useCategoriasStore();

  const { produtos } = useProdutosStore();

  const categoriasComProdutos = useMemo(() => {
    return categorias.map((categoria) => {
      const produtosDaCategoria = produtos.filter(
        (produto) => String(produto.categoriaId) === String(categoria.id)
      );

      return {
        ...categoria,
        produtos: produtosDaCategoria,
        totalProdutos: produtosDaCategoria.length,
      };
    });
  }, [categorias, produtos]);

  function voltar() {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.push("/");
  }

  function restaurarCategorias() {
    restaurarCategoriasDoMock();
  }

  function formatarPreco(valor) {
    const numero = Number(valor);

    if (Number.isNaN(numero)) {
      return "R$ 0,00";
    }

    return `R$ ${numero.toFixed(2).replace(".", ",")}`;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={voltar}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </Pressable>

        <Text style={styles.title}>Categorias</Text>

        <Text style={styles.subtitle}>
          Esta tela representa a segunda entidade do app e demonstra o
          relacionamento entre Categoria e Produto.
        </Text>
      </View>

      <View style={styles.relationshipCard}>
        <Text style={styles.cardTitle}>Relacionamento implementado</Text>

        <Text style={styles.relationshipText}>
          Uma categoria pode possuir vários produtos. Cada produto pertence a uma
          categoria por meio do campo categoriaId.
        </Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{categorias.length}</Text>
            <Text style={styles.statLabel}>Categorias</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{produtos.length}</Text>
            <Text style={styles.statLabel}>Produtos</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{resetVersaoCategorias}</Text>
            <Text style={styles.statLabel}>Reset</Text>
          </View>
        </View>

        <Pressable style={styles.restoreButton} onPress={restaurarCategorias}>
          <Text style={styles.restoreButtonText}>
            Restaurar categorias do mock
          </Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Lista de categorias</Text>

        {categoriasComProdutos.map((categoria) => (
          <View key={categoria.id} style={styles.categoryCard}>
            <View style={styles.categoryHeader}>
              <View style={styles.categoryTitleBox}>
                <Text style={styles.categoryName}>{categoria.nome}</Text>
                <Text style={styles.categoryId}>ID: {categoria.id}</Text>
              </View>

              {categoria.destaque ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Destaque</Text>
                </View>
              ) : null}
            </View>

            <Text style={styles.categoryDescription}>
              {categoria.descricao}
            </Text>

            <View style={styles.productsBox}>
              <Text style={styles.productsTitle}>
                Produtos vinculados: {categoria.totalProdutos}
              </Text>

              {categoria.produtos.length > 0 ? (
                categoria.produtos.map((produto) => (
                  <View key={produto.id} style={styles.productItem}>
                    <Text style={styles.productName}>{produto.nome}</Text>
                    <Text style={styles.productPrice}>
                      {formatarPreco(produto.preco)}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={styles.emptyText}>
                  Nenhum produto vinculado a esta categoria.
                </Text>
              )}
            </View>
          </View>
        ))}
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
    marginBottom: 18,
  },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 18,
  },
  backButtonText: {
    color: "#000000",
    fontWeight: "900",
  },
  title: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "900",
  },
  subtitle: {
    marginTop: 8,
    color: "#cfcfcf",
    fontSize: 15,
    lineHeight: 22,
  },
  relationshipCard: {
    backgroundColor: "#171717",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    marginBottom: 20,
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 19,
    fontWeight: "900",
    marginBottom: 8,
  },
  relationshipText: {
    color: "#cfcfcf",
    fontSize: 14,
    lineHeight: 21,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  statNumber: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "900",
  },
  statLabel: {
    marginTop: 4,
    color: "#bfbfbf",
    fontSize: 12,
    textAlign: "center",
  },
  restoreButton: {
    marginTop: 16,
    backgroundColor: "#ffffff",
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: "center",
  },
  restoreButtonText: {
    color: "#000000",
    fontWeight: "900",
  },
  section: {
    gap: 14,
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 21,
    fontWeight: "900",
    marginBottom: 2,
  },
  categoryCard: {
    backgroundColor: "#171717",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    marginBottom: 14,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  categoryTitleBox: {
    flex: 1,
  },
  categoryName: {
    color: "#ffffff",
    fontSize: 19,
    fontWeight: "900",
  },
  categoryId: {
    marginTop: 4,
    color: "#bfbfbf",
    fontSize: 12,
  },
  badge: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    color: "#000000",
    fontSize: 12,
    fontWeight: "900",
  },
  categoryDescription: {
    marginTop: 12,
    color: "#cfcfcf",
    fontSize: 14,
    lineHeight: 21,
  },
  productsBox: {
    marginTop: 14,
    backgroundColor: "#0f0f0f",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  productsTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 10,
  },
  productItem: {
    backgroundColor: "#171717",
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  productName: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "800",
  },
  productPrice: {
    marginTop: 3,
    color: "#bfbfbf",
    fontSize: 13,
  },
  emptyText: {
    color: "#bfbfbf",
    fontSize: 13,
    fontStyle: "italic",
  },
});
