import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ShoppingCart } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../utils/apiRequest";
import { Navigate, useNavigate } from "react-router-dom";
import { useCartStore } from "../zustand/cartStore";
import { useUserStore } from "../zustand/userStore";
import toast from "react-hot-toast";

const Cart = () => {
  const {user} = useUserStore()

  // if(!user){
  //   return <Navigate to="/login"  />
  // }

  const navigate = useNavigate();

  const { setCartData } = useCartStore();

  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient()

  // fetching user cart
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await apiRequest.get("/cart/list/");
      setCartData(res.data);
      return res.data;
    },
    enabled: !!user  // only fetch cart list is user is present
  });

  // delete operation using useMutation
  const {mutate} = useMutation({
    mutationFn: async (id) => {
      return await apiRequest.delete(`/cart/delete/${id}/`)
    },
    onSuccess: () => {
      toast.success("Item removed from cart sucessfully.")
      queryClient.invalidateQueries({queryKey:['cart']})
    },
    onError: () => {
      toast.error("Something went wrong")
    }
  })



  // console.log(data);
  const handleCart = () => {
   if(!user){
     toast.error("Please login in to view your cart.")
     navigate('/login')
     return 
   }
   setOpen(true)
  }

  // handle checkout
  // const handleCheckOut = () => {
  //   if(!data){
  //     return false
  //   }
  // }

  return (
    <div>
      <button
        onClick={handleCart}
        className="rounded-md cursor-pointer bg-gray-950/5 px-2.5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-950/10 relative"
      >
        <ShoppingCart />
        {data?.total_quantity !== 0 && (
          <span className="bg-slate-800 text-white size-4 text-xs font-extralight rounded-full absolute top-0 -right-1">
            {data?.total_quantity}
          </span>
        )}
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed  inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-medium text-gray-900">
                        Shopping cart
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {isLoading ? (
                            "loading..."
                          ) : isError ? (
                            <p>{error?.messgae}</p>
                          ) : data?.items?.length === 0 ? (
                            <p>Cart is empty</p>
                          ) : (
                            data?.items?.map((item) => (
                              <li key={item.id} className="flex py-6">
                                <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    alt={item.product.title}
                                    src={item.product.image}
                                    className="size-full object-cover"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>{item.product.name}</h3>
                                      <p className="ml-4">
                                        {item.product.price}
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {item.product.category}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">
                                      Qty {item.quantity}
                                    </p>

                                    <div className="flex">
                                      <button
                                        onClick={()=>mutate(item.id)}
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>${data?.total_price}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      <button onClick={()=> {
                        navigate('/checkout')
                        setOpen(false)
                      }} className="btn btn-primary w-full">
                        Checkout
                      </button>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{" "}
                        <button
                          type="button"
                          onClick={() => {
                            setOpen(false);
                            navigate("/shop");
                          }}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
export default Cart;
