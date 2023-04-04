
import Cart from './pages/Cart'
import Login from './pages/Login.jsx'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import Product from './pages/Product'
import Register from './pages/Register'
import Success from './pages/Success'
import Orders from './pages/orders/orders'
import OrderProducts from './pages/orderProducts'
import {useSelector, useDispatch} from "react-redux";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"
import { useEffect } from 'react'
import {addProduct} from "./redux/cartRedux"
import {userRequest} from "./requestMethods"
import Account from './pages/Account'

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);
    useEffect(()=>{
      const get_cart =  async ()=>
      {
          try{
              const res = await userRequest.get(`cart/find/${user.others._id}`)
              res.data.products?.map((products)=>{
                const color = products.color
                const img = products.img
                const price = products.price
                const productId = products.productId
                const quantity = products.quantity
                const size = products.size
                dispatch(addProduct({color,img,price,productId,quantity,size}))
              })

          }catch(err){
              console.log(err)
          }

      } 
      (cart.quantity==0) && user && get_cart()
  },[])

return (
  <Router>
    <Switch>
      <Route exact path="/" >
        <Home  />
      </Route>
      <Route path="/products/:category">
        <ProductList />
      </Route>
      <Route path="/product/:id" >
        <Product  />
      </Route>
      <Route path="/cart">
        <Cart />
      </Route>
      <Route path="/success">
        <Success />
      </Route>
      <Route path="/orders">
        <Orders />
      </Route>
      <Route path="/account">
        <Account />
      </Route>
      <Route path="/viewproducts">
        <OrderProducts />
      </Route>
      <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
      <Route path="/register">
        {user ? <Redirect to="/" /> : <Register />}
      </Route>
    </Switch>
  </Router>
);
}

export default App