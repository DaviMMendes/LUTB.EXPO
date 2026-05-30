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
  const autenticado = useAuthStore((state) => state.autenticado);
  const usuario = useAuthStore((state) => state.usuario);
  const ultimaAcao = useAuthStore((state) => state.ultimaAcao);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleLogin() {
    if (carregando) {
      return;
    }

    setCarregando(true);

    const resultado = await login({
      email,
      senha,
    });

    setCarregando(false);

    if (!resultado.sucesso) {
      Alert.alert("Atenção", resultado.mensagem);
      return;
    }

    Alert.alert("Login temporário", resultado.mensagem);
    router.push("/perfil");
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logo}>LUTB</Text>
          <Text style={styles.title}>Entrar na conta</Text>
          <Text style={styles.subtitle}>
            Fluxo de autenticação temporário usando Zustand. Depois será trocado
            pela autenticação real do Supabase.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu email"
              placeholderTextColor="#777777"
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
              placeholderTextColor="#777777"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
          </View>

          <Pressable style={styles.primaryButton} onPress={handleLogin}>
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

        <View style={styles.statusBox}>
          <Text style={styles.statusTitle}>Estado da autenticação</Text>
          <Text style={styles.statusText}>
            Status: {autenticado ? "Usuário logado" : "Usuário não logado"}
          </Text>
          <Text style={styles.statusText}>
            Usuário: {usuario?.email || "nenhum"}
          </Text>
          <Text style={styles.statusText}>Última ação: {ultimaAcao}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Integração futura</Text>
          <Text style={styles.infoText}>
            Quando o Supabase estiver pronto, esta tela deverá chamar
            supabase.auth.signInWithPassword usando email e senha.
          </Text>
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
    backgroundColor: "#0f0f0f",
  },
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
    marginBottom: 28,
    backgroundColor: "#171717",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  logo: {
    color: "#ffffff",
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: 3,
    marginBottom: 12,
  },
  title: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    color: "#cfcfcf",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
  form: {
    backgroundColor: "#171717",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#0f0f0f",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#333333",
    color: "#ffffff",
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  primaryButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 6,
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
    marginTop: 12,
  },
  secondaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
  statusBox: {
    marginTop: 22,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
  },
  statusTitle: {
    color: "#000000",
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 8,
  },
  statusText: {
    color: "#202020",
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "700",
  },
  infoBox: {
    marginTop: 22,
    backgroundColor: "#121212",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  infoTitle: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 8,
  },
  infoText: {
    color: "#cfcfcf",
    fontSize: 14,
    lineHeight: 21,
  },
  backButton: {
    marginTop: 22,
    alignItems: "center",
    paddingVertical: 12,
  },
  backButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
  },
});