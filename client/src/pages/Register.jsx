import styled  from 'styled-components'
import { useState } from 'react';
import { publicRequest } from '../requestMethods';


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
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

const Register = () => {
  const [err, setErr] = useState("");
  const [inputs, setInputs]  = useState({});

  const handleInputs = (e)=>{
    setInputs(prev=>{
      return {...prev,[e.target.name]:e.target.value}
    })
  }

  console.log(inputs)
  const handleClick = async (e)=>{
    e.preventDefault();
    try{
      var res = await publicRequest.post("auth/register",inputs)
      setErr(res.data)
    }catch(err){
      setErr(err)
      console.log(err)
    }

  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        
        <Form>
          <Input name = "first_name" placeholder="First name"  onChange={handleInputs}/>
          <Input name = "last_name" placeholder="last name" onChange={handleInputs}/>
          <Input name = "username" placeholder="username" onChange={handleInputs}/>
          <Input name = "email" type="email" placeholder="email" onChange={handleInputs}/>
          <Input name = "mobile" type ="mobile" placeholder="Mobile Number" onChange={handleInputs}/>
          <Input name = "password" type="password"placeholder="password" onChange={handleInputs}/>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleClick}>CREATE</Button>
        </Form>
        {err.first_name ? <Error>{err.first_name} is registered </Error> : <Error>sonthing went wrong...</Error>}
      </Wrapper>
    </Container>
  );
};


export default Register