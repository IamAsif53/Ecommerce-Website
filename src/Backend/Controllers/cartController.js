import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Get Logged-in User Cart
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product",
    );

    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: [],
      });
    }

    const formattedCart = cart.items.map((item) => ({
      _id: item.product._id,
      name: item.product.name,
      image: item.product.image,
      price: item.product.price,
      category: item.product.category,
      stock: item.product.stock,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      cart: formattedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Product to Cart
export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.stock} item(s) available.`,
        });
      }

      existingItem.quantity += 1;
    } else {
      cart.items.push({
        product: productId,
        quantity: 1,
      });
    }

    await cart.save();

    const updatedCart = await Cart.findOne({
      user: req.user.id,
    }).populate("items.product");

    const formattedCart = updatedCart.items.map((item) => ({
      _id: item.product._id,
      name: item.product.name,
      image: item.product.image,
      price: item.product.price,
      category: item.product.category,
      stock: item.product.stock,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      cart: formattedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const increaseQuantity = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    const item = cart.items.find(
      (item) => item.product.toString() === req.params.productId,
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    const product = await Product.findById(req.params.productId);

    if (item.quantity >= product.stock) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} item(s) available.`,
      });
    }

    item.quantity += 1;

    await cart.save();

    const updatedCart = await Cart.findOne({
      user: req.user.id,
    }).populate("items.product");

    const formattedCart = updatedCart.items.map((item) => ({
      _id: item.product._id,
      name: item.product.name,
      image: item.product.image,
      price: item.product.price,
      category: item.product.category,
      stock: item.product.stock,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      cart: formattedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const decreaseQuantity = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    const item = cart.items.find(
      (item) => item.product.toString() === req.params.productId,
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    item.quantity -= 1;

    cart.items = cart.items.filter((item) => item.quantity > 0);

    await cart.save();

    const updatedCart = await Cart.findOne({
      user: req.user.id,
    }).populate("items.product");

    const formattedCart = updatedCart.items.map((item) => ({
      _id: item.product._id,
      name: item.product.name,
      image: item.product.image,
      price: item.product.price,
      category: item.product.category,
      stock: item.product.stock,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      cart: formattedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Remove Product from Cart
export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId,
    );

    await cart.save();

    const updatedCart = await Cart.findOne({
      user: req.user.id,
    }).populate("items.product");

    const formattedCart = updatedCart.items.map((item) => ({
      _id: item.product._id,
      name: item.product.name,
      image: item.product.image,
      price: item.product.price,
      category: item.product.category,
      stock: item.product.stock,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      cart: formattedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Clear Cart
export const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ user: req.user.id }, { items: [] });

    res.status(200).json({
      success: true,
      message: "Cart cleared",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
