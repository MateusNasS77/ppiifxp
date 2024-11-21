import { Link } from "react-router-dom";
import Cart from "./Cart"

export default function Checkout() {
    return (
        <section className="checkout">
            <h2>Checkout</h2>
            <Cart />
            <Link to="/" className="product-actions">
                <button>RETURN</button>
            </Link>
        </section>
    );
}