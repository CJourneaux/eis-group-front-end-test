import axios from "axios";

export const CREATE_PRODUCT = "createProduct";
export async function createProduct({
  productName,
  colour,
  price,
  stock,
  productImagesList,
}) {
  const productImageFile = productImagesList[0];

  const formData = new FormData();
  formData.append("name", productName);
  formData.append("colour", colour);
  formData.append("price", price);
  formData.append("stock", stock);
  formData.append("productImage", productImageFile, productImageFile.name);
  const result = await axios.post(`/products/add`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return result.data;
}

export const GET_ALL_PRODUCTS = "getAllProducts";
export async function getAllProducts() {
  const result = await axios.get(`/products`);
  return result.data;
}

export const DELETE_PRODUCT = "deleteProduct";
export async function deleteProduct(productId) {
  const result = await axios.delete(`/products/${productId}`);
  return result.data;
}
