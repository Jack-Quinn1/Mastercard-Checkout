// src/Checkout.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [finalAmount, setFinalAmount] = useState(0);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/checkout", {
        productIds: products.map((product) => product.id),
        cardDetails: {
          number: cardNumber,
          expiry,
          cvc,
        },
      });
      setFinalAmount(response.data.amount);
      setSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container">
      <div>
        <h1>Checkout</h1>
        <div className="products-container">
          {products.map((product) => (
            <div key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>€{product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Expiry"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
        />
        <input
          type="text"
          placeholder="CVC"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
        />
        <button onClick={handleCheckout}>
          {loading ? <>Processing...</> : "Buy Now"}
        </button>
        {success && (
          <p>Payment successful! You paid €{finalAmount.toFixed(2)}.</p>
        )}
      </div>
    </div>
  );
};

export default Checkout;
