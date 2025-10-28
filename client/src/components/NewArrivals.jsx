import ProductCard from "./ProductCard"
import { useProducts } from "../api/fetchApi"

const NewArrivals = () => {

  const {data,isLoading,isError,error} = useProducts()

  return (
    <div className="bg-blue-50/40 py-20">
        <div className="container">
            <h1 className="text-3xl font-bold text-slate-800">New Arrivals</h1>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {
                isLoading ? "loading...":
                isError ? <p>Error: {error.message}</p>:
                data.slice(0,4).map(item => (
                  <ProductCard key={item.id} item={item} />
                ))
              }
            </div>
        </div>
    </div>
  )
}
export default NewArrivals