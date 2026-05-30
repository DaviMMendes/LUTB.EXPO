import { Link, router } from "expo-router";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useAuthStore } from "../src/store/authStore";

export default function Perfil() {
  const usuario = useAuthStore((state) => state.usuario);
  const autenticado = useAuthStore((state) => state.autenticado);
  const logout = useAuthStore((state) => state.logout);
  const carregarUsuarioMock = useAuthStore((state) => state.carregarUsuarioMock);
  const ultimaAcao = useAuthStore((state) => state.ultimaAcao);
  const modo = useAuthStore((state) => state.modo);

  async function handleLogout() {
    const resultado = await logout();

    Alert.alert("Logout temporário", resultado.mensagem);
    router.push("/");
  }

  function handleCarregarMock() {
    carregarUsuarioMock();
    Alert.alert("Usuário mock", "Usuário temporário carregado no Zustand.");
  }

  const inicial = usuario?.nome?.charAt(0)?.toUpperCase() || "L";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{inicial}</Text>
        </View>

        <Text style={styles.title}>Perfil</Text>

        <Text style={styles.subtitle}>
          Dados carregados pela store de autenticação temporária. Depois esta
          tela deverá ler a sessão real do Supabase.
        </Text>
      </View>

      {!autenticado || !usuario ? (
        <View style={styles.notLoggedBox}>
          <Text style={styles.notLoggedTitle}>Nenhum usuário logado</Text>

          <Text style={styles.notLoggedText}>
            Faça login, crie uma conta ou carregue um usuário mock para testar o
            fluxo de autenticação.
          </Text>

          <View style={styles.buttons}>
            <Link href="/login" asChild>
              <Pressable style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Ir para Login</Text>
              </Pressable>
            </Link>

            <Link href="/signup" asChild>
              <Pressable style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Criar Conta</Text>
              </Pressable>
            </Link>

            <Pressable style={styles.mockButton} onPress={handleCarregarMock}>
              <Text style={styles.mockButtonText}>Carregar usuário mock</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dados do usuário</Text>

            <View style={styles.profileCard}>
              <View style={styles.profileRow}>
                <Text style={styles.profileLabel}>Nome</Text>
                <Text style={styles.profileValue}>{usuario.nome}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.profileRow}>
                <Text style={styles.profileLabel}>Email</Text>
                <Text style={styles.profileValue}>{usuario.email}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.profileRow}>
                <Text style={styles.profileLabel}>Tipo</Text>
                <Text style={styles.profileValue}>{usuario.tipo}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.profileRow}>
                <Text style={styles.profileLabel}>Status</Text>
                <Text style={styles.profileValue}>{usuario.status}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.profileRow}>
                <Text style={styles.profileLabel}>Modo</Text>
                <Text style={styles.profileValue}>{modo}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Estado da sessão</Text>

            <View style={styles.statusBox}>
              <Text style={styles.statusText}>
                Autenticado: {autenticado ? "sim" : "não"}
              </Text>
              <Text style={styles.statusText}>Última ação: {ultimaAcao}</Text>
              <Text style={styles.statusText}>
                Fonte: Zustand temporário, preparado para Supabase Auth.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Área do cliente</Text>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Pedidos</Text>
              <Text style={styles.cardText}>
                Futuramente esta área poderá exibir pedidos realizados pelo
                cliente, status de entrega e histórico de compras.
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Favoritos</Text>
              <Text style={styles.cardText}>
                Esta seção pode ser usada depois para salvar produtos favoritos
                do catálogo.
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Dados da conta</Text>
              <Text style={styles.cardText}>
                Com o Supabase, esta tela poderá carregar informações reais do
                usuário autenticado.
              </Text>
            </View>
          </View>

          <View style={styles.buttons}>
            <Link href="/catalogo" asChild>
              <Pressable style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Ver catálogo</Text>
              </Pressable>
            </Link>

            <Pressable style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Sair</Text>
            </Pressable>
          </View>
        </>
      )}

      <Link href="/" asChild>
        <Pressable style={styles.backButton}>
          <Text style={styles.backButtonText}>Voltar para Home</Text>
        </Pressable>
      </Link>
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
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 8,
  },
  subtitle: {
    color: "#cfcfcf",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
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
  notLoggedBox: {
    marginTop: 26,
    backgroundColor: "#171717",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  notLoggedTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 8,
  },
  notLoggedText: {
    color: "#cfcfcf",
    fontSize: 15,
    lineHeight: 22,
  },
  profileCard: {
    backgroundColor: "#171717",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  profileRow: {
    gap: 6,
  },
  profileLabel: {
    color: "#999999",
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  profileValue: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: "#2a2a2a",
    marginVertical: 14,
  },
  statusBox: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
  },
  statusText: {
    color: "#202020",
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "700",
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
  mockButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  mockButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "900",
  },
  logoutButton: {
    backgroundColor: "#2a1111",
    borderWidth: 1,
    borderColor: "#703030",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#ffb3b3",
    fontSize: 16,
    fontWeight: "900",
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