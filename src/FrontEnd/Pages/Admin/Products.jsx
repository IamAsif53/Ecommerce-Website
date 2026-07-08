import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductTable from "../../Components/ProductTable";
import ProductForm from "../../Components/ProductForm";
import { getProducts, deleteProduct } from "../../Services/productService";
import ProductStats from "../../Components/ProductStats";
import DeleteModal from "../../Components/DeleteModal";
import { useRef } from "react";
function AdminProducts() {
  // ===========================
  // State
  // ===========================

  const [products, setProducts] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deleteId = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
    stock: "",

    brand: "",
    discount: "",
    rating: "",
    numReviews: "",
    sold: "",
    featured: false,
  });

  // ===========================
  // Fetch Products
  // ===========================

  const fetchProducts = async () => {
    try {
      const data = await getProducts();

      setProducts(data.products);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  // ===========================
  // Edit Product
  // ===========================

  const handleEdit = (product) => {
    setEditingId(product._id);

    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
      stock: product.stock,

      brand: product.brand || "",
      discount: product.discount || "",
      rating: product.rating || "",
      numReviews: product.numReviews || "",
      sold: product.sold || "",
      featured: product.featured || false,
    });
  };

  // ===========================
  // Delete Product
  // ===========================

  const handleDelete = (id) => {
    deleteId.current = id;
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(deleteId.current);

      toast.success("Product Deleted");

      fetchProducts();
    } catch (error) {
      console.log(error);

      toast.error("Delete Failed");
    } finally {
      deleteId.current = null;
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 text-white">
      {" "}
      <div className="mb-10">
        <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#181B20] border border-[#2A2F36] text-[#EF4444] text-sm font-semibold">
          📦 Admin Panel
        </span>

        <h1 className="text-5xl font-bold text-white mt-5">
          Product <span className="text-[#EF4444]">Management</span>
        </h1>

        <p className="text-gray-400 mt-4 text-lg">
          Add, edit and manage your store products.
        </p>
      </div>
      <ProductStats products={products} />
      {/* Product Form */}
      <ProductForm
        fetchProducts={fetchProducts}
        editingId={editingId}
        setEditingId={setEditingId}
        formData={formData}
        setFormData={setFormData}
      />
      <div className="bg-[#181B20] border border-[#2A2F36] rounded-2xl p-5 mb-8 flex flex-col md:flex-row gap-4 justify-between">
        {" "}
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-[#111214] border border-[#2A2F36] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#EF4444] outline-none transition"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-[#111214] border border-[#2A2F36] rounded-xl px-4 py-3 text-white w-full md:w-56 focus:border-[#EF4444] outline-none transition"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      {/* Product List */}
      <div className="mt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">All Products</h2>

          <span className="px-4 py-2 rounded-full bg-[#181B20] border border-[#2A2F36] text-[#EF4444] font-semibold">
            {products.length} Products
          </span>
        </div>

        <ProductTable
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default AdminProducts;
