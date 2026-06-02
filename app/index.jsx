import { Link } from "expo-router";
import { useAuthStore } from "../src/store/authStore";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Home() {
  const autenticado = useAuthStore((state) => state.autenticado);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>LUTB</Text>
        </View>

        <Text style={styles.title}>LUTB Store</Text>

        <Text style={styles.subtitle}>
          Colares artesanais feitos à mão com materiais selecionados.
          Cada peça é única.
        </Text>

        <View style={styles.actions}>
          <Link href="/catalogo" asChild>
            <Pressable style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Ver catálogo</Text>
            </Pressable>
          </Link>

          <Link href="/sobre" asChild>
            <Pressable style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Sobre a loja</Text>
            </Pressable>
          </Link>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Navegação</Text>

        <View style={styles.grid}>
          <Link href="/catalogo" asChild>
            <Pressable style={styles.gridItem}>
              <Text style={styles.gridItemEmoji}>🛍️</Text>
              <Text style={styles.gridItemTitle}>Catálogo</Text>
              <Text style={styles.gridItemText}>Todos os produtos</Text>
            </Pressable>
          </Link>

          <Link href="/categorias" asChild>
            <Pressable style={styles.gridItem}>
              <Text style={styles.gridItemEmoji}>✨</Text>
              <Text style={styles.gridItemTitle}>Categorias</Text>
              <Text style={styles.gridItemText}>Explore por tipo</Text>
            </Pressable>
          </Link>

          <Link href="/perfil" asChild>
            <Pressable style={styles.gridItem}>
              <Text style={styles.gridItemEmoji}>👤</Text>
              <Text style={styles.gridItemTitle}>Minha conta</Text>
              <Text style={styles.gridItemText}>Perfil e dados</Text>
            </Pressable>
          </Link>

          <Link href="/sobre" asChild>
            <Pressable style={styles.gridItem}>
              <Text style={styles.gridItemEmoji}>🌿</Text>
              <Text style={styles.gridItemTitle}>Sobre</Text>
              <Text style={styles.gridItemText}>Nossa história</Text>
            </Pressable>
          </Link>
        </View>
      </View>

      {autenticado && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Administração</Text>
          <Link href="/admin/produtos" asChild>
            <Pressable style={styles.adminButton}>
              <Text style={styles.adminButtonText}>⚙️  Gerenciar produtos</Text>
            </Pressable>
          </Link>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nossa equipe</Text>

        <View style={styles.card}>
          <Text style={styles.cardText}>
            O aplicativo LUTB foi desenvolvido com dedicação por três
            integrantes. Conheça cada um deles abaixo.
          </Text>
        </View>

        <View style={styles.teamButtons}>
          <Link href="/equipe/davi" asChild>
            <Pressable style={styles.teamButton}>
              <View style={styles.teamAvatar}>
                <Text style={styles.teamAvatarText}>D</Text>
              </View>
              <View style={styles.teamInfo}>
                <Text style={styles.teamButtonName}>Davi Magalhães Mendes</Text>
                <Text style={styles.teamButtonRa}>RA: 852600</Text>
                <Text style={styles.teamButtonRole}>Base Expo, rotas e autenticação</Text>
              </View>
            </Pressable>
          </Link>

          <Link href="/equipe/artur" asChild>
            <Pressable style={styles.teamButton}>
              <View style={styles.teamAvatar}>
                <Text style={styles.teamAvatarText}>A</Text>
              </View>
              <View style={styles.teamInfo}>
                <Text style={styles.teamButtonName}>Artur Lima Pinto Bacalhau</Text>
                <Text style={styles.teamButtonRa}>RA: 852137</Text>
                <Text style={styles.teamButtonRole}>Banco de dados e back-end</Text>
              </View>
            </Pressable>
          </Link>

          <Link href="/equipe/luiz" asChild>
            <Pressable style={styles.teamButton}>
              <View style={styles.teamAvatar}>
                <Text style={styles.teamAvatarText}>L</Text>
              </View>
              <View style={styles.teamInfo}>
                <Text style={styles.teamButtonName}>Luiz Henrique Camello</Text>
                <Text style={styles.teamButtonRa}>RA: 852839</Text>
                <Text style={styles.teamButtonRole}>Visual, catálogo e estilização</Text>
              </View>
            </Pressable>
          </Link>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          LUTB — Colares artesanais feitos com carinho ✦
        </Text>
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
  hero: {
    backgroundColor: "#2c1f14",
    borderRadius: 24,
    padding: 28,
    alignItems: "center",
  },
  logoBox: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#c9a96e",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  logoText: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: 3,
  },
  title: {
    color: "#f0e6d3",
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: "#c8b89a",
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
    marginBottom: 24,
  },
  actions: {
    width: "100%",
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
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#c8b89a",
  },
  secondaryButtonText: {
    color: "#f0e6d3",
    fontSize: 16,
    fontWeight: "800",
  },
  section: {
    marginTop: 28,
  },
  sectionTitle: {
    color: "#2c1f14",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 14,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  gridItem: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e0d8ce",
  },
  gridItemEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  gridItemTitle: {
    color: "#2c1f14",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 4,
  },
  gridItemText: {
    color: "#8a7560",
    fontSize: 13,
  },
  adminButton: {
    backgroundColor: "#2c1f14",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  adminButtonText: {
    color: "#f0e6d3",
    fontSize: 15,
    fontWeight: "900",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#e0d8ce",
  },
  cardText: {
    color: "#5a4535",
    fontSize: 15,
    lineHeight: 23,
  },
  teamButtons: {
    gap: 12,
  },
  teamButton: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e0d8ce",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  teamAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#c9a96e",
    alignItems: "center",
    justifyContent: "center",
  },
  teamAvatarText: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "900",
  },
  teamInfo: {
    flex: 1,
  },
  teamButtonName: {
    color: "#2c1f14",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 3,
  },
  teamButtonRa: {
    color: "#8a7560",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 3,
  },
  teamButtonRole: {
    color: "#5a4535",
    fontSize: 13,
    lineHeight: 19,
  },
  footer: {
    marginTop: 32,
    padding: 18,
    alignItems: "center",
  },
  footerText: {
    color: "#8a7560",
    fontSize: 14,
    textAlign: "center",
  },
});