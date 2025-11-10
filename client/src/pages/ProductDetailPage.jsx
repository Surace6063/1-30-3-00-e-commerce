import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../api/fetchApi";
import { apiRequest } from "../utils/apiRequest";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity(prev => prev + 1);
  const decrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const {id} = useParams()

  const {data,isLoading,isError,error} = useProduct(id)

  const queryClient = useQueryClient()

    // using tanstack usemutation to handle add to cart
  const {mutate} = useMutation({
    mutationFn: async (cartItem) => {
      return await apiRequest.post('/cart/create/',cartItem)
    },
    onSuccess: () => {
      toast.success("Product added to cart sucessfully.")
      queryClient.invalidateQueries({queryKey:['cart']}) // invlaidte cart cache -> tell cart fetch api process to refetch new updated cart list 
    }
  })

  // add to cart function
  const handleAddToCart = async () => {
    const cartItem = {
      product_id: id,
      quantity: quantity
    }

    mutate(cartItem)  // calling useMuatation mutate function
  } 


  if(isLoading) return "loading..."
  if(isError) return <p>{error.message}</p>
  
  return (
    <div className="min-h-[90vh] flex items-center justify-center p-6">
      <div className="flex flex-col md:flex-row gap-12 bg-white rounded-3xl overflow-hidden container w-full">
        
        {/* Product Image */}
        <div className="md:w-1/2 flex items-center justify-center bg-slate-100">
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-full object-cover rounded-l-3xl"
          />
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 p-10 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Title */}
            <h1 className="text-4xl font-extrabold text-slate-900">
              {data.name}
            </h1>

            {/* Category */}
            <p className="text-slate-500 text-sm uppercase tracking-wide">
              {data.category}
            </p>

            {/* Price */}
            <p className="text-3xl font-semibold text-slate-900">
              ${data.price}
            </p>

            {/* Description */}
            <p className="text-slate-600 text-lg leading-relaxed">
              {data.description}
            </p>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-8">
            <div className="flex items-center gap-4 border border-slate-300 rounded-md px-4 py-2">
              <button
                onClick={decrease}
                className="text-slate-700 text-xl font-bold hover:text-slate-900"
              >
                -
              </button>
              <span className="text-lg font-medium">{quantity}</span>
              <button
                onClick={increase}
                className="text-slate-700 text-xl font-bold hover:text-slate-900"
              >
                +
              </button>
            </div>
            <button onClick={handleAddToCart} className="btn btn-primary">
              Add to Cart
            </button>
          </div>

          {/* Additional Info */}
          <div className="text-slate-500 text-sm space-y-1 mt-6">
            <p><span className="font-medium text-slate-700">SKU:</span> 12345</p>
            <p><span className="font-medium text-slate-700">Availability:</span> In Stock</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;