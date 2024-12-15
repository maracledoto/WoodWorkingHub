import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { default_route, product_get_route } from "../api/routes";
import { PlusOutlined } from '@ant-design/icons';
import { fetchProducts, saveProduct } from "../request/product_api";
import { Spin, Button } from 'antd';
import Navbar from "./Navbar";


export default function AddProduct() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    //useStates
    //addproduct
  const [formProduct, setFormProduct] = useState({
    name: "",
    price: "",
    productImage: "",
  });
  const [authRes, setAuthRes] = useState(null);
    //handle add product field
  const handleInputs = (e) => {
    if (e.target.name === "productImage") {
      setFormProduct({ ...formProduct, productImage: e.target.files[0] });
    } else {
      setFormProduct({ ...formProduct, [e.target.name]: e.target.value });
    }
  };


  //handle saving on product
  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      const postRequest = new FormData();
      postRequest.append("name", formProduct.name);
      postRequest.append("price", formProduct.price);
      postRequest.append("productImage", formProduct.productImage);

      const response = await saveProduct(product_get_route, token, postRequest);
      if (response) {
        //window.location.reload();
        navigate("/products");
      } else {
        setAuthRes(response);
      }
    } catch (err) {
      setAuthRes("Please Try Again");
    }
  };

    return (
        <>
        <Navbar />
        { //Add product
            <div className="add-container debug">
            <form onSubmit={handleSubmission}>
              <label className="text-center">Add Products</label>
              <input
                type="text"
                name="name"
                value={formProduct.name}
                onChange={handleInputs}
                placeholder="Item Name"
              />
              <input
                type="text"
                name="price"
                value={formProduct.price}
                onChange={handleInputs}
                placeholder="Image Price"
              />
              <input
                type="file"
                name="productImage"
                onChange={handleInputs}
                placeholder="Item Image"
              />
              {authRes && <label className="text-red text-center">{authRes}</label>}
              <button type="submit">Add</button>
            </form>
          </div>
        }
        </>
    )
}