import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useAuthStore } from "../src/store/authStore";

export default function Login() {
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleLogin() {
    if (carregando) return;

    setCarregando(true);
    const resultado = await login({ email, senha });
    setCarregando(false);

    if (!resultado.sucesso) {
      Alert.alert("Atenção", resultado.mensagem);
      return;
    }

    router.push("/perfil");
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>LUTB</Text>
          </View>
          <Text style={styles.title}>Entrar na conta</Text>
          <Text style={styles.subtitle}>
            Acesse sua conta para continuar comprando.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu email"
              placeholderTextColor="#a89880"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              placeholderTextColor="#a89880"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
          </View>

          <Pressable style={styles.primaryButton} onPress={handleLogin} disabled={carregando}>
            <Text style={styles.primaryButtonText}>
              {carregando ? "Entrando..." : "Entrar"}
            </Text>
          </Pressable>

          <Link href="/signup" asChild>
            <Pressable style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Criar conta</Text>
            </Pressable>
          </Link>
        </View>

        <Link href="/" asChild>
          <Pressable style={styles.backButton}>
            <Text style={styles.backButtonText}>Voltar para Home</Text>
          </Pressable>
        </Link>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    backgroundColor: "#f5f1eb",
  },
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
    marginBottom: 28,
    backgroundColor: "#2c1f14",
    borderRadius: 24,
    padding: 28,
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
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    color: "#c8b89a",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },
  form: {
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e0d8ce",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    color: "#2c1f14",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f5f1eb",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e0d8ce",
    color: "#2c1f14",
    fontSize: 15,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  primaryButton: {
    backgroundColor: "#c9a96e",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 6,
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
    marginTop: 12,
  },
  secondaryButtonText: {
    color: "#2c1f14",
    fontSize: 15,
    fontWeight: "800",
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