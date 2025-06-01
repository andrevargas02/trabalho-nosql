const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/clothingController");

// ───────────────────────── rotas ─────────────────────────
router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);
router.post("/", ctrl.create);
router.put("/:id", ctrl.update);
router.delete("/:id", ctrl.remove);

// nova rota de compra
router.patch("/:id/buy", ctrl.buy);
// ─────────────────────────────────────────────────────────

module.exports = router;
