import { useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux"
import {Link} from "react-router-dom"
import {getOrders} from "../../redux/apiCalls"
import "./orders.css";
import Footer from '../../components/Footer';
import Newslatter from '../../components/Newslatter';
import Navbar from '../../components/Navbar';
import Announcement from '../../components/Announcement';

const Orders = () => {
    const userId = useSelector((state) => state.user.currentUser?.others?._id);
    const dispatch = useDispatch();
    const orders = useSelector((state)=>state.orders.ordersList)



    useEffect(()=>{
      getOrders(dispatch,userId)
    },[dispatch, userId])
  
  
    const Button = ({ type }) => {
      return <button  className={"widgetLgButton " + type}>{type}</button>;
    };

    
      return (
        <div>
        <Announcement/>
        <Navbar />
        <table class="table table-light table-striped">
          <thead class="thred-light">
          <tr>
            <th scope="col">Order Id</th>
            <th scope="col">User Id</th>
            <th scope="col">Amount</th>
            <th scope="col">Status</th>
            <th scope="col">Products</th>
          </tr>
        </thead>
        <tbody>
        { orders?.map((order)=>(
          <tr>
          <th scope="row">{order._id}</th>
          <td>{order.userId}</td>
          <td>{order.amount}</td>
          <td><Button type={order.status} /> </td>
          
          <td class="text-end">
              <Link to={"/viewproducts/"+order._id}>
                <a  type="button" class="btn btn-outline-primary btn-sm"><i class="bi bi-eye"></i> View </a>
              </Link>
          </td>
          
        </tr>
        ))}
        </tbody>
      </table>
      <Newslatter/>
      <Footer/>
      </div>
      );
    }
    
export default Orders