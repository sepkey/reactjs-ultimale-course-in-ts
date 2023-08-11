import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import { Pizza } from "../../models/models";
import MenuItem from "./MenuItem";

export default function Menu() {
  const menu = useLoaderData();
  return (
    <ul>
      {(menu as Pizza[]).map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu || null;
}
