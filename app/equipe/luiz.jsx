import { Link } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Luiz() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>L</Text>
        </View>
        <Text style={styles.title}>Luiz Henrique Camello</Text>
        <Text style={styles.ra}>RA: 852839</Text>
        <Text style={styles.role}>Visual, catálogo e telas da loja</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Responsabilidades</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Home</Text>
          <Text style={styles.cardText}>
            Desenvolvimento e melhoria visual da tela inicial, apresentando a
            loja LUTB de forma organizada e profissional.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Catálogo</Text>
          <Text style={styles.cardText}>
            Criação da tela de catálogo com listagem de produtos, busca e
            filtro por categoria.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Detalhes do produto</Text>
          <Text style={styles.cardText}>
            Tela individual de produto com nome, imagem, categoria, descrição
            e preço.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Telas da equipe</Text>
          <Text style={styles.cardText}>
            Criação das telas individuais dos integrantes com nome, RA e
            responsabilidades no projeto.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Estilização geral</Text>
          <Text style={styles.cardText}>
            Definição da identidade visual do aplicativo com paleta de cores,
            tipografia e componentização consistente.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tecnologias</Text>
        <View style={styles.tags}>
          <Text style={styles.tag}>React Native</Text>
          <Text style={styles.tag}>Expo Router</Text>
          <Text style={styles.tag}>StyleSheet</Text>
          <Text style={styles.tag}>UI Mobile</Text>
          <Text style={styles.tag}>Zustand</Text>
        </View>
      </View>

      <View style={styles.buttons}>
        <Link href="/" asChild>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Voltar para Home</Text>
          </Pressable>
        </Link>
        <Link href="/sobre" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Ver Sobre o App</Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f1eb" },
  content: { padding: 20, paddingBottom: 40 },
  header: {
    alignItems: "center",
    backgroundColor: "#2c1f14",
    borderRadius: 24,
    padding: 28,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "#c9a96e",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarText: { color: "#ffffff", fontSize: 34, fontWeight: "900" },
  title: { color: "#f0e6d3", fontSize: 22, fontWeight: "900", textAlign: "center", marginBottom: 6 },
  ra: { color: "#c8b89a", fontSize: 14, textAlign: "center", marginBottom: 8 },
  role: { color: "#e0d0b8", fontSize: 14, fontWeight: "700", textAlign: "center", lineHeight: 21 },
  section: { marginTop: 26 },
  sectionTitle: { color: "#2c1f14", fontSize: 20, fontWeight: "900", marginBottom: 14 },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e0d8ce",
    marginBottom: 12,
  },
  cardTitle: { color: "#2c1f14", fontSize: 16, fontWeight: "900", marginBottom: 6 },
  cardText: { color: "#8a7560", fontSize: 14, lineHeight: 21 },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  tag: {
    color: "#5a4535",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e0d8ce",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 13,
    fontWeight: "800",
  },
  buttons: { marginTop: 28, gap: 12 },
  primaryButton: { backgroundColor: "#c9a96e", paddingVertical: 15, borderRadius: 14, alignItems: "center" },
  primaryButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "900" },
  secondaryButton: { borderWidth: 1, borderColor: "#2c1f14", paddingVertical: 14, borderRadius: 14, alignItems: "center" },
  secondaryButtonText: { color: "#2c1f14", fontSize: 15, fontWeight: "800" },
});