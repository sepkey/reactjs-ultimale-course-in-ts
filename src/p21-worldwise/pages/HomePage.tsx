import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <Link to="/product">Product</Link>
      <Link to="/pricing">Pricing</Link>
    </div>
  );
}
