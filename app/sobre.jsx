import { Link } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Sobre() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Sobre o Aplicativo</Text>
        <Text style={styles.subtitle}>
          O aplicativo LUTB é uma versão mobile de um projeto de e-commerce,
          desenvolvido com React Native e Expo.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Objetivo do projeto</Text>

        <View style={styles.card}>
          <Text style={styles.cardText}>
            O objetivo é criar um aplicativo mobile para apresentação de produtos
            da loja LUTB, permitindo navegação por catálogo, visualização de
            detalhes, estrutura de autenticação e preparação para integração com
            banco de dados.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tecnologias utilizadas</Text>

        <View style={styles.techCard}>
          <Text style={styles.techName}>React Native</Text>
          <Text style={styles.techDescription}>
            Framework utilizado para criar interfaces mobile usando JavaScript e
            componentes nativos.
          </Text>
        </View>

        <View style={styles.techCard}>
          <Text style={styles.techName}>Expo</Text>
          <Text style={styles.techDescription}>
            Plataforma usada para desenvolvimento, testes e publicação do app de
            forma simplificada.
          </Text>
        </View>

        <View style={styles.techCard}>
          <Text style={styles.techName}>Expo Router</Text>
          <Text style={styles.techDescription}>
            Sistema de rotas baseado em arquivos, usado para organizar as telas
            do aplicativo.
          </Text>
        </View>

        <View style={styles.techCard}>
          <Text style={styles.techName}>JavaScript</Text>
          <Text style={styles.techDescription}>
            Linguagem principal usada na lógica das telas, componentes e dados
            temporários.
          </Text>
        </View>

        <View style={styles.techCard}>
          <Text style={styles.techName}>Mock de dados</Text>
          <Text style={styles.techDescription}>
            Estrutura temporária usada para simular produtos e evitar que o app
            quebre enquanto o Supabase ainda não está pronto.
          </Text>
        </View>

        <View style={styles.techCard}>
          <Text style={styles.techName}>Supabase</Text>
          <Text style={styles.techDescription}>
            Banco de dados e autenticação planejados para a versão final do
            projeto. No momento, a integração real ainda será implementada.
          </Text>
        </View>

        <View style={styles.techCard}>
          <Text style={styles.techName}>GitHub Codespaces</Text>
          <Text style={styles.techDescription}>
            Ambiente de desenvolvimento online usado para editar, testar e
            versionar o projeto no GitHub.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Funcionalidades atuais</Text>

        <View style={styles.listCard}>
          <Text style={styles.listItem}>• Home inicial da loja</Text>
          <Text style={styles.listItem}>• Catálogo de produtos</Text>
          <Text style={styles.listItem}>• Tela de detalhes do produto</Text>
          <Text style={styles.listItem}>• Tela Sobre com tecnologias</Text>
          <Text style={styles.listItem}>• Tela de login</Text>
          <Text style={styles.listItem}>• Tela de cadastro</Text>
          <Text style={styles.listItem}>• Tela de perfil</Text>
          <Text style={styles.listItem}>• Tela administrativa de produtos</Text>
          <Text style={styles.listItem}>• Telas da equipe</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estrutura de rotas</Text>

        <View style={styles.codeCard}>
          <Text style={styles.codeText}>app/index.jsx</Text>
          <Text style={styles.codeText}>app/catalogo.jsx</Text>
          <Text style={styles.codeText}>app/produto/[id].jsx</Text>
          <Text style={styles.codeText}>app/sobre.jsx</Text>
          <Text style={styles.codeText}>app/login.jsx</Text>
          <Text style={styles.codeText}>app/signup.jsx</Text>
          <Text style={styles.codeText}>app/perfil.jsx</Text>
          <Text style={styles.codeText}>app/admin/produtos.jsx</Text>
          <Text style={styles.codeText}>app/equipe/davi.jsx</Text>
          <Text style={styles.codeText}>app/equipe/integrante2.jsx</Text>
          <Text style={styles.codeText}>app/equipe/integrante3.jsx</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Próximas melhorias</Text>

        <View style={styles.card}>
          <Text style={styles.cardText}>
            As próximas etapas incluem integrar o Supabase real, carregar
            produtos diretamente do banco, implementar autenticação funcional,
            melhorar o painel administrativo e finalizar os dados da equipe.
          </Text>
        </View>
      </View>

      <View style={styles.buttons}>
        <Link href="/" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Voltar para Home</Text>
          </Pressable>
        </Link>

        <Link href="/catalogo" asChild>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Abrir Catálogo</Text>
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
    backgroundColor: "#171717",
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  title: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 10,
  },
  subtitle: {
    color: "#d4d4d4",
    fontSize: 16,
    lineHeight: 24,
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
  },
  cardText: {
    color: "#d4d4d4",
    fontSize: 15,
    lineHeight: 23,
  },
  techCard: {
    backgroundColor: "#171717",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    marginBottom: 12,
  },
  techName: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 8,
  },
  techDescription: {
    color: "#cfcfcf",
    fontSize: 15,
    lineHeight: 22,
  },
  listCard: {
    backgroundColor: "#171717",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  listItem: {
    color: "#d4d4d4",
    fontSize: 15,
    lineHeight: 26,
  },
  codeCard: {
    backgroundColor: "#050505",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  codeText: {
    color: "#e5e5e5",
    fontSize: 14,
    fontFamily: "monospace",
    marginBottom: 7,
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
});