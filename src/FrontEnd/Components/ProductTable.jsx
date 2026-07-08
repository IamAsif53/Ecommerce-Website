function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl shadow-lg overflow-hidden">
      <table className="w-full">
        {/* Table Header */}

        <thead className="bg-[#111214] text-white">
          <tr>
            <th className="p-5 text-left font-semibold">Image</th>

            <th className="p-5 text-left font-semibold">Product</th>

            <th className="p-5 text-left font-semibold">Category</th>

            <th className="p-5 text-left font-semibold">Price</th>

            <th className="p-5 text-left font-semibold">Stock</th>

            <th className="p-5 text-left font-semibold">Status</th>

            <th className="p-5 text-center font-semibold">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}

        <tbody>
          {products.map((product) => (
            <tr
              key={product._id}
              className="border-t border-[#2A2F36] hover:bg-[#22262D] transition-colors duration-300"
            >
              {/* Product Image */}

              <td className="p-5">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-xl object-cover border border-[#2A2F36]"
                />
              </td>

              {/* Product Name */}

              <td className="p-5">
                <h3 className="font-semibold text-white">{product.name}</h3>
              </td>

              {/* Category */}

              <td className="p-5 text-gray-300">{product.category}</td>

              {/* Price */}

              <td className="p-5 font-bold text-[#EF4444]">${product.price}</td>

              {/* Stock */}

              <td className="p-5 text-white">{product.stock}</td>

              {/* Status */}

              <td className="p-5">
                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                    Number(product.stock) === 0
                      ? "bg-red-500/20 text-red-400"
                      : Number(product.stock) <= 5
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {Number(product.stock) === 0
                    ? "Out of Stock"
                    : Number(product.stock) <= 5
                      ? "Low Stock"
                      : "In Stock"}
                </span>
              </td>

              {/* Actions */}

              <td className="p-5">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => onEdit(product)}
                    className="px-4 py-2 rounded-xl bg-[#EF4444] hover:bg-[#DC2626] text-white font-medium transition-all duration-300"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(product._id)}
                    className="px-4 py-2 rounded-xl bg-[#2A2F36] hover:bg-red-600 text-white font-medium transition-all duration-300"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
