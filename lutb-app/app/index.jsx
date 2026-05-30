import { Link } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Home() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>LUTB</Text>
        </View>

        <Text style={styles.title}>LUTB Store</Text>

        <Text style={styles.subtitle}>
          Moda, estilo e identidade em uma experiência mobile feita com React
          Native e Expo.
        </Text>

        <View style={styles.actions}>
          <Link href="/catalogo" asChild>
            <Pressable style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Ver catálogo</Text>
            </Pressable>
          </Link>

          <Link href="/sobre" asChild>
            <Pressable style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Sobre o app</Text>
            </Pressable>
          </Link>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Destaques da LUTB</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Catálogo de produtos</Text>
          <Text style={styles.cardText}>
            Navegação por produtos temporários usando mock local enquanto o banco
            de dados no Supabase ainda está em desenvolvimento.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Detalhes do produto</Text>
          <Text style={styles.cardText}>
            Cada item possui uma tela própria com informações do produto, imagem,
            descrição e preço.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Estrutura preparada</Text>
          <Text style={styles.cardText}>
            O projeto já está organizado para receber autenticação, perfil,
            painel administrativo e integração real com Supabase.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acesso rápido</Text>

        <View style={styles.grid}>
          <Link href="/catalogo" asChild>
            <Pressable style={styles.gridItem}>
              <Text style={styles.gridItemTitle}>Catálogo</Text>
              <Text style={styles.gridItemText}>Produtos da loja</Text>
            </Pressable>
          </Link>

          <Link href="/login" asChild>
            <Pressable style={styles.gridItem}>
              <Text style={styles.gridItemTitle}>Login</Text>
              <Text style={styles.gridItemText}>Acesso do usuário</Text>
            </Pressable>
          </Link>

          <Link href="/perfil" asChild>
            <Pressable style={styles.gridItem}>
              <Text style={styles.gridItemTitle}>Perfil</Text>
              <Text style={styles.gridItemText}>Dados do cliente</Text>
            </Pressable>
          </Link>

          <Link href="/admin/produtos" asChild>
            <Pressable style={styles.gridItem}>
              <Text style={styles.gridItemTitle}>Admin</Text>
              <Text style={styles.gridItemText}>Gestão futura</Text>
            </Pressable>
          </Link>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Projeto acadêmico desenvolvido em React Native com Expo Router.
        </Text>
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
  hero: {
    backgroundColor: "#171717",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  logoBox: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  logoText: {
    color: "#000000",
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 2,
  },
  title: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: "#d4d4d4",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 22,
  },
  actions: {
    width: "100%",
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
    fontWeight: "800",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ffffff",
  },
  secondaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
  section: {
    marginTop: 28,
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
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
  },
  cardText: {
    color: "#cfcfcf",
    fontSize: 15,
    lineHeight: 22,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  gridItem: {
    width: "48%",
    backgroundColor: "#171717",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  gridItemTitle: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 6,
  },
  gridItemText: {
    color: "#bfbfbf",
    fontSize: 14,
  },
  footer: {
    marginTop: 28,
    padding: 18,
    borderRadius: 18,
    backgroundColor: "#121212",
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  footerText: {
    color: "#bfbfbf",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});