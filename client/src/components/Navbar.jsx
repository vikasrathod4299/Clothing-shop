import { Search, ShoppingCartOutlined } from '@material-ui/icons'
import Badge from '@mui/material/Badge';
import React, { useEffect} from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from "react-redux"
import {Link} from "react-router-dom"
import { mobile } from "../responsive";
import { logout } from "../redux/userRedux"
import { removeProduct } from "../redux/cartRedux"
import { userRequest } from '../requestMethods';


const Container = styled.div`
    height:60px;
    ${mobile({ height: "50px" })}
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display:flex;
    justify-content: space-between; 
    ${mobile({ padding: "10px 0px" })}
`

const Left =styled.div`
    flex:1;
    display:flex;
    align-items : center;

`
const Language = styled.span`
    font-size:14px;
    cursor:pointer;
    ${mobile({ display: "none" })}
`

const SearchContainer = styled.div`
    border:0.5px solid lightgray;
    display:flex;
    align-items : center;
    margin-left:25px;
    padding:5px;
`
const Input = styled.input`
    border:none;
    ${mobile({ width: "50px" })}
`
const Center =styled.div`
    flex:1;
    text-align:center;
`

const Logo = styled.h1`
    font-weight:bold;
    ${mobile({ fontSize: "24px" })}
`

const Right =styled.div`
    flex:1; 
    display:flex;
    align-items : center;
    justify-content:flex-end;
    ${mobile({ flex: 2, justifyContent: "center" })}
`
const MenuItems = styled.div`
    font-size:14px;
    cursor:pointer;
    margin-left:25px;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`

const Navbar = () => {
    const quantity = useSelector(state=>state.cart.quantity)
    const dispatch = useDispatch();

    const handleClick = () =>{
        dispatch(removeProduct())
        dispatch(logout())
    }
    return (
    <Container>
        <Wrapper>
            <Left>
                <Language>EN</Language>
                <SearchContainer>
                    <Input/>
                    <Search style={{color:"gray",fontSize:16}}/>
                </SearchContainer>
            </Left>
            <Center>
                <Logo>META.</Logo>
            </Center>
            <Right>
             {user && <Link to="/"> <MenuItems onClick={handleClick}>Logout</MenuItems>  </Link>}   
             <Link to="/register"> <MenuItems>REGISTER</MenuItems> </Link>
            <Link to="/login"> <MenuItems>SIGN IN</MenuItems>  </Link>
                <Link to="/cart">
                <MenuItems> 
                <Badge badgeContent={quantity} color="primary">
                    <ShoppingCartOutlined/>
                </Badge>
                </MenuItems>
                </Link>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar