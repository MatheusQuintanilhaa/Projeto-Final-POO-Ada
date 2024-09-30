import CardComponent from "./components/card.component.js";
import HeaderComponent from "./components/header.component.js";
import IBurguer from "./models/burguer.js";

const header = new HeaderComponent();

export let burguerArray: Array<IBurguer> = [
  {
    id: generateIdentity(),
    ilustracao:
      "https://static.ifood-static.com.br/image/upload/t_medium/pratos/70c3ef7c-10ce-4edc-a0bc-78ae6cd52b9d/202408052135_UX6H_i.jpg",
    sabor: "Double Dose",
    preco: 32,
    listaIngredientes: ["blend", "queijo cheddar", "molho da casa"],
  },
  {
    id: generateIdentity(),
    ilustracao:
      "https://static.ifood-static.com.br/image/upload/t_medium/pratos/70c3ef7c-10ce-4edc-a0bc-78ae6cd52b9d/202409061429_VO12_i.jpg",
    sabor: "Ribs Goat",
    preco: 29,
    listaIngredientes: ["blend", "queijo cheddar", "onion ringing"],
  },
  {
    id: generateIdentity(),
    ilustracao:
      "https://static.ifood-static.com.br/image/upload/t_medium/pratos/70c3ef7c-10ce-4edc-a0bc-78ae6cd52b9d/202408152359_O88D_i.jpg",
    sabor: "Kids Burger",
    preco: 55,
    listaIngredientes: ["blend", "queijo cheddar", "ketchup"],
  },
];

console.log(burguerArray);

window.addEventListener("load", () => {
  const saveBurguer = localStorage.getItem("burguerArray");
  if (saveBurguer) {
    burguerArray = [...burguerArray, ...JSON.parse(saveBurguer)];
  }

  for (let burguer of burguerArray) {
    const card = new CardComponent(burguer);
  }

  console.log(saveBurguer);
});

export function generateIdentity() {
  const identity = Math.floor(Math.random() * 1000000) + 1;
  return identity;
}
