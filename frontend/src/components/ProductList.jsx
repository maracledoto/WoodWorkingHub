import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { default_route, product_get_route, order_route } from "../api/routes";
import { PlusOutlined, ShoppingCartOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import { fetchProducts, saveProduct, addToCart } from "../request/product_api";
import { Spin, Button, Card, List, Modal, message } from "antd";
import Navbar from "./Navbar";

function ProductList() {
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

  //listproducts
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Track the selected product
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  //handle add product field
  const handleInputs = (e) => {
    if (e.target.name === "productImage") {
      setFormProduct({ ...formProduct, productImage: e.target.files[0] });
    } else {
      setFormProduct({ ...formProduct, [e.target.name]: e.target.value });
    }
  };

  //handle saving on selected product on cart
  const handleSubmission = async (selectedProduct) => {
    console.log("data here", selectedProduct);
    try {
      const postRequest = {
        "productId": selectedProduct._id,
        "quantity": 1
      }

      const response = await addToCart(order_route, token, postRequest);
      if (response) {
        setIsModalVisible(false);
        messageApi.open({
          type: 'success',
          content: 'Added to Cart',
        });
      } else {
        messageApi.open({
          type: 'error',
          content: 'Failed to add selected product, please try again.',
        });
        console.log(response);
      }
    } catch (err) {
      messageApi.open({
        type: 'error',
        content: 'Failed to add selected product, please try again.',
      });
      console.log(error);
    }
  };

  //before loading of page
  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetchProducts(product_get_route);
      setProductList(response);
      setLoading(false);
    })();
  }, []);

  //navigate add product page
  const handleAddProduct = () => navigate("/products/add_product");
  const handleEdit = (_id) => navigate(`/products/${_id}`);

  // Function to handle opening modal and setting selected product
  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  return (
    <>
    {contextHolder}
      <Navbar />
      {loading ? (
        <div className="center">
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        </div>
      ) : (
        <>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddProduct}
            className="custom-button"
          >
          Add Product
          </Button>
          <div className="products-container">
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6,
                xxl: 3,
              }}
              dataSource={productList}
              renderItem={(item, index) => {
                const getImage = item.productImage
                  ? item.productImage.substring(
                      item.productImage.lastIndexOf("\\") + 1
                    )
                  : null;

                return (
                  <List.Item>
                    <div
                      className="td-none"
                    >
                      <Card
                        hoverable
                        cover={
                          <img
                            alt={item.name}
                            src={default_route + getImage}
                            className="product-image"
                          />
                        }
                        style={{ padding: "16px" }}
                        actions={[
                          <EditOutlined key="edit" onClick={() => handleEdit(item._id)} />,
                          <ShoppingCartOutlined key="cart" onClick={() => handleCardClick(item)} />
                        ]}
                      >
                        <Card.Meta
                          title={item.name}
                          description={`₱${item.price}`}

                        />

                      </Card>
                    </div>
                  </List.Item>
                );
              }}
            />
          </div>
          {/* Modal to display product details */}
          <Modal
            width={760}
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={[
              //change functionality to add cart
                <Button
                  icon={<ShoppingCartOutlined />}
                  key="close"
                  onClick={async() => await handleSubmission(selectedProduct)}
                >
                  Add to Cart
                </Button>
                ,

            ]}
          >
            {selectedProduct && (
              <>
                {/* <img
                  src={
                    default_route +
                    (selectedProduct.productImage
                      ? selectedProduct.productImage.substring(
                          selectedProduct.productImage.lastIndexOf("\\") + 1
                        )
                      : "")
                  }
                  alt={selectedProduct.name}
                  style={{ maxWidth: "100%", marginBottom: "16px" }}
                  className="product-image-dialog"
                /> */}

                
                <h1>{selectedProduct.name}</h1>
                <hr></hr>
                <h2 className="price">Price: ₱{selectedProduct.price}</h2>
              </>
            )}
          </Modal>
        </>
      )}
    </>
  );
}

export default ProductList;
