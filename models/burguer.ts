export type Ingrediente =
  | "blend"
  | "queijo cheddar"
  | "ketchup"
  | "barbecue"
  | "onion ringing"
  | "molho da casa";

export type Hamburguer = "Double Dose" | "Ribs Goat" | "Kids Burger";

export default interface IBurguer {
  id: number;
  ilustracao: string;
  sabor: Hamburguer;
  preco: number;
  listaIngredientes: Ingrediente[];
}
