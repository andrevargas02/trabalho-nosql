const Clothing = require("../models/Clothing");

/**
 * @desc Get all clothing items (paginação simples)
 * @route GET /api/clothing
 */
exports.getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const clothes = await Clothing.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Clothing.countDocuments();

    res.json({
      data: clothes,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalItems: total,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Get single clothing item by ID
 * @route GET /api/clothing/:id
 */
exports.getById = async (req, res) => {
  try {
    const item = await Clothing.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Create new clothing item
 * @route POST /api/clothing
 */
exports.create = async (req, res) => {
  try {
    const newItem = await Clothing.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * @desc Update clothing item
 * @route PUT /api/clothing/:id
 */
exports.update = async (req, res) => {
  try {
    const updatedItem = await Clothing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedItem)
      return res.status(404).json({ message: "Item not found" });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * @desc Delete clothing item
 * @route DELETE /api/clothing/:id
 */
exports.remove = async (req, res) => {
  try {
    const deleted = await Clothing.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Buy one unit (decrement stock)
 * @route PATCH /api/clothing/:id/buy
 */
exports.buy = async (req, res) => {
  try {
    const clothing = await Clothing.findById(req.params.id);
    if (!clothing) return res.status(404).json({ message: "Item not found" });

    if (clothing.stock <= 0)
      return res.status(400).json({ message: "Out of stock" });

    clothing.stock -= 1;
    await clothing.save();
    res.json(clothing);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
