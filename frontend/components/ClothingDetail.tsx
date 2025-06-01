import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { ClothingItem } from "../src/types";

function ClothingDetail() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<ClothingItem | null>(null);
  const [loading, setLoading] = useState(false);

  // ────────────────────────────────────────────
  useEffect(() => {
    axios.get(`/api/clothing/${id}`).then((res) => setItem(res.data));
  }, [id]);
  // ────────────────────────────────────────────

  const handleBuy = async () => {
    if (!item || item.stock <= 0) return;
    setLoading(true);
    try {
      const res = await axios.patch(`/api/clothing/${id}/buy`);
      setItem(res.data); // resposta devolve o item já com stock actualizado
    } catch (err) {
      alert("Erro a comprar (pode estar sem stock)");
    } finally {
      setLoading(false);
    }
  };

  if (!item) return <p>A carregar…</p>;

  return (
    <div>
      <h2>{item.name}</h2>
      <img src={item.imageUrl} alt={item.name} width="300" />
      <p><strong>Categoria:</strong> {item.category}</p>
      <p><strong>Tamanho:</strong> {item.size}</p>
      <p><strong>Cor:</strong> {item.color}</p>
      <p><strong>Preço:</strong> {item.price.toFixed(2)}€</p>
      <p><strong>Stock:</strong> {item.stock}</p>

      <button
        onClick={handleBuy}
        disabled={loading || item.stock === 0}
        style={{ marginTop: "1rem" }}
      >
        {item.stock === 0 ? "Indisponível" : loading ? "A processar…" : "Comprar"}
      </button>
    </div>
  );
}

export default ClothingDetail;
