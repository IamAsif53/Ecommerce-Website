import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import { getProducts } from "../services/productService";
import { FaSearch } from "react-icons/fa";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, sortOption]);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOption === "lowToHigh") {
        return Number(a.price) - Number(b.price);
      }

      if (sortOption === "highToLow") {
        return Number(b.price) - Number(a.price);
      }

      if (sortOption === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }

      return 0;
    });

  const indexOfLastProduct = currentPage * productsPerPage;

  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (loading) {
    return <h1 className="text-center text-2xl mt-10">Loading Products...</h1>;
  }

  return (
    <div className="min-h-screen bg-[#111214] py-12 text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}

        <div className="text-center mb-14">
          <span className="uppercase tracking-[4px] text-[#EF4444] font-semibold text-sm">
            Premium Collection
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold mt-4">
            Our Products
          </h1>

          <p className="text-gray-400 mt-5 text-lg max-w-3xl mx-auto leading-8">
            Explore premium gadgets carefully selected for performance,
            innovation and everyday life.
          </p>
        </div>

        {/* Search & Filters */}

        <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-6 mb-10 shadow-xl">
          <div className="grid lg:grid-cols-12 gap-5">
            {/* Search */}

            <div className="lg:col-span-8 relative">
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />

              <input
                type="text"
                placeholder="Search premium products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-14 rounded-2xl bg-[#111214] border border-[#2A2F36] pl-14 pr-5 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-[#EF4444] focus:ring-2 focus:ring-red-500/20"
              />
            </div>

            {/* Category */}

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-14 rounded-2xl bg-[#111214] border border-[#2A2F36] px-5 text-white outline-none transition-all duration-300 focus:border-[#EF4444] focus:ring-2 focus:ring-red-500/20"
            >
              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                  className="bg-[#111214] text-white"
                >
                  {cat}
                </option>
              ))}
            </select>

            {/* Sort */}

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="h-14 rounded-2xl bg-[#111214] border border-[#2A2F36] px-5 text-white outline-none transition-all duration-300 focus:border-[#EF4444] focus:ring-2 focus:ring-red-500/20"
            >
              <option value="" className="bg-[#111214]">
                Sort By
              </option>

              <option value="lowToHigh" className="bg-[#111214]">
                Price : Low → High
              </option>

              <option value="highToLow" className="bg-[#111214]">
                Price : High → Low
              </option>

              <option value="newest" className="bg-[#111214]">
                Newest
              </option>
            </select>
          </div>
        </div>

        {/* Product Counter */}

        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white">Premium Products</h2>

            <p className="text-gray-400 mt-2">
              Showing
              <span className="mx-2 font-bold text-[#EF4444] text-lg">
                {filteredProducts.length}
              </span>
              Products
            </p>
          </div>
        </div>

        {/* Product Grid */}

        {filteredProducts.length === 0 ? (
          <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl py-24 text-center shadow-xl">
            <div className="text-7xl mb-6">📦</div>

            <h2 className="text-3xl font-bold text-white">No Products Found</h2>

            <p className="text-gray-400 mt-4">
              Try searching with another keyword or category.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {currentProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination */}

        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center items-center gap-3 mt-16">
            {/* Previous */}

            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                currentPage === 1
                  ? "bg-[#1F2228] border border-[#2A2F36] text-gray-500 cursor-not-allowed"
                  : "bg-[#181B20] border border-[#2A2F36] text-white hover:border-[#EF4444] hover:text-[#EF4444] hover:shadow-lg"
              }`}
            >
              ← Previous
            </button>

            {/* Page Numbers */}

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-12 h-12 rounded-xl font-bold transition-all duration-300 ${
                  currentPage === index + 1
                    ? "bg-[#EF4444] text-white shadow-lg shadow-red-500/30"
                    : "bg-[#181B20] border border-[#2A2F36] text-gray-300 hover:border-[#EF4444] hover:text-[#EF4444]"
                }`}
              >
                {index + 1}
              </button>
            ))}

            {/* Next */}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                currentPage === totalPages
                  ? "bg-[#1F2228] border border-[#2A2F36] text-gray-500 cursor-not-allowed"
                  : "bg-[#181B20] border border-[#2A2F36] text-white hover:border-[#EF4444] hover:text-[#EF4444] hover:shadow-lg"
              }`}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
