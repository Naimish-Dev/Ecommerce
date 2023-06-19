import React from 'react'
import styled from 'styled-components'
import { mobile,tablet } from '../Respinsive'
import {useDispatch, useSelector} from "react-redux"
import Apicall from "../Redux/Aplicall"
import {Link} from "react-router-dom"
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: teal;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  background-color: white;
  ${mobile({width:"100%"})}
  ${tablet({width:"80%"})}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
flex-direction:column`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 0px ;
  padding: 10px;
`;
const Button = styled.button`
  width: 100px;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom:15px;
  &::disabled{
    color:teal;
    cursor:not-allowed;
  }
`;
const Error=styled.span`
color:red;
font-weight:700;

`;
  
const Login = () => {
  const dispatch=useDispatch()
  const { isFeatching, error } = useSelector((store) => store.user);
const [userdata, setuserdata] = React.useState({ username: "", password: "" });

const namechanghendler=(e)=>{
  setuserdata({ ...userdata ,[e.target.name]:e.target.value});
}

const formhendler=(e)=>{
e.preventDefault()
Apicall(dispatch, { username: userdata.username, password: userdata.password });
}

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN </Title>

        <Form onSubmit={(e) => formhendler(e)}>
          <Input
            type="text"
            placeholder="username"
            name="username"
            onChange={(e) => namechanghendler(e)}
          />

          <Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => namechanghendler(e)}
          />

          <Button disabled={isFeatching}>LOG IN</Button>
          {error && <Error> Somthing went Wrong !!!!</Error>}
          <Link  to="/sign-up">CREATE NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Login