import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  return (
    <Link to={`/shop/${item.id}`}>
      <div className="bg-white rounded-md overflow-hidden shadow hover:shadow-md">
        <img src={item.image} alt={item.name} />

        <div className="p-4">
          <h3 className="text-lg text-slate-700 truncate mb-1">{item.name}</h3>
          <p className="text-slate-500 mb-3">${item.price}</p>
          <button className="btn btn-primary w-full">Add To Cart</button>
        </div>
      </div>
    </Link>
  );
};
export default ProductCard;
