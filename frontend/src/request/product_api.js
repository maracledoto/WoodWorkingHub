// fetch list of products
export const fetchProducts = async (product_get_route) => {
    const response = await fetch(product_get_route);
    const data = await response.json();
    return data.products;
};

// save product
export const saveProduct = async(product_get_route, token, postRequest) => {
    const res = await fetch(product_get_route, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: postRequest,
      });
      const data = await res.json();

      console.log("return post product", data);
      
      if (res.ok) {
        return true;
      } else {
        return data.message;
      }
};

// add selected product to cart
export const addToCart = async(order_route, token, postRequest) => {
  const res = await fetch(order_route, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postRequest),
  });
    const data = await res.json();

    console.log("return post selected product", data);
    
    if (res.ok) {
      return true;
    } else {
      return data.message;
    }
};