import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { items, updateItemQuantity } = useContext(CartContext);

  if (items.length === 0) {
    return <p>Your shopping cart is empty.</p>;
  }

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h1>My Shopping cart</h1>
      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-thumbnail">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="item-image"
              />
            </div>
            <div className="cart-item-details">
              <h3>{item.title}</h3>
              <p><b>Price: $ {item.price.toFixed(2)}</b></p>
              <p><b>Quantity: {item.quantity}</b></p>
              <div className="cart-item-controls">
                <button onClick={() => updateItemQuantity(item.id, 1)}>+</button>
                <button onClick={() => updateItemQuantity(item.id, -1)}>-</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h2 className="total-price">Total price: $ {total.toFixed(2)}</h2>
    </div>
  );
};

export default Cart;