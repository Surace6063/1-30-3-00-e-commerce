import { useCategories, useProducts } from "../api/fetchApi";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const ShopPage = () => {
  const [category, setCategory] = useState("");
  const[sort,setSort] = useState("-created_at")

  const [searchParams,setSearchParams] = useSearchParams("")
  const searchValue = searchParams.get('search')

  // fetching all products
  const { data, isLoading, isError, error } = useProducts(category,sort,searchValue)

  // fetching all categories
  const { data: categories } = useCategories()

  return (
    <div className="container my-20">
      {/* top */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold text-slate-800">Shop</h2>
        {/* filters */}
        <div className="flex gap-4 items-center">
          {/* filter by category */}
          <div>
            <label htmlFor="category">Filter By Category:</label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              name="category"
              id="category"
            >
              <option value="">All</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* sort */}
          <div>
            <label htmlFor="sort">Sort by price:</label>
            <select
              onChange={(e) => setSort(e.target.value)}
              name="sort"
              id="sort"
            >
              <option value="">sort</option>
              <option value="-price">price (high to low)</option>
              <option value="price">price (low to high)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="w-full border-b border-slate-300 my-10" />
      {/* product list */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {isLoading ? (
          "loading..."
        ) : isError ? (
          <p>Error: {error.message}</p>
        ) : (
          data.map((item) => <ProductCard key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
};
export default ShopPage;
