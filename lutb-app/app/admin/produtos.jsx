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

import * as ProdutosData from "../../src/data/mockProdutos";

function carregarProdutosIniciais() {
  if (Array.isArray(ProdutosData.produtos)) {
    return ProdutosData.produtos;
  }

  if (Array.isArray(ProdutosData.default)) {
    return ProdutosData.default;
  }

  if (ProdutosData.default && Array.isArray(ProdutosData.default.produtos)) {
    return ProdutosData.default.produtos;
  }

  return [];
}

export default function AdminProdutos() {
  const [produtos, setProdutos] = useState(carregarProdutosIniciais);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");

  function limparCampos() {
    setNome("");
    setPreco("");
    setCategoria("");
    setDescricao("");
  }

  function cadastrarProduto() {
    if (!nome.trim() || !preco.trim() || !categoria.trim()) {
      Alert.alert("Atenção", "Preencha nome, preço e categoria.");
      return;
    }

    const novoProduto = {
      id: String(Date.now()),
      nome: nome.trim(),
      preco: preco.trim(),
      categoria: categoria.trim(),
      descricao: descricao.trim() || "Produto cadastrado temporariamente.",
      imagem: null,
    };

    setProdutos((listaAtual) => [novoProduto, ...listaAtual]);
    limparCampos();

    Alert.alert(
      "Produto adicionado",
      "Produto inserido apenas no estado local da tela. Ainda não foi salvo no Supabase."
    );
  }

  function removerProdutoPorIndice(indiceParaRemover) {
    setProdutos((listaAtual) =>
      listaAtual.filter((_, indiceAtual) => indiceAtual !== indiceParaRemover)
    );

    Alert.alert(
      "Produto removido",
      "Produto removido apenas da lista temporária desta tela."
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Administração</Text>
        <Text style={styles.subtitle}>
          Tela administrativa temporária para gerenciamento visual dos produtos
          da LUTB.
        </Text>
      </View>

      <View style={styles.warningBox}>
        <Text style={styles.warningTitle}>Modo temporário</Text>
        <Text style={styles.warningText}>
          Os produtos adicionados ou removidos nesta tela não são salvos no banco
          de dados. Quando o Supabase estiver pronto, esta tela poderá usar
          operações reais de cadastro, edição e exclusão.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cadastrar produto</Text>

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

          <Pressable style={styles.primaryButton} onPress={cadastrarProduto}>
            <Text style={styles.primaryButtonText}>Adicionar produto</Text>
          </Pressable>

          <Pressable style={styles.secondaryButton} onPress={limparCampos}>
            <Text style={styles.secondaryButtonText}>Limpar campos</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Produtos cadastrados</Text>

        <View style={styles.counterBox}>
          <Text style={styles.counterText}>
            Total de produtos na lista: {produtos.length}
          </Text>
        </View>

        {produtos.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>
              Nenhum produto encontrado no mock.
            </Text>
          </View>
        ) : (
          produtos.map((produto, indice) => (
            <View
              key={`${produto.id || produto.nome || "produto"}-${indice}`}
              style={styles.productCard}
            >
              <View style={styles.productInfo}>
                <Text style={styles.productName}>
                  {produto.nome || produto.name || "Produto sem nome"}
                </Text>

                <Text style={styles.productMeta}>
                  Categoria: {produto.categoria || "Sem categoria"}
                </Text>

                <Text style={styles.productPrice}>
                  R$ {produto.preco || produto.price || "0,00"}
                </Text>

                <Text style={styles.productDescription}>
                  {produto.descricao ||
                    produto.description ||
                    "Sem descrição cadastrada."}
                </Text>
              </View>

              <Pressable
                style={styles.deleteButton}
                onPress={() => removerProdutoPorIndice(indice)}
              >
                <Text style={styles.deleteButtonText}>Remover</Text>
              </Pressable>
            </View>
          ))
        )}
      </View>

      <View style={styles.buttons}>
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
  deleteButton: {
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
});