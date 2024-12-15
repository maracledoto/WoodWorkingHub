export const fetchOrders = async (order_route, token) => {
    const response = await fetch(order_route, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

    console.log("response from fetching order", response);

    if (response.ok) {
        const data = await response.json();
        return data.orders;
    } else {
        return false;
    }
};
