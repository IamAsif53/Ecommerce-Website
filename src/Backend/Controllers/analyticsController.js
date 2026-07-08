import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const getAnalytics = async (req, res) => {
  try {
    const [orders, products, users] = await Promise.all([
      Order.find(),
      Product.find(),
      User.find(),
    ]);

    // ===============================
    // KPI Statistics
    // ===============================

    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalPrice,
      0,
    );

    const totalOrders = orders.length;

    const totalProducts = products.length;

    const totalCustomers = users.filter((user) => user.role === "user").length;

    // ===============================
    // Order Status
    // ===============================

    const pendingOrders = orders.filter((o) => o.status === "Pending").length;

    const processingOrders = orders.filter(
      (o) => o.status === "Processing",
    ).length;

    const deliveredOrders = orders.filter(
      (o) => o.status === "Delivered",
    ).length;

    // ===============================
    // Monthly Revenue
    // ===============================

    const monthlyRevenue = Array.from({ length: 12 }, (_, month) => {
      const revenue = orders
        .filter((order) => {
          const date = new Date(order.createdAt);

          return (
            date.getMonth() === month &&
            date.getFullYear() === new Date().getFullYear()
          );
        })
        .reduce((sum, order) => sum + order.totalPrice, 0);

      return {
        month: new Date(0, month).toLocaleString("default", {
          month: "short",
        }),

        revenue,
      };
    });

    // ===============================
    // Monthly Orders
    // ===============================

    const monthlyOrders = Array.from({ length: 12 }, (_, month) => ({
      month: new Date(0, month).toLocaleString("default", {
        month: "short",
      }),

      orders: orders.filter((order) => {
        const date = new Date(order.createdAt);

        return (
          date.getMonth() === month &&
          date.getFullYear() === new Date().getFullYear()
        );
      }).length,
    }));

    // ===============================
    // Revenue By Category
    // ===============================

    const categoryMap = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        const product = products.find(
          (p) => p._id.toString() === item.productId,
        );

        if (!product) return;

        if (!categoryMap[product.category]) {
          categoryMap[product.category] = 0;
        }

        categoryMap[product.category] += item.price * item.quantity;
      });
    });

    const categoryRevenue = Object.entries(categoryMap).map(
      ([name, revenue]) => ({
        name,
        revenue,
      }),
    );

    // ===============================
    // Top Selling Products
    // ===============================

    const salesMap = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (!salesMap[item.productId]) {
          salesMap[item.productId] = {
            productId: item.productId,
            name: item.name,
            image: item.image,
            sold: 0,
            revenue: 0,
          };
        }

        salesMap[item.productId].sold += item.quantity;

        salesMap[item.productId].revenue += item.quantity * item.price;
      });
    });

    const topProducts = Object.values(salesMap)
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 5);

    // ===============================
    // Low Stock
    // ===============================

    const lowStockProducts = products.filter((product) => product.stock <= 5);

    // ===============================
    // Recent Sales
    // ===============================

    const recentSales = [...orders]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    // ===============================

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

      monthlyRevenue,

      monthlyOrders,
      categoryRevenue,

      topProducts,

      recentSales,

      lowStockProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
