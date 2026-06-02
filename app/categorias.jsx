import { router } from "expo-router";
import { useMemo } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useCategoriasStore } from "../src/store/categoriasStore";
import { useProdutosStore } from "../src/store/produtosStore";

export default function CategoriasScreen() {
  const { categorias } = useCategoriasStore();
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

  function formatarPreco(valor) {
    const numero = Number(valor);
    if (Number.isNaN(numero)) return "R$ 0,00";
    return `R$ ${numero.toFixed(2).replace(".", ",")}`;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={voltar}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </Pressable>
        <Text style={styles.title}>Categorias</Text>
        <Text style={styles.subtitle}>
          Explore nossa coleção organizada por estilo e tipo de peça.
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{categorias.length}</Text>
          <Text style={styles.statLabel}>Categorias</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{produtos.length}</Text>
          <Text style={styles.statLabel}>Produtos</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Coleções</Text>

        {categoriasComProdutos.map((categoria) => (
          <View key={categoria.id} style={styles.categoryCard}>
            <View style={styles.categoryHeader}>
              <View style={styles.categoryTitleBox}>
                <Text style={styles.categoryName}>{categoria.nome}</Text>
                <Text style={styles.categoryCount}>
                  {categoria.totalProdutos} produto(s)
                </Text>
              </View>
              {categoria.destaque ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Destaque</Text>
                </View>
              ) : null}
            </View>

            <Text style={styles.categoryDescription}>{categoria.descricao}</Text>

            {categoria.produtos.length > 0 && (
              <View style={styles.productsBox}>
                {categoria.produtos.map((produto) => (
                  <View key={produto.id} style={styles.productItem}>
                    <Text style={styles.productName}>{produto.nome}</Text>
                    <Text style={styles.productPrice}>{formatarPreco(produto.preco)}</Text>
                  </View>
                ))}
              </View>
            )}

            {categoria.produtos.length === 0 && (
              <Text style={styles.emptyText}>Nenhum produto nesta categoria.</Text>
            )}
          </View>
        ))}
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
    marginBottom: 20,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    marginBottom: 14,
  },
  backButtonText: {
    color: "#2c1f14",
    fontWeight: "800",
    fontSize: 15,
  },
  title: {
    color: "#2c1f14",
    fontSize: 30,
    fontWeight: "900",
  },
  subtitle: {
    marginTop: 6,
    color: "#8a7560",
    fontSize: 15,
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0d8ce",
  },
  statNumber: {
    color: "#2c1f14",
    fontSize: 28,
    fontWeight: "900",
  },
  statLabel: {
    marginTop: 4,
    color: "#8a7560",
    fontSize: 13,
    textAlign: "center",
  },
  section: {
    gap: 14,
  },
  sectionTitle: {
    color: "#2c1f14",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 4,
  },
  categoryCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e0d8ce",
    marginBottom: 14,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 10,
  },
  categoryTitleBox: {
    flex: 1,
  },
  categoryName: {
    color: "#2c1f14",
    fontSize: 19,
    fontWeight: "900",
  },
  categoryCount: {
    marginTop: 3,
    color: "#c9a96e",
    fontSize: 13,
    fontWeight: "700",
  },
  badge: {
    backgroundColor: "#c9a96e",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "900",
  },
  categoryDescription: {
    color: "#8a7560",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 12,
  },
  productsBox: {
    backgroundColor: "#f5f1eb",
    borderRadius: 14,
    padding: 12,
    gap: 8,
  },
  productItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#e0d8ce",
  },
  productName: {
    color: "#2c1f14",
    fontSize: 14,
    fontWeight: "800",
    flex: 1,
  },
  productPrice: {
    color: "#c9a96e",
    fontSize: 14,
    fontWeight: "900",
  },
  emptyText: {
    color: "#a89880",
    fontSize: 13,
    fontStyle: "italic",
  },
});