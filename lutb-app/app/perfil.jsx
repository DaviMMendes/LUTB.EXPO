import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { useAuthStore } from "../src/stores/authStore";

export default function Perfil() {
  const user = useAuthStore((state) => state.user);
  const session = useAuthStore((state) => state.session);
  const loadSession = useAuthStore((state) => state.loadSession);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    loadSession();
  }, []);

  async function handleLogout() {
    await logout();
    router.replace("/");
  }

  if (!session) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Perfil</Text>
        <Text style={styles.text}>Você ainda não está logado.</Text>

        <Pressable style={styles.button} onPress={() => router.push("/login")}>
          <Text style={styles.buttonText}>Ir para login</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.label}>Usuário logado:</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <Pressable style={styles.button} onPress={() => router.push("/admin/produtos")}>
        <Text style={styles.buttonText}>Área administrativa</Text>
      </Pressable>

      <Pressable style={styles.buttonSecondary} onPress={handleLogout}>
        <Text style={styles.buttonSecondaryText}>Sair</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#FFF8F0",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#3A2A1A",
    marginTop: 32,
    marginBottom: 18,
  },
  label: {
    fontSize: 16,
    color: "#6B4E3D",
  },
  email: {
    fontSize: 18,
    fontWeight: "700",
    color: "#3A2A1A",
    marginTop: 4,
    marginBottom: 24,
  },
  text: {
    fontSize: 16,
    color: "#6B4E3D",
    marginBottom: 18,
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