import styled from "styled-components"
import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons'
import {Link} from "react-router-dom"

import {publicRequest, userRequest} from "../requestMethods";
import {addProduct} from "../redux/cartRedux"
import {useDispatch, useSelector} from "react-redux";


const Info = styled.div`
    opacity:0;
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
    background-color:rgba(0,0,0,0.2);
    z-index:3;
    display:flex;
    align-items:center;
    justify-content:center;
    transition:all 0.5s ease;
    

`

const Container = styled.div`
    flex:1;
    margin:5px;
    min-width:280px;
    height:350px;
    display:flex;
    align-items:center;
    justify-content:center;
    background-color:#f5fbfd;
    position:relative;
    &:hover ${Info}{
        opacity:1;
    }
`

const Cricle = styled.div`
    width:200px;
    height:200px;
    border-radius:50%;
    background-color:white;
    position: absolute;
`

const Image = styled.img`
    height:75%;
    z-index:2;
`


const Icon = styled.div`
    width:40px;
    height:40px;
    border-radius:50%;
    background-color:white;
    display:flex;
    align-items:center;
    justify-content:center;
    margin:10px;
    transition:all 0.5s ease;
    &:hover{
        background-color:#e9f5f5;
        transform:scale(1.1);
    }
    cursor:pointer;
`

const Product = ({item}) => {
    const user  = useSelector((state)=>state.user.currentUser);
    const productId = item._id
    const img = item.img
    const price = item.price
    const quantity = 1;
    const dispatch = useDispatch();

    
    const handleClick = async ()=>{
        if (user.others._id){
            const userId=user.others._id
            try{
                const bool = await publicRequest.get("cart/exists/"+userId)
                if (bool.data){
                    await userRequest.put("cart/"+userId,{productId,img,price,quantity})
                }else{
                    await userRequest.post("cart/",{userId,item}) 
                }
            }
            catch(err){
                console.log(err)
            }
            dispatch(addProduct({...item}))
        } 
    }



    return (
    <Container>
        <Cricle/>
        <Image src={item.img}/>
        <Info>
            <Icon onClick={handleClick}>
                <ShoppingCartOutlined/>
            </Icon>
            <Icon>
                <Link to ={`/product/${productId}`}>
                    <SearchOutlined/>
                </Link>
            </Icon>
            <Icon>
                <FavoriteBorderOutlined/>
            </Icon>
        </Info>
    </Container>
  )
}

export default Product