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
          desenvolvido com React Native, Expo Router, Zustand e estrutura
          preparada para integração com Supabase.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Objetivo do projeto</Text>

        <View style={styles.card}>
          <Text style={styles.cardText}>
            O objetivo é criar um aplicativo mobile para apresentação e
            gerenciamento de produtos da loja LUTB. O app possui catálogo,
            detalhes de produto, área administrativa com CRUD temporário,
            entidade Categoria, relacionamento Produto/Categoria, telas da equipe
            e preparação para autenticação e banco de dados real.
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
            Plataforma usada para desenvolvimento, testes e execução do app de
            forma simplificada.
          </Text>
        </View>

        <View style={styles.techCard}>
          <Text style={styles.techName}>Expo Router</Text>
          <Text style={styles.techDescription}>
            Sistema de rotas baseado em arquivos. Cada arquivo dentro da pasta
            app representa uma tela ou grupo de telas do aplicativo.
          </Text>
        </View>

        <View style={styles.techCard}>
          <Text style={styles.techName}>Zustand</Text>
          <Text style={styles.techDescription}>
            Biblioteca usada para gerenciamento de estado global. No projeto, ela
            controla os produtos, categorias e operações temporárias de CRUD.
          </Text>
        </View>

        <View style={styles.techCard}>
          <Text style={styles.techName}>JavaScript</Text>
          <Text style={styles.techDescription}>
            Linguagem principal usada nas telas, stores, mocks e regras de
            funcionamento temporárias do app.
          </Text>
        </View>

        <View style={styles.techCard}>
          <Text style={styles.techName}>Mock de dados</Text>
          <Text style={styles.techDescription}>
            Estrutura temporária usada para simular produtos e categorias
            enquanto o Supabase real ainda não está configurado.
          </Text>
        </View>

        <View style={styles.techCard}>
          <Text style={styles.techName}>Supabase</Text>
          <Text style={styles.techDescription}>
            Back-end planejado para banco de dados, autenticação, cadastro de
            usuários, login, logout e persistência real dos produtos e
            categorias.
          </Text>
        </View>

        <View style={styles.techCard}>
          <Text style={styles.techName}>GitHub Codespaces</Text>
          <Text style={styles.techDescription}>
            Ambiente de desenvolvimento online usado para editar, testar,
            versionar e enviar o projeto ao GitHub.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Entidades do app</Text>

        <View style={styles.entityCard}>
          <Text style={styles.entityTitle}>Produto</Text>
          <Text style={styles.entityText}>
            Entidade principal do catálogo. Cada produto possui nome, preço,
            descrição, imagem, categoria textual e categoriaId.
          </Text>
        </View>

        <View style={styles.entityCard}>
          <Text style={styles.entityTitle}>Categoria</Text>
          <Text style={styles.entityText}>
            Segunda entidade do aplicativo. Ela organiza os produtos em grupos,
            como Acessórios, Coleção Especial e Pingentes.
          </Text>
        </View>

        <View style={styles.relationshipCard}>
          <Text style={styles.relationshipTitle}>Relacionamento</Text>
          <Text style={styles.relationshipText}>
            Cada produto pertence a uma categoria por meio do campo categoriaId.
            Uma categoria pode possuir vários produtos vinculados.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Funcionalidades atuais</Text>

        <View style={styles.listCard}>
          <Text style={styles.listItem}>• Home inicial da loja</Text>
          <Text style={styles.listItem}>• Catálogo de produtos</Text>
          <Text style={styles.listItem}>• Tela de detalhes do produto</Text>
          <Text style={styles.listItem}>• Tela de categorias</Text>
          <Text style={styles.listItem}>
            • Exibição do relacionamento Produto/Categoria
          </Text>
          <Text style={styles.listItem}>• Tela Sobre com resumo técnico</Text>
          <Text style={styles.listItem}>• Tela de login</Text>
          <Text style={styles.listItem}>• Tela de cadastro</Text>
          <Text style={styles.listItem}>• Tela de perfil</Text>
          <Text style={styles.listItem}>• Tela administrativa de produtos</Text>
          <Text style={styles.listItem}>
            • CRUD temporário de produtos com Zustand
          </Text>
          <Text style={styles.listItem}>• Restauração de produtos do mock</Text>
          <Text style={styles.listItem}>• Restauração de categorias do mock</Text>
          <Text style={styles.listItem}>• Telas individuais da equipe</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estrutura de rotas</Text>

        <View style={styles.codeCard}>
          <Text style={styles.codeText}>app/index.jsx</Text>
          <Text style={styles.codeText}>app/catalogo.jsx</Text>
          <Text style={styles.codeText}>app/categorias.jsx</Text>
          <Text style={styles.codeText}>app/produto/[id].jsx</Text>
          <Text style={styles.codeText}>app/sobre.jsx</Text>
          <Text style={styles.codeText}>app/login.jsx</Text>
          <Text style={styles.codeText}>app/signup.jsx</Text>
          <Text style={styles.codeText}>app/perfil.jsx</Text>
          <Text style={styles.codeText}>app/admin/produtos.jsx</Text>
          <Text style={styles.codeText}>app/equipe/davi.jsx</Text>
          <Text style={styles.codeText}>app/equipe/artur.jsx</Text>
          <Text style={styles.codeText}>app/equipe/luiz.jsx</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Arquivos de dados e estado</Text>

        <View style={styles.codeCard}>
          <Text style={styles.codeText}>src/data/mockProdutos.js</Text>
          <Text style={styles.codeText}>src/data/mockCategorias.js</Text>
          <Text style={styles.codeText}>src/store/produtosStore.js</Text>
          <Text style={styles.codeText}>src/store/categoriasStore.js</Text>
          <Text style={styles.codeText}>src/lib/supabase.js</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Requisitos atendidos</Text>

        <View style={styles.listCard}>
          <Text style={styles.listItem}>• Expo Router configurado</Text>
          <Text style={styles.listItem}>
            • Gerenciamento global com Zustand
          </Text>
          <Text style={styles.listItem}>• Tela Home criada</Text>
          <Text style={styles.listItem}>• Tela Sobre criada</Text>
          <Text style={styles.listItem}>
            • Uma tela para cada integrante da equipe
          </Text>
          <Text style={styles.listItem}>
            • Interações com botões, formulários e navegação
          </Text>
          <Text style={styles.listItem}>• CRUD completo temporário de Produto</Text>
          <Text style={styles.listItem}>• Segunda entidade: Categoria</Text>
          <Text style={styles.listItem}>
            • Relacionamento Produto/Categoria exibido no app
          </Text>
          <Text style={styles.listItem}>
            • Preparação para integração com back-end
          </Text>
          <Text style={styles.listItem}>
            • Estrutura preparada para autenticação
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Próximas melhorias</Text>

        <View style={styles.card}>
          <Text style={styles.cardText}>
            As próximas etapas incluem integrar o Supabase real, carregar
            produtos e categorias diretamente do banco, implementar autenticação
            funcional, aplicar policies/RLS, persistir o CRUD no back-end e
            substituir os mocks temporários por dados reais.
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

        <Link href="/categorias" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Ver Categorias</Text>
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
  entityCard: {
    backgroundColor: "#171717",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    marginBottom: 12,
  },
  entityTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 8,
  },
  entityText: {
    color: "#cfcfcf",
    fontSize: 15,
    lineHeight: 22,
  },
  relationshipCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    marginTop: 2,
  },
  relationshipTitle: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 8,
  },
  relationshipText: {
    color: "#202020",
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