import { Link, useLocalSearchParams } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useProdutosStore } from "../../src/store/produtosStore";
import { useCategoriasStore } from "../../src/store/categoriasStore";

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

export default function ProdutoDetalhes() {
  const { id } = useLocalSearchParams();

  const produto = useProdutosStore((state) => state.buscarProdutoPorId(id));
  const buscarCategoriaPorId = useCategoriasStore(
    (state) => state.buscarCategoriaPorId
  );

  if (!produto) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundTitle}>Produto não encontrado</Text>

        <Text style={styles.notFoundText}>
          O produto pode ter sido removido no admin temporário ou o identificador
          da rota não existe mais no Zustand.
        </Text>

        <Link href="/catalogo" asChild>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Voltar ao catálogo</Text>
          </Pressable>
        </Link>
      </View>
    );
  }

  const imagemProduto = obterImagemProduto(produto.imagem);
  const categoria = buscarCategoriaPorId(produto.categoriaId);
  const nomeCategoria = categoria?.nome || produto.categoria || "Sem categoria";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
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

      <View style={styles.infoBox}>
        <Text style={styles.category}>{nomeCategoria}</Text>

        <Text style={styles.title}>{produto.nome}</Text>

        <Text style={styles.price}>R$ {formatarPreco(produto.preco)}</Text>

        <Text style={styles.description}>
          {produto.descricao || "Produto sem descrição cadastrada."}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações técnicas</Text>

        <View style={styles.detailCard}>
          <Text style={styles.detailLabel}>ID do produto</Text>
          <Text style={styles.detailValue}>{produto.id}</Text>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.detailLabel}>Entidade principal</Text>
          <Text style={styles.detailValue}>Produto</Text>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.detailLabel}>Categoria vinculada</Text>
          <Text style={styles.detailValue}>{nomeCategoria}</Text>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.detailLabel}>categoriaId</Text>
          <Text style={styles.detailValue}>
            {produto.categoriaId || "não informado"}
          </Text>
        </View>

        <View style={styles.relationshipCard}>
          <Text style={styles.relationshipTitle}>Relacionamento</Text>
          <Text style={styles.relationshipText}>
            Este Produto aponta para a entidade Categoria usando categoriaId. A
            categoria encontrada na store é: {nomeCategoria}.
          </Text>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.detailLabel}>Fonte dos dados</Text>
          <Text style={styles.detailValue}>
            Zustand com dados temporários vindos do mock local
          </Text>
        </View>
      </View>

      <View style={styles.warningBox}>
        <Text style={styles.warningTitle}>Modo temporário</Text>
        <Text style={styles.warningText}>
          Esta tela lê o produto e a categoria pelo Zustand. Quando o Supabase
          estiver pronto, os dados deverão vir do banco real.
        </Text>
      </View>

      <View style={styles.buttons}>
        <Link href="/catalogo" asChild>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Voltar ao catálogo</Text>
          </Pressable>
        </Link>

        <Link href="/categorias" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Ver Categorias</Text>
          </Pressable>
        </Link>

        <Link href="/admin/produtos" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Editar no Admin</Text>
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
  imageBox: {
    height: 330,
    backgroundColor: "#ffffff",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    color: "#000000",
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: 2,
  },
  infoBox: {
    marginTop: 22,
    backgroundColor: "#171717",
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  category: {
    color: "#a8a8a8",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  title: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 12,
  },
  price: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 16,
  },
  description: {
    color: "#d4d4d4",
    fontSize: 16,
    lineHeight: 24,
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
  detailCard: {
    backgroundColor: "#171717",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    marginBottom: 12,
  },
  detailLabel: {
    color: "#999999",
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  detailValue: {
    color: "#ffffff",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "700",
  },
  relationshipCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
  },
  relationshipTitle: {
    color: "#000000",
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 8,
  },
  relationshipText: {
    color: "#202020",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "600",
  },
  warningBox: {
    marginTop: 20,
    backgroundColor: "#2a2111",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#725b26",
  },
  warningTitle: {
    color: "#ffe0a3",
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 8,
  },
  warningText: {
    color: "#f0d8aa",
    fontSize: 14,
    lineHeight: 21,
  },
  buttons: {
    marginTop: 28,
  },
  primaryButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
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
  notFoundContainer: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  notFoundTitle: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 12,
  },
  notFoundText: {
    color: "#cfcfcf",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 22,
  },
});