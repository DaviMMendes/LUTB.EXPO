import { Link } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Sobre() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>LUTB</Text>
        </View>
        <Text style={styles.title}>Sobre o Aplicativo</Text>
        <Text style={styles.subtitle}>
          O aplicativo LUTB é uma loja mobile de colares artesanais, desenvolvido
          com React Native, Expo Router, Zustand e Supabase.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nossa missão</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            Criamos o aplicativo LUTB para aproximar clientes dos nossos colares
            artesanais feitos à mão. O app oferece catálogo completo, detalhes de
            cada produto, organização por categorias e uma experiência de compra
            agradável e profissional.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tecnologias</Text>

        <View style={styles.techCard}>
          <Text style={styles.techName}>React Native</Text>
          <Text style={styles.techDescription}>
            Framework para criação de interfaces mobile com JavaScript e
            componentes nativos.
          </Text>
        </View>

        <View style={styles.techCard}>
          <Text style={styles.techName}>Expo</Text>
          <Text style={styles.techDescription}>
            Plataforma para desenvolvimento, testes e execução do aplicativo.
          </Text>
        </View>

        <View style={styles.techCard}>
          <Text style={styles.techName}>Expo Router</Text>
          <Text style={styles.techDescription}>
            Sistema de rotas baseado em arquivos, onde cada tela do app
            corresponde a um arquivo na pasta de rotas.
          </Text>
        </View>

        <View style={styles.techCard}>
          <Text style={styles.techName}>Zustand</Text>
          <Text style={styles.techDescription}>
            Gerenciamento de estado global do app, controlando produtos,
            categorias e autenticação.
          </Text>
        </View>

        <View style={styles.techCard}>
          <Text style={styles.techName}>Supabase</Text>
          <Text style={styles.techDescription}>
            Back-end responsável pelo banco de dados, autenticação, cadastro de
            usuários e persistência dos dados.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nossas coleções</Text>

        <View style={styles.entityCard}>
          <Text style={styles.entityTitle}>Produtos</Text>
          <Text style={styles.entityText}>
            Cada produto possui nome, preço, descrição, imagem e categoria.
            Todos os itens são peças artesanais únicas.
          </Text>
        </View>

        <View style={styles.entityCard}>
          <Text style={styles.entityTitle}>Categorias</Text>
          <Text style={styles.entityText}>
            Os produtos são organizados em categorias como Acessórios, Coleção
            Especial e Pingentes, facilitando a navegação.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Funcionalidades</Text>

        <View style={styles.listCard}>
          <Text style={styles.listItem}>✦  Catálogo completo de produtos</Text>
          <Text style={styles.listItem}>✦  Detalhes individuais de cada peça</Text>
          <Text style={styles.listItem}>✦  Navegação por categorias</Text>
          <Text style={styles.listItem}>✦  Busca por nome de produto</Text>
          <Text style={styles.listItem}>✦  Login e cadastro de usuário</Text>
          <Text style={styles.listItem}>✦  Perfil do cliente</Text>
          <Text style={styles.listItem}>✦  Área administrativa</Text>
          <Text style={styles.listItem}>✦  Gerenciamento completo de produtos</Text>
        </View>
      </View>

      <View style={styles.buttons}>
        <Link href="/" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Voltar para Home</Text>
          </Pressable>
        </Link>
        <Link href="/catalogo" asChild>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Ver catálogo</Text>
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
    padding: 28,
    alignItems: "center",
  },
  logoBox: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#c9a96e",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  logoText: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 2,
  },
  title: {
    color: "#f0e6d3",
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    color: "#c8b89a",
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
  },
  section: {
    marginTop: 26,
  },
  sectionTitle: {
    color: "#2c1f14",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 14,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e0d8ce",
  },
  cardText: {
    color: "#5a4535",
    fontSize: 15,
    lineHeight: 23,
  },
  techCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e0d8ce",
    marginBottom: 12,
  },
  techName: {
    color: "#2c1f14",
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 6,
  },
  techDescription: {
    color: "#8a7560",
    fontSize: 14,
    lineHeight: 21,
  },
  entityCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e0d8ce",
    marginBottom: 12,
  },
  entityTitle: {
    color: "#2c1f14",
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 6,
  },
  entityText: {
    color: "#8a7560",
    fontSize: 14,
    lineHeight: 21,
  },
  listCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e0d8ce",
    gap: 8,
  },
  listItem: {
    color: "#5a4535",
    fontSize: 15,
    lineHeight: 24,
  },
  buttons: {
    marginTop: 28,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#c9a96e",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "900",
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
});