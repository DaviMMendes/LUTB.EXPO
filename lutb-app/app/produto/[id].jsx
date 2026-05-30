import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { mockProdutos } from "../../src/data/mockProdutos";

export default function ProdutoDetalhe() {
  const { id } = useLocalSearchParams();

  const produto = mockProdutos.find((item) => item.id === id);

  if (!produto) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Produto não encontrado</Text>

        <Pressable style={styles.button} onPress={() => router.push("/catalogo")}>
          <Text style={styles.buttonText}>Voltar ao catálogo</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={produto.imagem} style={styles.image} />

      <Text style={styles.title}>{produto.nome}</Text>
      <Text style={styles.category}>{produto.categoria}</Text>

      <Text style={styles.price}>
        R$ {produto.preco.toFixed(2).replace(".", ",")}
      </Text>

      <Text style={styles.description}>{produto.descricao}</Text>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Adicionar aos favoritos</Text>
      </Pressable>

      <Pressable
        style={styles.buttonSecondary}
        onPress={() => router.push("/catalogo")}
      >
        <Text style={styles.buttonSecondaryText}>Voltar ao catálogo</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#FFF8F0",
  },
  image: {
    width: "100%",
    height: 280,
    borderRadius: 22,
    backgroundColor: "#F7EDE2",
    marginBottom: 22,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#3A2A1A",
  },
  category: {
    marginTop: 6,
    fontSize: 15,
    color: "#8B5E3C",
    fontWeight: "700",
  },
  price: {
    marginTop: 14,
    fontSize: 24,
    fontWeight: "800",
    color: "#3A2A1A",
  },
  description: {
    marginTop: 18,
    marginBottom: 26,
    fontSize: 16,
    lineHeight: 24,
    color: "#6B4E3D",
  },
  button: {
    backgroundColor: "#8B5E3C",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: "#8B5E3C",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonSecondaryText: {
    color: "#8B5E3C",
    fontSize: 16,
    fontWeight: "700",
  },
});