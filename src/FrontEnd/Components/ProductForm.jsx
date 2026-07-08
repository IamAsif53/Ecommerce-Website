import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { createProduct, updateProduct } from "../services/productService";

function ProductForm({
  fetchProducts,
  editingId,
  setEditingId,
  formData,
  setFormData,
}) {
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = formData.image;

      if (imageFile) {
        const uploadData = new FormData();

        uploadData.append("image", imageFile);

        const uploadRes = await axios.post(
          "http://localhost:5000/api/upload",
          uploadData,
        );

        imageUrl = uploadRes.data.imageUrl;
      }

      const productData = {
        ...formData,
        image: imageUrl,
      };

      if (editingId) {
        await updateProduct(editingId, productData);

        toast.success("Product Updated");

        setEditingId(null);
      } else {
        await createProduct(productData);

        toast.success("Product Added");
      }

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
          numReviews: product.numReviews || 0,
          sold: product.sold || "",
          featured: product.featured || false,
        });
      };

      setImageFile(null);

      fetchProducts();
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl shadow-lg p-8 mb-10">
      {" "}
      <h2 className="text-3xl font-bold text-white mb-8">
        {" "}
        {editingId ? "Edit Product" : "Add New Product"}
      </h2>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="bg-[#111214] border border-[#2A2F36] rounded-xl p-3 text-white placeholder-gray-500 focus:border-[#EF4444] outline-none transition"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="bg-[#111214] border border-[#2A2F36] rounded-xl p-3 text-white placeholder-gray-500 focus:border-[#EF4444] outline-none transition"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="bg-[#111214] border border-[#2A2F36] rounded-xl p-3 text-white placeholder-gray-500 focus:border-[#EF4444] outline-none transition"
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="bg-[#111214] border border-[#2A2F36] rounded-xl p-3 text-white placeholder-gray-500 focus:border-[#EF4444] outline-none transition"
          required
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand (Apple, Samsung...)"
          value={formData.brand}
          onChange={handleChange}
          className="bg-[#111214] border border-[#2A2F36] rounded-xl p-3 text-white placeholder-gray-500 focus:border-[#EF4444] outline-none transition"
        />
        <input
          type="number"
          name="discount"
          placeholder="Discount (%)"
          value={formData.discount}
          onChange={handleChange}
          className="bg-[#111214] border border-[#2A2F36] rounded-xl p-3 text-white placeholder-gray-500 focus:border-[#EF4444] outline-none transition"
          min="0"
          max="100"
        />
        <input
          type="number"
          name="rating"
          placeholder="Initial Rating"
          value={formData.rating}
          onChange={handleChange}
          className="bg-[#111214] border border-[#2A2F36] rounded-xl p-3 text-white placeholder-gray-500 focus:border-[#EF4444] outline-none transition"
          min="0"
          max="5"
          step="0.1"
        />
        <input
          type="number"
          name="numReviews"
          placeholder="Number of Reviews"
          value={formData.numReviews}
          onChange={handleChange}
          className="bg-[#111214] border border-[#2A2F36] rounded-xl p-3 text-white placeholder-gray-500 focus:border-[#EF4444] outline-none transition"
          min="0"
        />
        <input
          type="number"
          name="sold"
          placeholder="Units Sold"
          value={formData.sold}
          onChange={handleChange}
          className="bg-[#111214] border border-[#2A2F36] rounded-xl p-3 text-white placeholder-gray-500 focus:border-[#EF4444] outline-none transition"
          min="0"
        />
        <div className="flex items-center gap-3 bg-[#111214] border border-[#2A2F36] rounded-xl p-3">
          {" "}
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) =>
              setFormData({
                ...formData,
                featured: e.target.checked,
              })
            }
          />
          <label
            htmlFor="featured"
            className="font-medium text-white cursor-pointer"
          >
            {" "}
            Featured Product
          </label>
        </div>

        <div className="md:col-span-2">
          <label className="block text-white font-semibold mb-2">
            Product Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="bg-[#111214] border border-[#2A2F36] rounded-xl p-3 w-full text-gray-400"
          />

          {imageFile && (
            <div className="mt-4">
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-xl border border-[#2A2F36]"
              />

              <p className="text-green-400 mt-2">{imageFile.name}</p>
            </div>
          )}
        </div>

        <textarea
          rows="5"
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          className="bg-[#111214] border border-[#2A2F36] rounded-xl p-3 md:col-span-2 text-white placeholder-gray-500 focus:border-[#EF4444] outline-none transition"
          required
        />

        <div className="flex gap-4 md:col-span-2">
          <button
            type="submit"
            className="bg-[#EF4444] hover:bg-[#DC2626] text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            {editingId ? "Update Product" : "Add Product"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);

                setImageFile(null);
              }}
              className="bg-[#2A2F36] hover:bg-[#3A404A] text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
