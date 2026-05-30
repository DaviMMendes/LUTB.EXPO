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
        <Text style={styles.subtitle}>RA: 852839</Text>
        <Text style={styles.role}>Visual, catálogo e telas da loja</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Responsabilidades no projeto</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Home</Text>
          <Text style={styles.cardText}>
            Melhoria visual da tela inicial, apresentando a loja LUTB de forma
            mais organizada e profissional.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Catálogo</Text>
          <Text style={styles.cardText}>
            Criação e ajuste da tela de catálogo, exibindo os produtos da loja
            com navegação para detalhes.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Detalhes do produto</Text>
          <Text style={styles.cardText}>
            Criação da tela individual de produto, mostrando nome, imagem,
            categoria, descrição e preço.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tela Sobre</Text>
          <Text style={styles.cardText}>
            Criação e ajuste da tela Sobre, explicando o objetivo do app,
            tecnologias usadas e informações do projeto.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Telas da equipe</Text>
          <Text style={styles.cardText}>
            Criação das telas individuais dos integrantes, contendo nome, RA,
            responsabilidades e tecnologias relacionadas.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Área admin visual</Text>
          <Text style={styles.cardText}>
            Apoio na construção da tela administrativa visual, incluindo
            formulários, botões, listagem e organização dos produtos.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Estilização geral</Text>
          <Text style={styles.cardText}>
            Melhoria da aparência geral do aplicativo, buscando uma interface
            mais consistente, escura, organizada e profissional.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tecnologias relacionadas</Text>

        <View style={styles.tags}>
          <Text style={styles.tag}>React Native</Text>
          <Text style={styles.tag}>Expo Router</Text>
          <Text style={styles.tag}>UI Mobile</Text>
          <Text style={styles.tag}>Catálogo</Text>
          <Text style={styles.tag}>Produtos</Text>
          <Text style={styles.tag}>Estilização</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resumo</Text>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryText}>
            Luiz ficou responsável pela parte visual do aplicativo, incluindo
            melhoria da Home, catálogo, detalhes do produto, tela Sobre, telas da
            equipe, área administrativa visual e estilização geral.
          </Text>
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
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    backgroundColor: "#171717",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarText: {
    color: "#000000",
    fontSize: 38,
    fontWeight: "900",
  },
  title: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    color: "#cfcfcf",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 8,
  },
  role: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 22,
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
  card: {
    backgroundColor: "#171717",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    marginBottom: 12,
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 8,
  },
  cardText: {
    color: "#cfcfcf",
    fontSize: 15,
    lineHeight: 22,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  tag: {
    color: "#ffffff",
    backgroundColor: "#171717",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 9,
    fontSize: 14,
    fontWeight: "800",
  },
  summaryBox: {
    backgroundColor: "#171717",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  summaryText: {
    color: "#cfcfcf",
    fontSize: 15,
    lineHeight: 23,
  },
  buttons: {
    marginTop: 28,
    gap: 12,
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
  },
  secondaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
});