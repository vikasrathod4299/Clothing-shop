import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newslatter from '../components/Newslatter'
import styled from "styled-components"
import Product from "../components/Product"
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'


const Container = styled.div`
    padding:20px;
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
`


const OrderProducts = () => {
  const location = useLocation();
  const orderId = location.pathname.split("/")[2]
  const order = useSelector((state)=>state.orders.ordersList).findIndex((item)=>item._id === orderId)
  const products = useSelector((state)=>state.orders.ordersList)[order].products

  

  return (
    <div>
        <Announcement/>
        <Navbar />
        <Container>
          {products?.map((item)=>(
                        <Product item={item} key={item._id}/>
          ))}
        </Container>
        <Newslatter/>
        <Footer/>
    </div>
  )
}

export default OrderProducts