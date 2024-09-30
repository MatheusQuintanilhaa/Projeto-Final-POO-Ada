import IBurguer from "../models/burguer";

export default class CardComponent {
  constructor(novoHamburguer: IBurguer) {
    const cardList = document.getElementById("cards-list");

    if (cardList) {
      cardList.innerHTML += this.render(novoHamburguer);
      this.setupEventListeners(cardList);
    }
  }

  render(novoHamburguer: IBurguer) {
    console.log(novoHamburguer.listaIngredientes);

    const ingredientes = novoHamburguer.listaIngredientes.join(", ");

    return `
         <div class="col" id="${novoHamburguer.id}">
          <div class="card" style="width: 18rem">
            <img
              src="${novoHamburguer.ilustracao}"
              class="card-img-top"
              alt="${novoHamburguer.sabor}"
            />
            <div class="card-body">
              <h5 class="card-title">${novoHamburguer.sabor}</h5>
              <p class="card-text">R$ ${novoHamburguer.preco},00</p>
              <p class="card-text">
                Ingredientes: ${ingredientes}
              </p>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                data-bs-title="Adicionar ao carrinho"
              >
                <i class="fa fa-cart-plus" aria-hidden="true"></i>
              </button>
              <button
                class="btn btn-edit btn-warning"
                data-item-id="${novoHamburguer.id}"
                type="button"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                data-bs-title="Editar item"
              >
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
              </button>
              <button
                type="button"
                class="btn btn-danger btn-delete"
                data-item-id="${novoHamburguer.id}"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                data-bs-title="Remover item"
                data-bs-toggle="modal"
                data-bs-target="#deleteModal"
              >
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
        `;
  }

  setupEventListeners(cardList: HTMLElement) {
    cardList.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;

      if (target.closest(".btn-delete")) {
        // Verifica se o botão de exclusão foi clicado
        const burguerId = target
          .closest(".btn-delete")
          ?.getAttribute("data-item-id");
        if (burguerId) {
          this.deleteBurguer(burguerId);
        }
      }

      if (target.closest(".btn-edit")) {
        // Verifica se o botão de edição foi clicado
        const BurguerId = target
          .closest(".btn-edit")
          ?.getAttribute("data-item-id");
        if (BurguerId) {
          this.handleEditClick(BurguerId);
        }
      }
    });
  }

  handleEditClick(burguerId: string) {
    console.log(`Edit button clicked for burguer with ID: ${burguerId}`);

    window.location.href = "edit.html?id=" + burguerId;
  }

  deleteBurguer(burguerId: string) {
    //tem que deletar os hamburguers do burguerArray
    const burguerArray: Array<IBurguer> = JSON.parse(
      localStorage.getItem("burguerArray") ?? "[]"
    );

    const burguerIndex = burguerArray.findIndex(
      (burguer) => burguer.id === parseInt(burguerId)
    );

    if (burguerIndex !== -1) {
      burguerArray.splice(burguerIndex, 1);
      localStorage.setItem("burguerArray", JSON.stringify(burguerArray));
      location.reload();
    }
  }
}
