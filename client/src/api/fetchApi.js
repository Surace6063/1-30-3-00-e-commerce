import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../utils/apiRequest";

// getting all products
export const useProducts = (category,sort,searchValue) => {
  return useQuery({
    queryKey: ["products", category, sort, searchValue],
    queryFn: async () => {
      const res = await apiRequest.get("/products/", {
        params: {
          category__name: category, // call -> http://127.0.0.1:8000/api/products/?category__name=category
          ordering: sort, // call ->  http://127.0.0.1:8000/api/products/?ordering=sort
          search: searchValue, // // call ->  http://127.0.0.1:8000/api/products/?search=searchValue
        },
      });
      return res.data;
    },
  });
};


// get all catgeories
export const useCategories = () => {
    return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await apiRequest.get("/categories/");
      return res.data;
    },
  });
}


//getting single product
export const useProduct = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await apiRequest.get(
        `/products/${id}/`
      );
      return response.data;
    },
  });
};
