import { Link } from "react-router-dom";

function Breadcrumb({ productName }) {
  return (
    <div className="mb-8 flex items-center flex-wrap gap-2 text-sm">
      <Link
        to="/"
        className="text-gray-400 hover:text-[#EF4444] transition-colors duration-300"
      >
        Home
      </Link>

      <span className="text-gray-600">/</span>

      <Link
        to="/products"
        className="text-gray-400 hover:text-[#EF4444] transition-colors duration-300"
      >
        Products
      </Link>

      <span className="text-gray-600">/</span>

      <span className="font-semibold text-white truncate">{productName}</span>
    </div>
  );
}

export default Breadcrumb;
