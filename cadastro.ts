import HeaderComponent from "./components/header.component.js";
import { generateIdentity } from "./main.js";
import IBurguer, { Ingrediente } from "./models/burguer.js";

const headerComponent = new HeaderComponent();

const burguerForm: HTMLFormElement | null = document.getElementById(
  "burguerForm"
) as HTMLFormElement;

burguerForm?.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();

  const target = event.target as any;
  console.log(target?.elements["ilustracao"]);

  const burguerArray: Array<IBurguer> = JSON.parse(
    localStorage.getItem("burguerArray") ?? "[]"
  );

  const ingredientes: Ingrediente[] =
    target?.elements["ingredientes"].value.split(", ");

  console.log(ingredientes);

  burguerArray.push({
    id: generateIdentity(),
    ilustracao: target?.elements["ilustracao"].value,
    preco: target?.elements["preco"].value,
    sabor: target?.elements["sabor"].value,
    listaIngredientes: ingredientes,
  });

  localStorage.setItem("burguerArray", JSON.stringify(burguerArray));

  burguerForm.reset();
});
