import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../src/cartStore";
import type { ClothingItem } from "../src/types";

const Cart = () => {
  const { items, clear, remove } = useCart();
  const navigate = useNavigate();

  const cartItems = Object.values(
    items
  ) as { product: ClothingItem; qty: number }[];

  const total = cartItems.reduce(
    (sum, i) => sum + i.product.price * i.qty,
    0
  );

  const checkout = async () => {
    try {
      // faz PATCH /buy para cada quantidade
      const requests = cartItems.flatMap((i) =>
        Array.from({ length: i.qty }).map(() =>
          axios.patch(
            `${import.meta.env.VITE_API_URL}/api/clothing/${i.product._id}/buy`
          )
        )
      );
      await Promise.all(requests);
      alert("Compra concluída!");
      clear();
      navigate("/");
    } catch {
      alert("Erro ao finalizar compra (stock?)");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "1rem" }}>
        ← Voltar
      </button>

      <h2>Carrinho</h2>

      {cartItems.length === 0 && <p>O carrinho está vazio.</p>}

      {cartItems.map((i) => (
        <div key={i.product._id} style={{ marginBottom: 10 }}>
          {i.product.name} × {i.qty} —{" "}
          {(i.product.price * i.qty).toFixed(2)} €
          <button onClick={() => remove(i.product._id)} style={{ marginLeft: 8 }}>
            Remover
          </button>
        </div>
      ))}

      {total > 0 && (
        <>
          <p>Total: {total.toFixed(2)} €</p>
          <button onClick={checkout}>Finalizar compra</button>
        </>
      )}
    </div>
  );
};

export default Cart;
