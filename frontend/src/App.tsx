import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, RequireAuth } from "./auth";
import ClothingList from "../components/ClothingList";
import Login from "../components/Login";
import Register from "../components/Register";
import Cart from "../components/Cart";

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <ClothingList />
            </RequireAuth>
          }
        />
        <Route
          path="/cart"
          element={
            <RequireAuth>
              <Cart />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
