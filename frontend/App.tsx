import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClothingList from "./components/ClothingList";
import ClothingDetail from "./components/ClothingDetail";
import AddClothingForm from "./components/AddClothingForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClothingList />} />
        <Route path="/clothing/:id" element={<ClothingDetail />} />
        <Route path="/add" element={<AddClothingForm />} />
      </Routes>
    </Router>
  );
}

export default App;
