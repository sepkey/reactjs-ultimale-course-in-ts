type Props = {
  pizza: {
    name: string;
    ingredients: string;
    photoName: string;
    price: number;
    soldOut: boolean;
  };
};
export default function Pizza({ pizza }: Props) {
  // if (pizza.soldOut) return null;
  return (
    <li className={`pizza ${pizza.soldOut && "sold-out"}`}>
      <img src={pizza.photoName} alt="Pizza" />
      <div>
        <h3>{pizza.name}</h3>
        <p>{pizza.ingredients}</p>
        <span>{pizza.soldOut ? "Sold Out" : pizza.price}</span>
      </div>
    </li>
  );
}
