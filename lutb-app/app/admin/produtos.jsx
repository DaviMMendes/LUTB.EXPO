import { Link } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useProdutosStore } from "../../src/store/produtosStore";

export default function AdminProdutos() {
  const produtos = useProdutosStore((state) => state.produtos);
  const adicionarProduto = useProdutosStore((state) => state.adicionarProduto);
  const atualizarProduto = useProdutosStore((state) => state.atualizarProduto);
  const removerProduto = useProdutosStore((state) => state.removerProduto);
  const resetarProdutos = useProdutosStore((state) => state.resetarProdutos);

  const [produtoEditandoId, setProdutoEditandoId] = useState(null);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");

  const estaEditando = produtoEditandoId !== null;

  function limparCampos() {
    setProdutoEditandoId(null);
    setNome("");
    setPreco("");
    setCategoria("");
    setDescricao("");
  }

  function salvarProduto() {
    if (!nome.trim() || !preco.trim() || !categoria.trim()) {
      Alert.alert("Atenção", "Preencha nome, preço e categoria.");
      return;
    }

    const dadosProduto = {
      nome: nome.trim(),
      preco: preco.trim(),
      categoria: categoria.trim(),
      descricao: descricao.trim() || "Produto cadastrado temporariamente.",
    };

    if (estaEditando) {
      atualizarProduto(produtoEditandoId, dadosProduto);

      Alert.alert(
        "Produto atualizado",
        "Produto atualizado apenas no Zustand. Ainda não foi salvo no Supabase."
      );
    } else {
      adicionarProduto(dadosProduto);

      Alert.alert(
        "Produto adicionado",
        "Produto adicionado apenas no Zustand. Ainda não foi salvo no Supabase."
      );
    }

    limparCampos();
  }

  function iniciarEdicao(produto) {
    setProdutoEditandoId(produto.id);
    setNome(produto.nome);
    setPreco(produto.preco);
    setCategoria(produto.categoria);
    setDescricao(produto.descricao);
  }

  function removerProdutoDireto(id) {
    removerProduto(id);

    if (produtoEditandoId === id) {
      limparCampos();
    }
  }

  function restaurarProdutos() {
    resetarProdutos();
    limparCampos();

    Alert.alert(
      "Produtos restaurados",
      "A lista original do mock foi restaurada no Zustand."
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Administração</Text>
        <Text style={styles.subtitle}>
          Tela administrativa temporária usando Zustand para gerenciamento global
          de produtos.
        </Text>
      </View>

      <View style={styles.warningBox}>
        <Text style={styles.warningTitle}>Modo temporário</Text>
        <Text style={styles.warningText}>
          Este CRUD usa Zustand e altera os dados apenas durante a execução do
          app. Quando o Supabase estiver pronto, as funções de criar, editar e
          remover serão conectadas ao back-end real.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {estaEditando ? "Editar produto" : "Cadastrar produto"}
        </Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome do produto</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Camiseta LUTB"
              placeholderTextColor="#777777"
              value={nome}
              onChangeText={setNome}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Preço</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 89,90"
              placeholderTextColor="#777777"
              keyboardType="decimal-pad"
              value={preco}
              onChangeText={setPreco}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Categoria</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Camisetas"
              placeholderTextColor="#777777"
              value={categoria}
              onChangeText={setCategoria}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descrição do produto"
              placeholderTextColor="#777777"
              multiline
              value={descricao}
              onChangeText={setDescricao}
            />
          </View>

          <Pressable style={styles.primaryButton} onPress={salvarProduto}>
            <Text style={styles.primaryButtonText}>
              {estaEditando ? "Salvar alterações" : "Adicionar produto"}
            </Text>
          </Pressable>

          <Pressable style={styles.secondaryButton} onPress={limparCampos}>
            <Text style={styles.secondaryButtonText}>
              {estaEditando ? "Cancelar edição" : "Limpar campos"}
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Produtos cadastrados</Text>

        <View style={styles.counterBox}>
          <Text style={styles.counterText}>
            Total de produtos no Zustand: {produtos.length}
          </Text>
        </View>

        {produtos.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>
          </View>
        ) : (
          produtos.map((produto) => (
            <View key={produto.id} style={styles.productCard}>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{produto.nome}</Text>

                <Text style={styles.productMeta}>
                  Categoria: {produto.categoria}
                </Text>

                <Text style={styles.productPrice}>R$ {produto.preco}</Text>

                <Text style={styles.productDescription}>
                  {produto.descricao}
                </Text>
              </View>

              <View style={styles.productActions}>
                <Pressable
                  style={styles.editButton}
                  onPress={() => iniciarEdicao(produto)}
                >
                  <Text style={styles.editButtonText}>Editar</Text>
                </Pressable>

                <Pressable
                  style={styles.deleteButton}
                  onPress={() => removerProdutoDireto(produto.id)}
                >
                  <Text style={styles.deleteButtonText}>Remover</Text>
                </Pressable>
              </View>
            </View>
          ))
        )}
      </View>

      <View style={styles.buttons}>
        <Pressable style={styles.resetButton} onPress={restaurarProdutos}>
          <Text style={styles.resetButtonText}>Restaurar produtos do mock</Text>
        </Pressable>

        <Link href="/catalogo" asChild>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Ver catálogo</Text>
          </Pressable>
        </Link>

        <Link href="/" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Voltar para Home</Text>
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
    padding: 24,
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
    color: "#cfcfcf",
    fontSize: 15,
    lineHeight: 22,
  },
  warningBox: {
    marginTop: 20,
    backgroundColor: "#2a2111",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#725b26",
  },
  warningTitle: {
    color: "#ffe0a3",
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 8,
  },
  warningText: {
    color: "#f0d8aa",
    fontSize: 14,
    lineHeight: 21,
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
  form: {
    backgroundColor: "#171717",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#0f0f0f",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#333333",
    color: "#ffffff",
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  textArea: {
    minHeight: 90,
    textAlignVertical: "top",
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
    marginTop: 12,
  },
  secondaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
  counterBox: {
    backgroundColor: "#171717",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    marginBottom: 14,
  },
  counterText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
  },
  emptyBox: {
    backgroundColor: "#171717",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  emptyText: {
    color: "#cfcfcf",
    fontSize: 15,
    textAlign: "center",
  },
  productCard: {
    backgroundColor: "#171717",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    marginBottom: 12,
  },
  productInfo: {
    marginBottom: 14,
  },
  productName: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 6,
  },
  productMeta: {
    color: "#a8a8a8",
    fontSize: 14,
    marginBottom: 6,
  },
  productPrice: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 8,
  },
  productDescription: {
    color: "#cfcfcf",
    fontSize: 14,
    lineHeight: 21,
  },
  productActions: {
    flexDirection: "row",
    gap: 10,
  },
  editButton: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  editButtonText: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "900",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#2a1111",
    borderWidth: 1,
    borderColor: "#703030",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#ffb3b3",
    fontSize: 15,
    fontWeight: "900",
  },
  buttons: {
    marginTop: 28,
  },
  resetButton: {
    backgroundColor: "#171717",
    borderWidth: 1,
    borderColor: "#555555",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  resetButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "900",
  },
});