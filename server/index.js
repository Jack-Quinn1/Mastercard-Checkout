// server/index.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const products = [
  {
    id: 1,
    name: "Mastercard",
    price: 354.62,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png",
  },
  {
    id: 2,
    name: "Visa",
    price: 221.81,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/1200px-Visa.svg.png",
  },
];

app.post("/api/checkout", (req, res) => {
  const { productIds, cardDetails } = req.body;
  const totalAmount = productIds
    .map((id) => products.find((product) => product.id === id))
    .reduce((total, product) => total + product.price, 0);
  setTimeout(() => {
    res.json({ success: true, amount: totalAmount });
  }, 2000);
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
