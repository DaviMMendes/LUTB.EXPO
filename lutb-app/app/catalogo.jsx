import { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import { mockProdutos } from "../src/data/mockProdutos";

export default function Catalogo() {
  const [busca, setBusca] = useState("");

  const produtosFiltrados = mockProdutos.filter((produto) =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.push("/")}>
        <Text style={styles.backButtonText}>← Voltar para Home</Text>
      </Pressable>

      <Text style={styles.title}>Catálogo</Text>
      <Text style={styles.subtitle}>Produtos artesanais da LUTB.</Text>

      <TextInput
        style={styles.input}
        placeholder="Buscar produto..."
        placeholderTextColor="#9A7B61"
        value={busca}
        onChangeText={setBusca}
      />

      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => router.push(`/produto/${item.id}`)}
          >
            <Image source={item.imagem} style={styles.image} />

            <View style={styles.cardContent}>
              <Text style={styles.productName}>{item.nome}</Text>
              <Text style={styles.category}>{item.categoria}</Text>
              <Text style={styles.price}>
                R$ {item.preco.toFixed(2).replace(".", ",")}
              </Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum produto encontrado.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF8F0",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#F7EDE2",
    borderWidth: 1,
    borderColor: "#D8BFA8",
  },
  backButtonText: {
    color: "#8B5E3C",
    fontSize: 15,
    fontWeight: "700",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#3A2A1A",
    marginTop: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B4E3D",
    marginTop: 4,
    marginBottom: 18,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D8BFA8",
    borderRadius: 14,
    padding: 14,
    fontSize: 16,
    color: "#3A2A1A",
    marginBottom: 16,
  },
  list: {
    paddingBottom: 24,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#ECD8C5",
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: 14,
    backgroundColor: "#F7EDE2",
  },
  cardContent: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
  },
  productName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#3A2A1A",
  },
  category: {
    marginTop: 4,
    fontSize: 14,
    color: "#8B5E3C",
  },
  price: {
    marginTop: 8,
    fontSize: 17,
    fontWeight: "800",
    color: "#3A2A1A",
  },
  empty: {
    textAlign: "center",
    color: "#6B4E3D",
    marginTop: 32,
  },
});