import { useEffect, useState } from "react";
import axios from "axios";
import type { ClothingItem } from "../src/types";
import { useCart } from "../src/cartStore";
import { Link } from "react-router-dom";

const ClothingList = () => {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const addToCart = useCart((state) => state.add);  // ✅ callback tipado

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/clothing`).then((res) => {
      const list: ClothingItem[] = Array.isArray(res.data)
        ? res.data
        : res.data.data;
      setItems(list);
    });
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>🛍️ Loja de Roupa</h1>
        <Link to="/cart">Ver Carrinho</Link>
      </header>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
        {items.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              width: "220px",
              textAlign: "center",
            }}
          >
            <img src={item.imageUrl} alt={item.name} width="100%" />
            <h3>{item.name}</h3>
            <p>{item.price.toFixed(2)} €</p>
            <p>Stock: {item.stock}</p>
            <button
              onClick={() => addToCart(item)}
              disabled={item.stock === 0}
            >
              {item.stock === 0 ? "Esgotado" : "Adicionar ao carrinho"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClothingList;
