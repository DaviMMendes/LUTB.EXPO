import { Link } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Home() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>LUTB</Text>
        </View>

        <Text style={styles.title}>LUTB Store</Text>

        <Text style={styles.subtitle}>
          Aplicativo mobile da LUTB desenvolvido em React Native com Expo,
          migrado a partir do antigo site em Next.js.
        </Text>

        <View style={styles.actions}>
          <Link href="/catalogo" asChild>
            <Pressable style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Ver catálogo</Text>
            </Pressable>
          </Link>

          <Link href="/sobre" asChild>
            <Pressable style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Sobre o app</Text>
            </Pressable>
          </Link>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acesso rápido</Text>

        <View style={styles.grid}>
          <Link href="/catalogo" asChild>
            <Pressable style={styles.gridItem}>
              <Text style={styles.gridItemTitle}>Catálogo</Text>
              <Text style={styles.gridItemText}>Produtos da loja</Text>
            </Pressable>
          </Link>

          <Link href="/login" asChild>
            <Pressable style={styles.gridItem}>
              <Text style={styles.gridItemTitle}>Login</Text>
              <Text style={styles.gridItemText}>Acesso do usuário</Text>
            </Pressable>
          </Link>

          <Link href="/perfil" asChild>
            <Pressable style={styles.gridItem}>
              <Text style={styles.gridItemTitle}>Perfil</Text>
              <Text style={styles.gridItemText}>Dados do cliente</Text>
            </Pressable>
          </Link>

          <Link href="/admin/produtos" asChild>
            <Pressable style={styles.gridItem}>
              <Text style={styles.gridItemTitle}>Admin</Text>
              <Text style={styles.gridItemText}>CRUD temporário</Text>
            </Pressable>
          </Link>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Equipe</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Integrantes do projeto</Text>
          <Text style={styles.cardText}>
            Acesse a tela individual de cada integrante para visualizar nome, RA
            e função no desenvolvimento do aplicativo LUTB.
          </Text>
        </View>

        <View style={styles.teamButtons}>
          <Link href="/equipe/davi" asChild>
            <Pressable style={styles.teamButton}>
              <View style={styles.teamAvatar}>
                <Text style={styles.teamAvatarText}>D</Text>
              </View>

              <View style={styles.teamInfo}>
                <Text style={styles.teamButtonName}>
                  Davi Magalhães Mendes
                </Text>
                <Text style={styles.teamButtonRa}>RA: 852600</Text>
                <Text style={styles.teamButtonRole}>
                  Base Expo, rotas, Zustand e autenticação
                </Text>
              </View>
            </Pressable>
          </Link>

          <Link href="/equipe/artur" asChild>
            <Pressable style={styles.teamButton}>
              <View style={styles.teamAvatar}>
                <Text style={styles.teamAvatarText}>A</Text>
              </View>

              <View style={styles.teamInfo}>
                <Text style={styles.teamButtonName}>
                  Arthur Lima Pinto Bacalhau
                </Text>
                <Text style={styles.teamButtonRa}>RA: 852137</Text>
                <Text style={styles.teamButtonRole}>
                  Supabase, banco de dados e back-end
                </Text>
              </View>
            </Pressable>
          </Link>

          <Link href="/equipe/luiz" asChild>
            <Pressable style={styles.teamButton}>
              <View style={styles.teamAvatar}>
                <Text style={styles.teamAvatarText}>L</Text>
              </View>

              <View style={styles.teamInfo}>
                <Text style={styles.teamButtonName}>
                  Luiz Henrique Camello
                </Text>
                <Text style={styles.teamButtonRa}>RA: 852839</Text>
                <Text style={styles.teamButtonRole}>
                  Visual, catálogo, telas e estilização geral
                </Text>
              </View>
            </Pressable>
          </Link>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Destaques da LUTB</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Catálogo de produtos</Text>
          <Text style={styles.cardText}>
            Navegação por produtos temporários usando mock local enquanto o banco
            de dados no Supabase ainda está em desenvolvimento.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Detalhes do produto</Text>
          <Text style={styles.cardText}>
            Cada item possui uma tela própria com informações do produto, imagem,
            descrição, categoria e preço.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Estrutura preparada</Text>
          <Text style={styles.cardText}>
            O projeto já está organizado para receber autenticação, perfil,
            painel administrativo, Zustand e integração real com Supabase.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Requisitos atendidos</Text>

        <View style={styles.requirementsBox}>
          <Text style={styles.requirementItem}>• Expo Router configurado</Text>
          <Text style={styles.requirementItem}>• Home criada</Text>
          <Text style={styles.requirementItem}>• Tela Sobre criada</Text>
          <Text style={styles.requirementItem}>
            • Uma tela para cada integrante
          </Text>
          <Text style={styles.requirementItem}>
            • Interações com botões e formulários
          </Text>
          <Text style={styles.requirementItem}>
            • CRUD temporário de produtos
          </Text>
          <Text style={styles.requirementItem}>
            • Preparação para Supabase
          </Text>
          <Text style={styles.requirementItem}>
            • Estrutura para autenticação
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Projeto acadêmico desenvolvido em React Native, Expo Router e
          integração planejada com Supabase.
        </Text>
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
  hero: {
    backgroundColor: "#171717",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  logoBox: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  logoText: {
    color: "#000000",
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 2,
  },
  title: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: "#d4d4d4",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 22,
  },
  actions: {
    width: "100%",
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
  section: {
    marginTop: 28,
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 22,
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
    backgroundColor: "#171717",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  gridItemTitle: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 6,
  },
  gridItemText: {
    color: "#bfbfbf",
    fontSize: 14,
  },
  card: {
    backgroundColor: "#171717",
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#2a2a2a",
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
  teamButtons: {
    gap: 12,
  },
  teamButton: {
    backgroundColor: "#171717",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  teamAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  teamAvatarText: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "900",
  },
  teamInfo: {
    flex: 1,
  },
  teamButtonName: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 4,
  },
  teamButtonRa: {
    color: "#bfbfbf",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 4,
  },
  teamButtonRole: {
    color: "#cfcfcf",
    fontSize: 14,
    lineHeight: 20,
  },
  requirementsBox: {
    backgroundColor: "#171717",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  requirementItem: {
    color: "#d4d4d4",
    fontSize: 15,
    lineHeight: 25,
  },
  footer: {
    marginTop: 28,
    padding: 18,
    borderRadius: 18,
    backgroundColor: "#121212",
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  footerText: {
    color: "#bfbfbf",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});