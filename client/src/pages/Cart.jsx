import styled from "styled-components"
import Navbar from "../components/Navbar"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import { Add, CloseSharp, Remove } from "@material-ui/icons";
import {useSelector, useDispatch} from "react-redux"
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest} from "../requestMethods"
import { useHistory, Link } from "react-router-dom";
import { deletesSingleProduct,increaseProductQuantity, decreaseProductQuantity} from "../redux/cartRedux"

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`

`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;

`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  align-items:justify-between;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ProductAmountContainer = styled.div`
  display: flex;

  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;

`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;

`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const DeleteProduct = styled.div`
  display:flex;
  cursor: pointer;
  
`;

const Cart = () => {
  const cart  = useSelector(state=>state.cart);
  const [stripeToken,setStripeToken] = useState(null)
  const history = useHistory();   
  const dispatch = useDispatch()

  
  const onToken = (token)=>{
    setStripeToken(token)
  }

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total
        });
        history.push("/success", {
          stripeData: res.data,
          products: cart, });
      } catch (e){
        console.log(e)
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, history]);




  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/">
          <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <Link to="/orders">
          <TopButton type="filled">YOUR ORDERS</TopButton>
          </Link>
        </Top>
        <Bottom>
            <Info>
              {cart.products?.map(product=>(
            <Product>
                <ProductDetail>
                  <Image src= {product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                <DeleteProduct onClick={()=>dispatch(deletesSingleProduct(product._id))}>
                  <CloseSharp />
                </DeleteProduct>
                <div style={{display:'flex', flexDirection:'column'}}>
                    <ProductAmountContainer>
                      <Add onClick={()=>dispatch(increaseProductQuantity(product._id))}/>
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <Remove onClick={()=>dispatch(decreaseProductQuantity(product._id))} />
                    </ProductAmountContainer>
                    <ProductPrice>
                    ₹ {product.price*product.quantity}
                    </ProductPrice>
                </div>
                </PriceDetail>
              </Product>
              ))};
              <Hr/>
            </Info>
            <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>₹ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>₹ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>₹ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>₹ {cart.total}</SummaryItemPrice>
            </SummaryItem>
 
                <StripeCheckout
                  name="Meata Shop"
                  image="https://i.ibb.co/zspsXGb/Meta-Logo-PNG-ndnknvi4.jpg" 
                  billingAddress
                  shippingAddress
                  description={`Your total is ₹${cart.total}`}
                  amount={cart.total * 100}
                  token={onToken}
                  currency="INR"
                  stripeKey={KEY}>
                  <Button>Check Out</Button>
                </StripeCheckout>
          </Summary>
        </Bottom>
        </Wrapper>
        <Footer/>
    </Container>
  )
}

export default Cart