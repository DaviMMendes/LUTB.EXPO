import { Link, router } from "expo-router";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useAuthStore } from "../src/store/authStore";

export default function Perfil() {
  const usuario = useAuthStore((state) => state.usuario);
  const autenticado = useAuthStore((state) => state.autenticado);
  const logout = useAuthStore((state) => state.logout);

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  const inicial = usuario?.nome?.charAt(0)?.toUpperCase() || "U";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{inicial}</Text>
        </View>
        <Text style={styles.title}>Minha conta</Text>
        <Text style={styles.subtitle}>
          {autenticado && usuario ? usuario.email : "Faça login para continuar"}
        </Text>
      </View>

      {!autenticado || !usuario ? (
        <View style={styles.notLoggedBox}>
          <Text style={styles.notLoggedTitle}>Você não está logado</Text>
          <Text style={styles.notLoggedText}>
            Faça login ou crie uma conta para acessar seu perfil.
          </Text>

          <View style={styles.buttons}>
            <Link href="/login" asChild>
              <Pressable style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Fazer login</Text>
              </Pressable>
            </Link>

            <Link href="/signup" asChild>
              <Pressable style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Criar conta</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dados do usuário</Text>

            <View style={styles.profileCard}>
              <View style={styles.profileRow}>
                <Text style={styles.profileLabel}>Nome</Text>
                <Text style={styles.profileValue}>{usuario.nome}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.profileRow}>
                <Text style={styles.profileLabel}>Email</Text>
                <Text style={styles.profileValue}>{usuario.email}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.profileRow}>
                <Text style={styles.profileLabel}>Tipo de conta</Text>
                <Text style={styles.profileValue}>{usuario.tipo}</Text>
              </View>
            </View>
          </View>

          <View style={styles.buttons}>
            <Link href="/catalogo" asChild>
              <Pressable style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Ver catálogo</Text>
              </Pressable>
            </Link>

            <Pressable style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Sair da conta</Text>
            </Pressable>
          </View>
        </>
      )}

      <Link href="/" asChild>
        <Pressable style={styles.backButton}>
          <Text style={styles.backButtonText}>Voltar para Home</Text>
        </Pressable>
      </Link>
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
  avatarText: {
    color: "#ffffff",
    fontSize: 34,
    fontWeight: "900",
  },
  title: {
    color: "#f0e6d3",
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 6,
  },
  subtitle: {
    color: "#c8b89a",
    fontSize: 14,
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
  notLoggedBox: {
    marginTop: 26,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 22,
    borderWidth: 1,
    borderColor: "#e0d8ce",
  },
  notLoggedTitle: {
    color: "#2c1f14",
    fontSize: 19,
    fontWeight: "900",
    marginBottom: 8,
  },
  notLoggedText: {
    color: "#8a7560",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  profileCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e0d8ce",
  },
  profileRow: {
    gap: 4,
  },
  profileLabel: {
    color: "#a89880",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  profileValue: {
    color: "#2c1f14",
    fontSize: 16,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: "#f0ebe3",
    marginVertical: 14,
  },
  buttons: {
    marginTop: 26,
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
  logoutButton: {
    backgroundColor: "#fff0f0",
    borderWidth: 1,
    borderColor: "#f0c8c8",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#9f3030",
    fontSize: 15,
    fontWeight: "900",
  },
  backButton: {
    marginTop: 22,
    alignItems: "center",
    paddingVertical: 12,
  },
  backButtonText: {
    color: "#8a7560",
    fontSize: 15,
    fontWeight: "700",
  },
});