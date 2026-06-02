import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useAuthStore } from "../../src/store/authStore";
import { useCategoriasStore } from "../../src/store/categoriasStore";
import { useProdutosStore } from "../../src/store/produtosStore";

export default function AdminProdutosScreen() {
  const autenticado = useAuthStore((state) => state.autenticado);

  const {
    produtos,
    adicionarProduto,
    editarProduto,
    removerProduto,
    restaurarProdutosDoMock,
    resetVersao,
    carregando,
  } = useProdutosStore();

  const { categorias } = useCategoriasStore();

  const [produtoEditando, setProdutoEditando] = useState(null);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoriaId, setCategoriaId] = useState(categorias[0]?.id || "acessorios");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (!autenticado) {
      router.replace("/login");
    }
  }, [autenticado]);

  const categoriasPorId = useMemo(() => {
    const mapa = {};
    categorias.forEach((categoria) => { mapa[categoria.id] = categoria; });
    return mapa;
  }, [categorias]);

  function voltar() {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.push("/");
  }

  function limparCampos() {
    setProdutoEditando(null);
    setNome("");
    setPreco("");
    setDescricao("");
    setCategoriaId(categorias[0]?.id || "acessorios");
  }

  function mostrarMensagem(texto) {
    setMensagem(texto);
    setTimeout(() => setMensagem(""), 3000);
  }

  async function salvarProduto() {
    const nomeTratado = nome.trim();
    const precoTratado = preco.trim().replace(",", ".");
    const descricaoTratada = descricao.trim();

    if (!nomeTratado) {
      Alert.alert("Campo obrigatório", "Informe o nome do produto.");
      return;
    }
    if (!precoTratado || Number.isNaN(Number(precoTratado))) {
      Alert.alert("Campo inválido", "Informe um preço válido.");
      return;
    }
    if (!descricaoTratada) {
      Alert.alert("Campo obrigatório", "Informe a descrição do produto.");
      return;
    }

    const categoriaSelecionada = categoriasPorId[categoriaId];
    const dadosProduto = {
      nome: nomeTratado,
      preco: Number(precoTratado),
      descricao: descricaoTratada,
      categoriaId,
      categoria: categoriaSelecionada?.nome || "Sem categoria",
      imagem: produtoEditando?.imagem || null,
    };

    if (produtoEditando) {
      await editarProduto(produtoEditando.id, dadosProduto);
      mostrarMensagem("Produto editado com sucesso");
      limparCampos();
      return;
    }

    await adicionarProduto(dadosProduto);
    mostrarMensagem("Produto adicionado com sucesso");
    limparCampos();
  }

  function iniciarEdicao(produto) {
    setProdutoEditando(produto);
    setNome(produto.nome || "");
    setPreco(String(produto.preco || ""));
    setDescricao(produto.descricao || "");
    setCategoriaId(produto.categoriaId || categorias[0]?.id || "acessorios");
  }

  function confirmarRemocao(produto) {
    Alert.alert(
      "Remover produto",
      `Deseja remover "${produto.nome}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            await removerProduto(produto.id);
            mostrarMensagem("Produto removido com sucesso");
          },
        },
      ]
    );
  }

  async function restaurarMock() {
    Alert.alert(
      "Restaurar produtos",
      "Isso irá repor os produtos originais. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Restaurar",
          onPress: async () => {
            await restaurarProdutosDoMock();
            limparCampos();
            mostrarMensagem("Produtos restaurados com sucesso");
          },
        },
      ]
    );
  }

  function formatarPreco(valor) {
    const numero = Number(valor);
    if (Number.isNaN(numero)) return "R$ 0,00";
    return `R$ ${numero.toFixed(2).replace(".", ",")}`;
  }

  if (!autenticado) return null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={voltar}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </Pressable>
        <Text style={styles.title}>Administração</Text>
        <Text style={styles.subtitle}>Gerencie os produtos da loja.</Text>
      </View>

      <View style={styles.restoreCard}>
        <Text style={styles.cardTitle}>Visão geral</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{produtos.length}</Text>
            <Text style={styles.statLabel}>Produtos</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{resetVersao}</Text>
            <Text style={styles.statLabel}>Versão</Text>
          </View>
        </View>
        <Pressable style={styles.restoreButton} onPress={restaurarMock}>
          <Text style={styles.restoreButtonText}>Restaurar produtos originais</Text>
        </Pressable>
        {mensagem ? <Text style={styles.successMessage}>{mensagem}</Text> : null}
      </View>

      <View style={styles.formCard}>
        <Text style={styles.cardTitle}>
          {produtoEditando ? "Editar produto" : "Adicionar produto"}
        </Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do produto"
          placeholderTextColor="#a89880"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Preço</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 39.90"
          placeholderTextColor="#a89880"
          value={preco}
          onChangeText={setPreco}
          keyboardType="decimal-pad"
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descrição do produto"
          placeholderTextColor="#a89880"
          value={descricao}
          onChangeText={setDescricao}
          multiline
          textAlignVertical="top"
        />

        <Text style={styles.label}>Categoria</Text>
        <View style={styles.categoryOptions}>
          {categorias.map((categoria) => {
            const selecionada = categoriaId === categoria.id;
            return (
              <Pressable
                key={categoria.id}
                style={[styles.categoryOption, selecionada && styles.categoryOptionSelected]}
                onPress={() => setCategoriaId(categoria.id)}
              >
                <Text style={[styles.categoryOptionText, selecionada && styles.categoryOptionTextSelected]}>
                  {categoria.nome}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable style={styles.saveButton} onPress={salvarProduto} disabled={carregando}>
          <Text style={styles.saveButtonText}>
            {carregando ? "Salvando..." : produtoEditando ? "Salvar edição" : "Adicionar produto"}
          </Text>
        </Pressable>

        {produtoEditando ? (
          <Pressable style={styles.cancelButton} onPress={limparCampos}>
            <Text style={styles.cancelButtonText}>Cancelar edição</Text>
          </Pressable>
        ) : null}
      </View>

      <View style={styles.listArea}>
        <Text style={styles.sectionTitle}>Produtos cadastrados</Text>
        {produtos.map((produto) => {
          const categoria = categoriasPorId[produto.categoriaId];
          return (
            <View key={produto.id} style={styles.productCard}>
              <View style={styles.productHeader}>
                <View style={styles.productTitleBox}>
                  <Text style={styles.productName}>{produto.nome}</Text>
                  <Text style={styles.productCategory}>
                    {categoria?.nome || produto.categoria || "Sem categoria"}
                  </Text>
                </View>
                <Text style={styles.productPrice}>{formatarPreco(produto.preco)}</Text>
              </View>
              <Text style={styles.productDescription}>{produto.descricao}</Text>
              <View style={styles.actionRow}>
                <Pressable
                  style={[styles.actionButton, styles.editButton]}
                  onPress={() => iniciarEdicao(produto)}
                >
                  <Text style={styles.actionButtonText}>Editar</Text>
                </Pressable>
                <Pressable
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => confirmarRemocao(produto)}
                >
                  <Text style={styles.actionButtonText}>Remover</Text>
                </Pressable>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f1eb" },
  content: { padding: 20, paddingBottom: 40 },
  header: { marginBottom: 20 },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    marginBottom: 14,
  },
  backButtonText: { color: "#2c1f14", fontWeight: "800", fontSize: 15 },
  title: { fontSize: 28, fontWeight: "900", color: "#2c1f14" },
  subtitle: { marginTop: 6, fontSize: 14, color: "#8a7560" },
  restoreCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#e0d8ce",
  },
  formCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e0d8ce",
  },
  cardTitle: { fontSize: 18, fontWeight: "900", color: "#2c1f14", marginBottom: 14 },
  statsRow: { flexDirection: "row", gap: 10, marginBottom: 4 },
  statBox: {
    flex: 1,
    backgroundColor: "#f5f1eb",
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
  },
  statNumber: { fontSize: 24, fontWeight: "900", color: "#2c1f14" },
  statLabel: { marginTop: 4, fontSize: 12, color: "#8a7560", textAlign: "center" },
  restoreButton: {
    marginTop: 14,
    backgroundColor: "#2c1f14",
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: "center",
  },
  restoreButtonText: { color: "#f0e6d3", fontWeight: "900" },
  successMessage: {
    marginTop: 12,
    backgroundColor: "#edf7f0",
    color: "#2a6644",
    padding: 10,
    borderRadius: 12,
    fontWeight: "800",
    textAlign: "center",
  },
  label: { fontSize: 13, fontWeight: "800", color: "#2c1f14", marginBottom: 8 },
  input: {
    backgroundColor: "#f5f1eb",
    borderWidth: 1,
    borderColor: "#e0d8ce",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
    fontSize: 15,
    color: "#2c1f14",
  },
  textArea: { minHeight: 90 },
  categoryOptions: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 16 },
  categoryOption: {
    backgroundColor: "#f5f1eb",
    borderWidth: 1,
    borderColor: "#e0d8ce",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  categoryOptionSelected: { backgroundColor: "#2c1f14", borderColor: "#2c1f14" },
  categoryOptionText: { color: "#5a4535", fontWeight: "800", fontSize: 13 },
  categoryOptionTextSelected: { color: "#f0e6d3" },
  saveButton: { backgroundColor: "#c9a96e", paddingVertical: 14, borderRadius: 14, alignItems: "center" },
  saveButtonText: { color: "#ffffff", fontWeight: "900" },
  cancelButton: {
    marginTop: 10,
    backgroundColor: "#f5f1eb",
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0d8ce",
  },
  cancelButtonText: { color: "#2c1f14", fontWeight: "900" },
  listArea: { gap: 14 },
  sectionTitle: { fontSize: 20, fontWeight: "900", color: "#2c1f14", marginBottom: 4 },
  productCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e0d8ce",
    marginBottom: 14,
  },
  productHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 4 },
  productTitleBox: { flex: 1 },
  productName: { fontSize: 17, fontWeight: "900", color: "#2c1f14" },
  productCategory: { marginTop: 3, fontSize: 12, color: "#c9a96e", fontWeight: "700", textTransform: "uppercase" },
  productPrice: { fontSize: 16, fontWeight: "900", color: "#2c1f14" },
  productDescription: { marginTop: 8, fontSize: 13, lineHeight: 20, color: "#8a7560" },
  actionRow: { flexDirection: "row", gap: 10, marginTop: 14 },
  actionButton: { flex: 1, paddingVertical: 11, borderRadius: 12, alignItems: "center" },
  editButton: { backgroundColor: "#2c1f14" },
  deleteButton: { backgroundColor: "#fff0f0", borderWidth: 1, borderColor: "#f0c8c8" },
  actionButtonText: { color: "#ffffff", fontWeight: "900", fontSize: 13 },
});