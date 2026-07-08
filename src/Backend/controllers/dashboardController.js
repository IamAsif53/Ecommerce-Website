import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const getDashboardData = async (req, res) => {
  try {
    // Run all database queries in parallel
    const [orders, products, users] = await Promise.all([
      Order.find().sort({ createdAt: -1 }),
      Product.find(),
      User.find(),
    ]);

    // ===== Statistics =====
    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalPrice,
      0,
    );

    const totalOrders = orders.length;
    const totalProducts = products.length;

    // Count only customers (exclude admins)
    const totalCustomers = users.filter((user) => user.role === "user").length;

    const pendingOrders = orders.filter(
      (order) => order.status === "Pending",
    ).length;

    const processingOrders = orders.filter(
      (order) => order.status === "Processing",
    ).length;

    const deliveredOrders = orders.filter(
      (order) => order.status === "Delivered",
    ).length;

    // ===== Recent Orders =====
    const recentOrders = orders.slice(0, 5);

    // ===== Low Stock Products =====
    const lowStockProducts = products.filter(
      (product) => Number(product.stock) <= 5,
    );

    // ===== Top Selling Products =====
    const productSales = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (!productSales[item.productId]) {
          productSales[item.productId] = {
            productId: item.productId,
            name: item.name,
            image: item.image,
            quantitySold: 0,
            revenue: 0,
          };
        }

        productSales[item.productId].quantitySold += item.quantity;
        productSales[item.productId].revenue += item.quantity * item.price;
      });
    });

    const topSellingProducts = Object.values(productSales)
      .sort((a, b) => b.quantitySold - a.quantitySold)
      .slice(0, 5);

    res.status(200).json({
      success: true,

      stats: {
        totalRevenue,
        totalOrders,
        totalProducts,
        totalCustomers,
        pendingOrders,
        processingOrders,
        deliveredOrders,
      },

      recentOrders,
      lowStockProducts,
      topSellingProducts,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
