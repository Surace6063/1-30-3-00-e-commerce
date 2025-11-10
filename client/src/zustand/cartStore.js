import { create } from "zustand";
import {persist} from "zustand/middleware"

export const useCartStore = create(
    persist(
        set => ({
            cart: null,
            total_price: 0,
            total_quantity: 0,

            setCartData: (cartData) => set({
                cart: cartData.items,
                total_price: cartData.total_price,
                total_quantity: cartData.total_quantity
            }),
        }),
        {
            name: "cart"  // store our cart data to localstorage using cart name
        }
    )
)