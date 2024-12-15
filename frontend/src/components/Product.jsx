import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { default_route, order_route, product_get_route } from "../api/routes";
import { Card, Input, Button, Form } from "antd";
import { DeleteOutlined, EditOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Navbar from "./Navbar";

function Product() {
  const navigate = useNavigate();

  const { productId } = useParams();
  const token = localStorage.getItem("token");
  const [orderItem, setOrderItem] = useState({
    productId: "",
    quantity: "",
  });
  const [authRes, setAuthRes] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editItem, setEditItem] = useState({
    name: "",
    price: "",
    productImage: "",
  });

  const { Meta } = Card;

  const handleInputs = (e) => {
    setOrderItem({
      ...orderItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputEdit = (e) => {
    if (e.target.name === "productImage") {
      setEditItem({ ...editItem, productImage: e.target.files[0] });
    } else {
      setEditItem({ ...editItem, [e.target.name]: e.target.value });
    }
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(order_route, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: orderItem.quantity,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        window.location.href = "/orders";
      } else {
        setAuthRes(data.message);
      }
    } catch (error) {
      setAuthRes("Please Try Again");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(product_get_route + "/" + productId, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        window.location.href = "/products";
      } else {
        setAuthRes(data.message);
      }
    } catch (error) {
      setAuthRes("Please Try Again");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const updateOps = [
        { propName: "name", value: editItem.name },
        { propName: "price", value: editItem.price },
      ];

      const res = await fetch(product_get_route + "/" + productId, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateOps),
      });
      const data = await res.json();
      if (res.ok) {
        window.location.reload();
      } else {
        setAuthRes(data.message);
      }
    } catch (error) {
      setAuthRes("Please Try Again");
    }
  };
  
  const handleBackButton = () => navigate("/products");


  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const response = await fetch(product_get_route + "/" + productId);
      const data = await response.json();
      const itemImage = data.product.productImage.substring(
        data.product.productImage.lastIndexOf("\\") + 1
      );
      data.product.productImage = itemImage;
      setProduct(data.product);
      setLoading(false);
    };
    fetchProduct();
  }, [productId]);

  if (loading || product === null) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Navbar />
      <div className="single-container">
      <Button type="text" icon={<ArrowLeftOutlined />} onClick={handleBackButton} className="back" >Product List</Button>
        <Card
          style={{
            width: 500,
          }}
          cover={
            <img
              alt={product.productImage}
              src={default_route + product.productImage}
            />
          }
        >
          
          
          <Meta title={product.name} description={`₱${product.price}`} />
          
          <div className="single-container">
            <div className="action-container">
              <form onSubmit={handleEdit}>
                <Input
                  type="text"
                  name="name"
                  value={editItem.name}
                  onChange={handleInputEdit}
                  placeholder="Item Name"
                  size="large"
                  required
                />
                <Input
                  type="text"
                  name="price"
                  value={editItem.price}
                  onChange={handleInputEdit}
                  placeholder="Item Price"
                  size="large"
                  required
                />
                {authRes && (
                  <label className="text-red text-center">{authRes}</label>
                )}
                <button type="submit" icon={<EditOutlined />}>Edit Item</button>
              </form>
              <form onSubmit={handleDelete}>
                <button type="submit" danger icon={<DeleteOutlined />}>Delete Item</button>
              </form>
            </div>
          </div>
          
        </Card>
      </div>
    </>
  );
}

export default Product;
