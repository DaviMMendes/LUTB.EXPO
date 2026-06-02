import { Link } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Davi() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>D</Text>
        </View>
        <Text style={styles.title}>Davi Magalhães Mendes</Text>
        <Text style={styles.ra}>RA: 852600</Text>
        <Text style={styles.role}>Base do app, rotas, Zustand e autenticação</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Responsabilidades</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Estrutura do projeto</Text>
          <Text style={styles.cardText}>
            Criação da estrutura inicial do aplicativo mobile LUTB usando
            React Native com Expo.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Expo Router</Text>
          <Text style={styles.cardText}>
            Configuração do sistema de rotas baseado em arquivos e organização
            das principais telas do aplicativo.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Zustand</Text>
          <Text style={styles.cardText}>
            Implementação do gerenciamento de estado global do app para controlar
            produtos, categorias e autenticação.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Autenticação</Text>
          <Text style={styles.cardText}>
            Desenvolvimento das telas de login, cadastro, perfil e logout com
            integração ao Supabase.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Área administrativa</Text>
          <Text style={styles.cardText}>
            Implementação da proteção da área admin, garantindo acesso apenas
            para usuários autenticados.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tecnologias</Text>
        <View style={styles.tags}>
          <Text style={styles.tag}>React Native</Text>
          <Text style={styles.tag}>Expo</Text>
          <Text style={styles.tag}>Expo Router</Text>
          <Text style={styles.tag}>Zustand</Text>
          <Text style={styles.tag}>Supabase Auth</Text>
          <Text style={styles.tag}>GitHub</Text>
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