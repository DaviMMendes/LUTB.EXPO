import { router, useLocalSearchParams } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useCategoriasStore } from "../../src/store/categoriasStore";
import { useProdutosStore } from "../../src/store/produtosStore";

function obterImagemProduto(imagem) {
  if (!imagem) return null;
  if (typeof imagem === "number") return imagem;
  if (typeof imagem === "string") return { uri: imagem };
  return imagem;
}

function formatarPreco(valor) {
  const numero = Number(valor);
  if (Number.isNaN(numero)) return "0,00";
  return numero.toFixed(2).replace(".", ",");
}

export default function ProdutoScreen() {
  const { id } = useLocalSearchParams();
  const produtos = useProdutosStore((state) => state.produtos);
  const categorias = useCategoriasStore((state) => state.categorias);

  const produto = produtos.find((p) => String(p.id) === String(id));

  const categoria = categorias.find(
    (c) => String(c.id) === String(produto?.categoriaId)
  );

  function voltar() {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.push("/catalogo");
  }

  if (!produto) {
    return (
      <View style={styles.notFoundContainer}>
        <View style={styles.notFoundBox}>
          <Text style={styles.notFoundEmoji}>🔍</Text>
          <Text style={styles.notFoundTitle}>Produto não encontrado</Text>
          <Text style={styles.notFoundText}>
            Este produto pode ter sido removido ou o link está incorreto.
          </Text>
          <Pressable style={styles.notFoundButton} onPress={voltar}>
            <Text style={styles.notFoundButtonText}>Voltar ao catálogo</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const imagemProduto = obterImagemProduto(produto.imagem);
  const nomeCategoria = categoria?.nome || produto.categoria || "Sem categoria";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Imagem em destaque */}
      <View style={styles.imageContainer}>
        {imagemProduto ? (
          <Image
            source={imagemProduto}
            style={styles.productImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>LUTB</Text>
            <Text style={styles.imagePlaceholderSub}>Imagem não disponível</Text>
          </View>
        )}
        <Pressable style={styles.backButton} onPress={voltar}>
          <Text style={styles.backButtonText}>←</Text>
        </Pressable>
      </View>

      {/* Conteúdo principal */}
      <View style={styles.mainCard}>
        {/* Categoria */}
        <View style={styles.categoryTag}>
          <Text style={styles.categoryTagText}>{nomeCategoria}</Text>
        </View>

        {/* Nome */}
        <Text style={styles.productName}>{produto.nome}</Text>

        {/* Preço em destaque */}
        <View style={styles.priceRow}>
          <Text style={styles.priceCurrency}>R$</Text>
          <Text style={styles.priceValue}>{formatarPreco(produto.preco)}</Text>
        </View>

        <View style={styles.divider} />

        {/* Descrição */}
        <Text style={styles.sectionLabel}>Sobre este produto</Text>
        <Text style={styles.productDescription}>
          {produto.descricao || "Nenhuma descrição cadastrada para este produto."}
        </Text>

        <View style={styles.divider} />

        {/* Detalhes */}
        <Text style={styles.sectionLabel}>Detalhes</Text>
        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Categoria</Text>
            <Text style={styles.detailValue}>{nomeCategoria}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Tipo</Text>
            <Text style={styles.detailValue}>Artesanal</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Disponibilidade</Text>
            <Text style={styles.detailValue}>Em estoque</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Produção</Text>
            <Text style={styles.detailValue}>Feito à mão</Text>
          </View>
        </View>
      </View>

      {/* Info artesanal */}
      <View style={styles.craftCard}>
        <Text style={styles.craftEmoji}>✦</Text>
        <Text style={styles.craftText}>
          Cada peça LUTB é única e produzida artesanalmente com materiais
          selecionados.
        </Text>
      </View>

      {/* Botões de ação */}
      <View style={styles.actions}>
        <Pressable style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Comprar agora</Text>
        </Pressable>

        <Pressable style={styles.catalogButton} onPress={voltar}>
          <Text style={styles.catalogButtonText}>Continuar vendo produtos</Text>
        </Pressable>
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
    paddingBottom: 40,
  },

  // Estado de produto não encontrado
  notFoundContainer: {
    flex: 1,
    backgroundColor: "#f5f1eb",
    padding: 20,
    justifyContent: "center",
  },
  notFoundBox: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0d8ce",
  },
  notFoundEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  notFoundTitle: {
    color: "#2c1f14",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 10,
    textAlign: "center",
  },
  notFoundText: {
    color: "#8a7560",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 24,
  },
  notFoundButton: {
    backgroundColor: "#c9a96e",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
  },
  notFoundButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "900",
  },

  // Imagem
  imageContainer: {
    width: "100%",
    height: 320,
    backgroundColor: "#e8dfd4",
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8dfd4",
  },
  imagePlaceholderText: {
    color: "#c9a96e",
    fontSize: 36,
    fontWeight: "900",
    letterSpacing: 4,
  },
  imagePlaceholderSub: {
    color: "#a89880",
    fontSize: 13,
    marginTop: 8,
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(44, 31, 20, 0.75)",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    color: "#f0e6d3",
    fontSize: 20,
    fontWeight: "900",
    lineHeight: 22,
  },

  // Card principal
  mainCard: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginTop: -24,
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: "#e0d8ce",
    // Sombra leve para o card flutuar sobre a imagem
    shadowColor: "#2c1f14",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  categoryTag: {
    alignSelf: "flex-start",
    backgroundColor: "#fdf3e3",
    borderWidth: 1,
    borderColor: "#e8c98a",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 12,
  },
  categoryTagText: {
    color: "#9a6f2a",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  productName: {
    color: "#2c1f14",
    fontSize: 26,
    fontWeight: "900",
    lineHeight: 32,
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4,
    marginBottom: 20,
  },
  priceCurrency: {
    color: "#8a7560",
    fontSize: 18,
    fontWeight: "700",
    paddingBottom: 3,
  },
  priceValue: {
    color: "#2c1f14",
    fontSize: 38,
    fontWeight: "900",
    lineHeight: 42,
  },
  divider: {
    height: 1,
    backgroundColor: "#f0ebe3",
    marginVertical: 18,
  },
  sectionLabel: {
    color: "#a89880",
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
  },
  productDescription: {
    color: "#5a4535",
    fontSize: 15,
    lineHeight: 24,
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  detailItem: {
    width: "47%",
    backgroundColor: "#f5f1eb",
    borderRadius: 14,
    padding: 14,
  },
  detailLabel: {
    color: "#a89880",
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  detailValue: {
    color: "#2c1f14",
    fontSize: 14,
    fontWeight: "700",
  },

  // Card artesanal
  craftCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: "#2c1f14",
    borderRadius: 18,
    padding: 16,
  },
  craftEmoji: {
    color: "#c9a96e",
    fontSize: 20,
  },
  craftText: {
    flex: 1,
    color: "#e0d0b8",
    fontSize: 13,
    lineHeight: 20,
  },

  // Ações
  actions: {
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 12,
  },
  buyButton: {
    backgroundColor: "#c9a96e",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  buyButtonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 0.3,
  },
  catalogButton: {
    borderWidth: 1,
    borderColor: "#2c1f14",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  catalogButtonText: {
    color: "#2c1f14",
    fontSize: 15,
    fontWeight: "800",
  },
});