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

        <Text style={styles.title}>Arthur Lima Pinto Bacalhau</Text>
        <Text style={styles.subtitle}>RA: 852137</Text>
        <Text style={styles.role}>Supabase, banco de dados e back-end</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Responsabilidades no projeto</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Supabase</Text>
          <Text style={styles.cardText}>
            Responsável por configurar o Supabase, que será usado como back-end
            do aplicativo LUTB.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tabelas do banco</Text>
          <Text style={styles.cardText}>
            Criação das tabelas necessárias para armazenar os dados principais
            do sistema, como produtos, categorias e usuários.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Relacionamento produto-categoria</Text>
          <Text style={styles.cardText}>
            Criação do relacionamento entre produtos e categorias, permitindo
            que o aplicativo mostre entidades relacionadas.
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
          <Text style={styles.cardTitle}>Policies e RLS</Text>
          <Text style={styles.cardText}>
            Configuração das policies e regras de Row Level Security para
            proteger os dados e controlar permissões de acesso.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Credenciais do Supabase</Text>
          <Text style={styles.cardText}>
            Fornecimento da SUPABASE_URL e da SUPABASE_ANON_KEY para substituir
            o mock temporário usado durante o desenvolvimento inicial.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Dados iniciais</Text>
          <Text style={styles.cardText}>
            Criação dos dados iniciais no banco para permitir testes reais de
            catálogo, relacionamento e autenticação.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tecnologias relacionadas</Text>

        <View style={styles.tags}>
          <Text style={styles.tag}>Supabase</Text>
          <Text style={styles.tag}>PostgreSQL</Text>
          <Text style={styles.tag}>SQL</Text>
          <Text style={styles.tag}>Auth</Text>
          <Text style={styles.tag}>RLS</Text>
          <Text style={styles.tag}>Back-end</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resumo</Text>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryText}>
            Arthur ficou responsável pela parte de back-end do projeto,
            configurando o Supabase, criando tabelas, relacionamento entre
            produtos e categorias, autenticação, policies, RLS, credenciais e
            dados iniciais.
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