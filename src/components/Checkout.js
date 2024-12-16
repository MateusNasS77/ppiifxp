import { Link } from "react-router-dom";
import { useContext } from "react";
import Cart from "./Cart"
import { CartContext } from "../context/CartContext";

export default function Checkout() {
    const { clearCart } = useContext(CartContext);

    return (
        <section className="checkout">
            <Cart />
            <div className="product-actions">
                <button onClick={clearCart}>CLEAN</button>
                <Link to="/shop">
                <button>RETURN</button>
                </Link>
            </div>
     
        </section>
    );
}