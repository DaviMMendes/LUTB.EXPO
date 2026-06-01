import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useCategoriasStore } from "../../src/store/categoriasStore";
import { useProdutosStore } from "../../src/store/produtosStore";

export default function AdminProdutosScreen() {
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

  const categoriasPorId = useMemo(() => {
    const mapa = {};
    categorias.forEach((categoria) => {
      mapa[categoria.id] = categoria;
    });
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
    const horario = new Date().toLocaleTimeString();
    setMensagem(`${texto} (${horario})`);
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
    await restaurarProdutosDoMock();
    limparCampos();
    mostrarMensagem("Produtos restaurados");
  }

  function formatarPreco(valor) {
    const numero = Number(valor);
    if (Number.isNaN(numero)) return "R$ 0,00";
    return `R$ ${numero.toFixed(2).replace(".", ",")}`;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={voltar}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </Pressable>
        <Text style={styles.title}>Administração de Produtos</Text>
        <Text style={styles.subtitle}>
          CRUD conectado ao Supabase.
        </Text>
      </View>

      <View style={styles.restoreCard}>
        <Text style={styles.cardTitle}>Controle</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{produtos.length}</Text>
            <Text style={styles.statLabel}>Produtos atuais</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Total original</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{resetVersao}</Text>
            <Text style={styles.statLabel}>Versão reset</Text>
          </View>
        </View>
        <Pressable style={styles.restoreButton} onPress={restaurarMock}>
          <Text style={styles.restoreButtonText}>Restaurar produtos do mock</Text>
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
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Preço</Text>
        <TextInput
          style={styles.input}
          placeholder="Exemplo: 39.90"
          value={preco}
          onChangeText={setPreco}
          keyboardType="decimal-pad"
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descrição do produto"
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
                  <Text style={styles.productId}>ID: {produto.id}</Text>
                </View>
                <Text style={styles.productPrice}>{formatarPreco(produto.preco)}</Text>
              </View>
              <Text style={styles.productDescription}>{produto.descricao}</Text>
              <View style={styles.relationshipBox}>
                <Text style={styles.relationshipText}>
                  Categoria: {categoria?.nome || produto.categoria || "Sem categoria"}
                </Text>
                <Text style={styles.relationshipSubtext}>
                  categoriaId: {produto.categoriaId || "não informado"}
                </Text>
              </View>
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
  header: { marginBottom: 18 },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#1f1f1f",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 18,
  },
  backButtonText: { color: "#ffffff", fontWeight: "800" },
  title: { fontSize: 30, fontWeight: "900", color: "#1f1f1f" },
  subtitle: { marginTop: 8, fontSize: 15, lineHeight: 22, color: "#5f5f5f" },
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
  cardTitle: { fontSize: 20, fontWeight: "900", color: "#1f1f1f", marginBottom: 14 },
  statsRow: { flexDirection: "row", gap: 10 },
  statBox: {
    flex: 1,
    backgroundColor: "#f5f1eb",
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
  },
  statNumber: { fontSize: 22, fontWeight: "900", color: "#1f1f1f" },
  statLabel: { marginTop: 4, fontSize: 12, color: "#666666", textAlign: "center" },
  restoreButton: {
    marginTop: 16,
    backgroundColor: "#245c3c",
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: "center",
  },
  restoreButtonText: { color: "#ffffff", fontWeight: "900" },
  successMessage: {
    marginTop: 12,
    backgroundColor: "#dff3e6",
    color: "#245c3c",
    padding: 10,
    borderRadius: 12,
    fontWeight: "800",
    textAlign: "center",
  },
  label: { fontSize: 14, fontWeight: "800", color: "#2c2c2c", marginBottom: 8 },
  input: {
    backgroundColor: "#f7f4ef",
    borderWidth: 1,
    borderColor: "#ded6cc",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
    fontSize: 15,
    color: "#1f1f1f",
  },
  textArea: { minHeight: 90 },
  categoryOptions: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 16 },
  categoryOption: {
    backgroundColor: "#f7f4ef",
    borderWidth: 1,
    borderColor: "#ded6cc",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  categoryOptionSelected: { backgroundColor: "#1f1f1f", borderColor: "#1f1f1f" },
  categoryOptionText: { color: "#2c2c2c", fontWeight: "800" },
  categoryOptionTextSelected: { color: "#ffffff" },
  saveButton: { backgroundColor: "#1f1f1f", paddingVertical: 14, borderRadius: 14, alignItems: "center" },
  saveButtonText: { color: "#ffffff", fontWeight: "900" },
  cancelButton: {
    marginTop: 10,
    backgroundColor: "#e8dfd4",
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: "center",
  },
  cancelButtonText: { color: "#1f1f1f", fontWeight: "900" },
  listArea: { gap: 14 },
  sectionTitle: { fontSize: 21, fontWeight: "900", color: "#1f1f1f", marginBottom: 2 },
  productCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e0d8ce",
    marginBottom: 14,
  },
  productHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: 12 },
  productTitleBox: { flex: 1 },
  productName: { fontSize: 18, fontWeight: "900", color: "#1f1f1f" },
  productId: { marginTop: 4, fontSize: 12, color: "#777777" },
  productPrice: { fontSize: 16, fontWeight: "900", color: "#245c3c" },
  productDescription: { marginTop: 12, fontSize: 14, lineHeight: 21, color: "#5f5f5f" },
  relationshipBox: { marginTop: 14, backgroundColor: "#f5f1eb", borderRadius: 14, padding: 12 },
  relationshipText: { fontSize: 14, fontWeight: "900", color: "#2c2c2c" },
  relationshipSubtext: { marginTop: 4, fontSize: 12, color: "#777777" },
  actionRow: { flexDirection: "row", gap: 10, marginTop: 14 },
  actionButton: { flex: 1, paddingVertical: 12, borderRadius: 14, alignItems: "center" },
  editButton: { backgroundColor: "#2f5f9f" },
  deleteButton: { backgroundColor: "#9f2f2f" },
  actionButtonText: { color: "#ffffff", fontWeight: "900" },
});