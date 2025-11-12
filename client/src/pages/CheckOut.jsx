import { useForm } from "react-hook-form";
import { useCartStore } from "../zustand/cartStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutSchema } from "../utils/validate";
import { apiRequest } from "../utils/apiRequest";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const { cart, total_price } = useCartStore();
  const navigate = useNavigate()

  // console.log(cart);

  // order format
  const items = cart.map((item) => ({
    product: item.product.id,
    quantity: item.quantity,
  }));

  // console.log(items);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(checkoutSchema),
  });

  const handleOrder = async (data) => {
    const orderData = {
      ...data,
      items
    }

    try {
      await apiRequest.post('/orders/',orderData)
      toast.success("Order sucessfull.")
      navigate('/orders')
    } catch (error) {
      console.log(error)
    }
   
  };

  return (
    <div className="min-h-[90vh] flex justify-center items-center p-8 bg-gray-50">
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full">
        {/* 🛒 Left: Cart Summary */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4 text-slate-800">
            Your Cart
          </h2>

          {cart?.length === 0 ? (
            <p className="text-slate-500">Your cart is empty.</p>
          ) : (
            <ul className="divide-y divide-slate-200">
              {cart?.map((item) => (
                <li
                  key={item.id}
                  className="py-3 flex justify-between items-center"
                >
                  <div>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="size-20 rounded-md mb-1"
                    />
                    <h3 className="font-medium text-slate-700">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-slate-700">
                    $ {item.product.price * item.quantity}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <div className="border-t border-slate-200 mt-4 pt-4 flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span>${total_price}</span>
          </div>
        </div>

        {/* 🧾 Right: Checkout Form */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800">
            Checkout Form
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit(handleOrder)}>
            {/* Payment method */}
            <div>
              <label htmlFor="method" className="block font-medium mb-1">
                Payment Method
              </label>
              <select
                {...register("payment")}
                id="method"
                className="w-full border rounded p-2 focus:ring focus:ring-blue-200"
              >
                <option value="cod">Cash on Delivery</option>
                <option value="e-sewa">E-Sewa</option>
              </select>
              {errors.payment && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.payment.message}
                </p>
              )}
            </div>

            {/* Full name */}
            <div>
              <label htmlFor="full-name" className="block font-medium mb-1">
                Full Name
              </label>
              <input
                {...register("full_name")}
                id="full-name"
                type="text"
                placeholder="Enter your name"
                className="w-full border rounded p-2 focus:ring focus:ring-blue-200"
              />
              {errors.full_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.full_name.message}
                </p>
              )}
            </div>

            {/* Phone number */}
            <div>
              <label htmlFor="phone" className="block font-medium mb-1">
                Phone Number
              </label>
              <input
                {...register("phone")}
                id="phone"
                type="text"
                placeholder="Enter your phone number"
                className="w-full border rounded p-2 focus:ring focus:ring-blue-200"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Shipping address */}
            <div>
              <label htmlFor="address" className="block font-medium mb-1">
                Shipping Address
              </label>
              <input
                {...register("shipping_address")}
                id="address"
                type="text"
                placeholder="Enter your shipping address"
                className="w-full border rounded p-2 focus:ring focus:ring-blue-200"
              />
              {errors.shipping_address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.shipping_address.message}
                </p>
              )}
            </div>

            <button disabled={isSubmitting} type="submit" className="btn btn-primary w-full">
             {
              isSubmitting ? "submitting..."  : "Pay"
             }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
