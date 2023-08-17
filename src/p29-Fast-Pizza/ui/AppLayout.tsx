import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen  grid-rows-[auto_1fr_auto] bg-stone-100 text-stone-700">
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-y-scroll">
        <main className="ml-auto mr-auto max-w-3xl ">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}
