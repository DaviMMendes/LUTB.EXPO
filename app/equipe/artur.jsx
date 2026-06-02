import { Link } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Artur() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
        </View>
        <Text style={styles.title}>Artur Lima Pinto Bacalhau</Text>
        <Text style={styles.ra}>RA: 852137</Text>
        <Text style={styles.role}>Supabase, banco de dados e back-end</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Responsabilidades</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Supabase</Text>
          <Text style={styles.cardText}>
            Configuração do Supabase como back-end do aplicativo LUTB,
            incluindo projeto, credenciais e ambiente de produção.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Banco de dados</Text>
          <Text style={styles.cardText}>
            Criação das tabelas de produtos, categorias e usuários no
            PostgreSQL, estruturando os dados principais do sistema.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Relacionamento produto-categoria</Text>
          <Text style={styles.cardText}>
            Modelagem e implementação do relacionamento entre produtos e
            categorias, exibido nas telas de catálogo e categorias do app.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Autenticação</Text>
          <Text style={styles.cardText}>
            Configuração do sistema de autenticação no Supabase para login,
            cadastro e logout integrados ao back-end.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Segurança e permissões</Text>
          <Text style={styles.cardText}>
            Configuração de policies e Row Level Security para proteger os
            dados e controlar permissões de acesso por tipo de usuário.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Dados iniciais</Text>
          <Text style={styles.cardText}>
            Inserção dos dados iniciais no banco para viabilizar o catálogo,
            as categorias e os testes de autenticação.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tecnologias</Text>
        <View style={styles.tags}>
          <Text style={styles.tag}>Supabase</Text>
          <Text style={styles.tag}>PostgreSQL</Text>
          <Text style={styles.tag}>SQL</Text>
          <Text style={styles.tag}>Auth</Text>
          <Text style={styles.tag}>RLS</Text>
          <Text style={styles.tag}>Back-end</Text>
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
  title: {
    color: "#f0e6d3",
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 6,
  },
  ra: { color: "#c8b89a", fontSize: 14, textAlign: "center", marginBottom: 8 },
  role: {
    color: "#e0d0b8",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 21,
  },
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
  primaryButton: {
    backgroundColor: "#c9a96e",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
  },
  primaryButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "900" },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#2c1f14",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  secondaryButtonText: { color: "#2c1f14", fontSize: 15, fontWeight: "800" },
});