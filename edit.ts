// Pegar o id da url
//usar o find no burguerArray para achar os valores do hamburguer, imagem,preco...
// setar os valores dos inputs
// ao salvar fazer um map no burguerArray e alterar os valores
// setar o localstorage e depois redirecionar para pagina principal

import { burguerArray as initialBurguerArray } from "./main.js";
import HeaderComponent from "./components/header.component.js";
import { Ingrediente, Hamburguer } from "./models/burguer.js";

const headerComponent = new HeaderComponent();

// Função para renderizar o header
function renderHeader() {
  const headerContainer = document.getElementById("header");
  if (headerContainer) {
    headerContainer.innerHTML = headerComponent.render();
  } else {
    console.error("Elemento de header não foi encontrado.");
  }
}

// Função para carregar o array de hamburguers do localStorage
function getBurguerArrayFromLocalStorage() {
  const storedBurguerArray = localStorage.getItem("burguerArray");
  return storedBurguerArray
    ? JSON.parse(storedBurguerArray)
    : initialBurguerArray;
}

// Função para inicializar a lógica do formulário de edição
function initializeEditForm() {
  // 1. Pegar o ID da URL (que é uma string)
  const urlParams = new URLSearchParams(window.location.search);
  const burguerId = urlParams.get("id");

  // Carregar o array de hamburguers do localStorage
  const burguerArray = getBurguerArrayFromLocalStorage();

  if (burguerId) {
    // 2. Converter o burguerId para número
    const burguerIdNumber = parseInt(burguerId, 10);

    if (isNaN(burguerIdNumber)) {
      console.error("Hamburguer com ID inválido.");
      return;
    }

    // 3. Usar o find para encontrar o hamburguer correspondente
    const hamburguer = burguerArray.find(
      (burguer: any) => burguer.id === burguerIdNumber
    );

    if (hamburguer) {
      console.log("Hamburguer encontrada:", hamburguer);

      // 4. Setar os valores dos inputs
      const inputIlustracao = document.getElementById(
        "ilustracao"
      ) as HTMLInputElement;
      const inputSabor = document.getElementById("sabor") as HTMLSelectElement;
      const inputPreco = document.getElementById("preco") as HTMLInputElement;
      const inputIngredientes = document.getElementById(
        "ingredientes"
      ) as HTMLInputElement;

      if (inputIlustracao) inputIlustracao.value = hamburguer.ilustracao;
      if (inputSabor) inputSabor.value = hamburguer.sabor;
      if (inputPreco) inputPreco.value = hamburguer.preco.toString();
      if (inputIngredientes)
        inputIngredientes.value = hamburguer.listaIngredientes.join(", ");
    } else {
      console.error("Hamburguer não encontrada no array.");
    }

    // 5. Lógica para salvar as alterações
    const form = document.getElementById("burguerForm");
    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Atualizar o hamburguer no array usando map
        const updatedBurguerArray = burguerArray.map((burguerItem: any) => {
          if (burguerItem.id === burguerIdNumber) {
            const ingredientes = (
              document.getElementById("ingredientes") as HTMLInputElement
            ).value.split(", ");

            return {
              ...burguerItem,
              ilustracao: (
                document.getElementById("ilustracao") as HTMLInputElement
              ).value,
              sabor: (document.getElementById("sabor") as HTMLSelectElement)
                .value as Hamburguer,
              preco: parseFloat(
                (document.getElementById("preco") as HTMLInputElement).value
              ),
              listaIngredientes: ingredientes as Ingrediente[],
            };
          }
          return burguerItem;
        });

        // 6. Atualizar o localStorage com os novos valores
        localStorage.setItem(
          "burguerArray",
          JSON.stringify(updatedBurguerArray)
        );

        // 7. Redirecionar para a página principal
        window.location.href = "index.html";
      });
    }
  } else {
    console.error("Hamburguer com ID não encontrado na URL.");
  }
}

// Garantir que o DOM está carregado antes de executar as funções
window.addEventListener("DOMContentLoaded", () => {
  // 1. Renderizar o header
  renderHeader();

  // 2. Inicializar a lógica do formulário de edição
  initializeEditForm();
});
