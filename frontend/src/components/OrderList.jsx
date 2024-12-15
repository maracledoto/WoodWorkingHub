import { useEffect, useState } from "react";
import { order_route } from "../api/routes";
import { Link } from "react-router-dom";
import { fetchOrders } from "../request/order_api";
import Navbar from "./Navbar";
import { Spin, Avatar, List } from 'antd';

function Order() {
  const token = localStorage.getItem("token");
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authRes, setAuthRes] = useState(null);

  //before loading of page
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetchOrders(order_route, token);

        if (!res) {
          setAuthRes("Failed To Fetch Orders");
        } else {
          setOrderList(res);
        }
      } catch (error) {
        console.log(error);
        setAuthRes("Failed To Fetch Orders");
      }
      setLoading(false);
    })();
  }, []);

  const handleDelete = async (orderId) => {
    console.log("order id:", orderId);
    try {
      const res = await fetch(order_route + "/" + orderId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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

  if (authRes) {
    return <div>{authRes}</div>;
  }

  return (
    
    <>
      <Navbar />
      {loading ? (
        <div className="center">
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        </div>
      ) : (
        <>
      <div className="orders-container">
        <h2>Notifications</h2>
      <List
        itemLayout="horizontal"
        dataSource={orderList}
        renderItem={(item, index) => (
          <List.Item actions={[<button onClick={async() => await handleDelete(item._id)}>Delete Order</button>]}>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
              title={`order id: ${item?._id}`}
              description={`product : ${item?.product?.name} (${item?.product?._id})`}
              
            />
            <div>quantity: {item?.quantity}</div>
          </List.Item>
          
        )}

        
      />
      </div>
      </>
    )}
      
    </>
  );
}

export default Order;
