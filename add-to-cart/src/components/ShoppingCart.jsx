import React, { useReducer } from "react";
import "./ShoppingCart.css";

const products = [
  { id: 1, name: "Wireless Mouse", price: 25 },
  { id: 2, name: "Wireless Keyboard", price: 85 },
  { id: 3, name: "USB-C Hub", price: 45 },
  { id: 4, name: "LG Monitor 32", price: 550 },
];

const initialState = [];

function calculateTotal(cart) {
  return cart.reduce((total, product) => {
    return total + product.quantity * product.price;
  }, 0);
}

function reducer(cart, action) {
  if (action.type === "add") {
    const inCart = Boolean(cart.find((item) => item.id === action.id));

    if (!inCart) {
      const product = products.find((p) => p.id === action.id);
      return [...cart, { ...product, quantity: 1 }];
    }

    return cart.map((item) =>
      item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  } else if (action.type === "update") {
    if (action.adjustment === "increment") {
      return cart.map((item) =>
        item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    }

    const item = cart.find(({ id }) => id === action.id);
    if (item.quantity === 1) {
      return cart.filter((item) => item.id !== action.id);
    } else {
      return cart.map((item) =>
        item.id === action.id ? { ...item, quantity: item.quantity - 1 } : item
      );
    }
  } else {
    throw new Error("This action type isn't supported");
  }
}

function ShoppingCart() {
  const [cart, dispatch] = useReducer(reducer, initialState);

  const handleAddToCart = (id) => dispatch({ type: "add", id });

  const handleUpdateQuantity = (id, adjustment) => {
    dispatch({ type: "update", id, adjustment });
  };

  return (
    <div className="app-container">
      <main className="main-content">
        <h1 className="page-title">Shopping Mart</h1>

        <section className="products-section">
          <h2 className="section-heading">Our Products</h2>
          <div className="product-grid">
            {" "}
            {products.map(({ id, name, price }) => (
              <div key={id} className="product-card">
                <div>
                  <h3 className="product-name"> {name}</h3>
                  <p className="product-price"> ₹{price}</p>
                </div>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(id)}
                >
                  Add to cart
                </button>
              </div>
            ))}
          </div>
        </section>
        <hr className="divider" />
        <aside className="shopping-cart-aside">
          <div>
            <h2 className="shopping-cart-heading">Shopping Cart</h2>

            <ul className="cart-item-list">
              {cart.map(({ id, name, quantity }) => (
                <li key={id} className="cart-item">
                  <span className="cart-item-name">{name}</span>{" "}
                  <div className="quantity-controls">
                    {" "}
                    <button
                      className="quantity-btn minus"
                      onClick={() => handleUpdateQuantity(id, "decrement")}
                    >
                      {" "}
                      -
                    </button>
                    <span className="quantity-display">{quantity}</span>{" "}
                    <button
                      className="quantity-btn plus"
                      onClick={() => handleUpdateQuantity(id, "increment")}
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
              {!cart.length && (
                <p className="empty-cart-message">Your cart is empty.</p>
              )}
            </ul>
          </div>

          <hr className="cart-total-divider" />
          <h3 className="total-price"> Total: ₹{calculateTotal(cart)}</h3>
        </aside>
      </main>
    </div>
  );
}

export { ShoppingCart };
