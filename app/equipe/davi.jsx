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
        <Text style={styles.subtitle}>RA: 852600</Text>
        <Text style={styles.role}>Base do app, rotas, Zustand e autenticação</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Responsabilidades no projeto</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Base do projeto Expo</Text>
          <Text style={styles.cardText}>
            Criação da estrutura inicial do aplicativo mobile da LUTB usando
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
          <Text style={styles.cardTitle}>Estrutura de rotas</Text>
          <Text style={styles.cardText}>
            Criação das rotas principais, incluindo Home, catálogo, produto,
            Sobre, login, cadastro, perfil, admin e telas da equipe.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Zustand</Text>
          <Text style={styles.cardText}>
            Preparação do gerenciamento de estado global do app, requisito do
            projeto, para controlar produtos, autenticação e dados compartilhados.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Autenticação</Text>
          <Text style={styles.cardText}>
            Preparação das telas de login, cadastro, perfil e logout para futura
            integração com a autenticação real do Supabase.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Área administrativa</Text>
          <Text style={styles.cardText}>
            Preparação da proteção futura da área admin, que posteriormente
            deverá depender de usuário autenticado e permissões vindas do banco.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Migração do projeto antigo</Text>
          <Text style={styles.cardText}>
            Reaproveitamento de imagens e dados do antigo site LUTB feito em
            Next.js para a nova versão mobile em React Native.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tecnologias relacionadas</Text>

        <View style={styles.tags}>
          <Text style={styles.tag}>React Native</Text>
          <Text style={styles.tag}>Expo</Text>
          <Text style={styles.tag}>Expo Router</Text>
          <Text style={styles.tag}>Zustand</Text>
          <Text style={styles.tag}>Supabase Auth</Text>
          <Text style={styles.tag}>GitHub</Text>
          <Text style={styles.tag}>Codespaces</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resumo</Text>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryText}>
            Davi ficou responsável pela base técnica do aplicativo, incluindo a
            criação do projeto Expo, configuração das rotas, preparação do
            Zustand, autenticação, perfil, logout, área admin e migração inicial
            dos dados e imagens do projeto antigo.
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