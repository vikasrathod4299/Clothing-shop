import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import { removeProduct } from "../redux/cartRedux";
import { Link } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const data = location.state.stripeData;
  const cart = location.state.products;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser.others._id,
          products: cart.products.map((item) => ({
            productId: item.productId,
            img:item.img,
            color:item.color,
            size:item.size,
            price:item.price,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch(err){console.log(err)}
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  useEffect(()=>{
    const deletecart = async ()=>{
    try{
        await userRequest.delete(`cart/${currentUser.others._id}`)
        dispatch(removeProduct())
    }catch(err){
      console.log(err)
    }
  }
  currentUser.others._id && deletecart()
  },[orderId])

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
        <Link to="/">
      <button style={{ padding: 10, marginTop: 20 }}>See your orders</button>
      </Link>
    </div>
  );
};

export default Success;
  