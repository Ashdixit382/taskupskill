import React, { useState } from 'react';
import { PRODUCTS } from "../../products";
import "./shop.css";
import { Navbar } from '../../components/navbar';

function Product({ id, productName, price, productImage, addToCart }) {
  return (
    <div className="product">
      <img src={productImage} />
      <h3>{productName}</h3>
      <p>${price}</p>
      <button onClick={() => addToCart({ id, productName, price })}>Add to Cart</button>
    </div>
  );
}

function CartItem({ item, increaseQuantity, decreaseQuantity }) {
  return (
    <div className="cart-item">
      <div>
        <h3>{item.productName}</h3>
        <p>${item.price}</p>
      </div>
      <div>
        <button onClick={() => decreaseQuantity(item.id)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => increaseQuantity(item.id)}>+</button>
      </div>
    </div>
  );
}

function Shop() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const increaseQuantity = (productId) => {
    setCartItems(cartItems.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (productId) => {
    setCartItems(cartItems.map(item =>
      item.id === productId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
    ));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="Shop">
      {/* <h1>Heading</h1> */}
      <Navbar cartItems={cartItems} setIsCartOpen={setIsCartOpen} />
      <div className="products">
        {PRODUCTS.map(product => (
          <Product key={product.id} {...product} addToCart={addToCart} />
        ))}
      </div>
      {isCartOpen && (
        <div className="cart-container">
          <div className="cart-content">
            <h2>Cart</h2>
            <button onClick={() => setIsCartOpen(false)}>X</button>
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />
            ))}
            <p>Total: ${totalPrice.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Shop;