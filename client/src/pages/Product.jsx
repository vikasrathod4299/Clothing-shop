import { Add, Remove } from '@material-ui/icons'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newslatter from '../components/Newslatter'
import { useLocation} from "react-router-dom"
import { useEffect, useState } from "react"
import {publicRequest, userRequest} from "../requestMethods";
import {addProduct} from "../redux/cartRedux"
import {useDispatch, useSelector} from "react-redux";


const Container = styled.div`
`

const Wrapper = styled.div`
  padding: 50px;
  display: flex;

`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;

`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;

`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 50px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer =styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;

`
const Filter = styled.div`
    display: flex;
    align-items: center;
`
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`
const FilterColor = styled.div`
    width:20px;
    height:20px;
    border-radius:50%;
    border: 1px solid teal;
    background-color:${(props)=>props.color};
    margin:0px 5px;
    cursor:pointer;
`
const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`
const FilterSizeOption = styled.option`
`
const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;

`
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`
const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;

    &:hover {
        background-color: #f8f4f4;
    }
`
const Product = () => {
    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity]= useState(1);
    const [color, setColor]=useState("");
    const [size, setSize]=useState("");
    const dispatch = useDispatch();
    const user  = useSelector((state)=>state.user.currentUser);
    const price = product.price
    const img = product.img 
    const products = [{productId,img,color,size,price,quantity}]
    
    
    useEffect(()=>{
        const getProduct = async ()=>{
            try{
                const res= await publicRequest.get("products/find/"+productId)
                setProduct(res.data)
            }catch(e){
                console.log(e)
            }
        } 
        getProduct()
    },[productId])

  
    const handleClick = async ()=>{

        if (user.others._id){
            const userId=user.others._id

            try{
                const bool = await publicRequest.get("cart/exists/"+userId)
                if (bool.data){
                    await userRequest.put("cart/"+userId,{productId,img,color,size,price,quantity})
                }else{
                    await userRequest.post("cart/",{userId,products}) 
                }
            }
            catch(err){
                console.log(err)
            }
            dispatch(addProduct({...product,quantity,color,size}))
        } 
    }
    
    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img}/>
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>
                        {product.desc}
                    </Desc>
                    <Price>₹ {product.price}</Price>
                    <FilterContainer>
                    <Filter>
                        <FilterTitle> Colour</FilterTitle>
                        {product.color?.map((c) => (
                        <FilterColor color={c} key={c} onClick={()=>setColor(c)}/>
                        ))}
                    </Filter>
                    <Filter>
                        <FilterTitle>Size</FilterTitle>
                        <FilterSize onChange={(e)=>setSize(e.target.value)}>
                            {product.size?.map((s)=>(
                                 <FilterSizeOption key = {s}>{s}</FilterSizeOption>
                            ))}
                        </FilterSize>
                    </Filter>
                </FilterContainer>
                <AddContainer>
                    <AmountContainer>
                        <Remove onClick={()=>setQuantity(quantity > 1 ? quantity-1 : quantity)}/>
                         <Amount>{quantity}</Amount>
                        <Add onClick={()=>setQuantity(quantity+1)} />
                    </AmountContainer>
                    <Button onClick={handleClick}>ADD TO CART</Button>
                </AddContainer>  
                </InfoContainer>
            </Wrapper>
            <Newslatter/>
            <Footer/>
        </Container>
    )
}

export default Product