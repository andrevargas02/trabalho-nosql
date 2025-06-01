import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddClothingForm() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    size: "",
    color: "",
    price: "",
    stock: "",
    imageUrl: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/clothing`, {
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
      })
      .then(() => navigate("/"));
  };

  return (
    <div>
      <h2>Adicionar Nova Peça</h2>
      <form onSubmit={handleSubmit}>
        {["name", "category", "size", "color", "imageUrl"].map((field) => (
          <div key={field}>
            <input
              name={field}
              placeholder={field}
              value={(form as any)[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div>
          <input
            name="price"
            placeholder="Preço"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            name="stock"
            placeholder="Stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Criar</button>
      </form>
    </div>
  );
}

export default AddClothingForm;
