import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newslatter from '../components/Newslatter'
import styled  from 'styled-components'
import { useSelector } from 'react-redux'
import { userRequest } from '../requestMethods'
import {updateUser} from "../redux/userRedux"
import {useDispatch} from "react-redux"
import { useState } from 'react'

const Container = styled.div`
  width: 100vw;
  height: 90vh;
  background-size: cover;
  background-color:#d3bad6;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const Error =styled.span`
  color:green;
`

const Account = () => {
    const user = useSelector((state) => state.user.currentUser);
    const [inputs, setInputs]  = useState({});
    const dispatch = useDispatch();

    const handleInputs = (e)=>{
      setInputs(prev=>{
        return {...prev,[e.target.name]:e.target.value}
      })
    }
console.log(inputs)
    const handleClick = async (e)=>{
      e.preventDefault();
      try{
        const res = await userRequest.put(`users/${user?.others?._id}`,inputs)
        dispatch(updateUser(res.data))
      }catch(err){

        console.log(err)
      }
  
    }

  return (
    <div>
        <Announcement/>
        <Navbar />
    <Container>
        <Wrapper>
        <Title>UPDATE YOUR ACCOUNT DETAILS</Title>
        
        <Form>
          <Input name = "first_name" placeholder={user.others.first_name} onChange={handleInputs}/>
          <Input name = "last_name" placeholder={user.others.last_name} onChange={handleInputs}/>
          <Input name = "username" placeholder={user.others.username} onChange={handleInputs}/>
          <Input name = "email" type="email" placeholder={user.others.email} onChange={handleInputs}/>
          <Input name = "mobile" type ="mobile" placeholder={user.others.mobile}  onChange={handleInputs}/>
          <Input name = "password" type="password"placeholder="Enter New Password" onChange={handleInputs}/>
          <Agreement>
            Your Current details is shown in boxes as a placeholder, 
            Enter new account details that you wnat to change to <b>Update</b>
          </Agreement>
          <Button onClick={handleClick}>UPDATE!</Button>
        </Form>
        <Error>sonthing went wrong...</Error>
      </Wrapper>
      </Container>
        <Newslatter/>
        <Footer/>
    </div>
  )
}

export default Account