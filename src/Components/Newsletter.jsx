import React from 'react'
import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import {mobile, tablet } from '../Respinsive';
const Conatiner=styled.div`
height:60vh;
background-color:#fcf5f5 ;
display:flex;
align-items:center;
justify-content: center;
flex-direction:column ;
`;
const Tite = styled.h1`
font-size: 70px;
margin-bottom:20px;
${tablet({fontSize:"50px"})}
${mobile({fontSize:"30px"})}
`;
const Description = styled.div`
font-size: 24px;
font-weight:300 ;
margin-bottom:20px;
${mobile({fontSize:"15px"})}
`;

const InputContainer = styled.div`
width:50%;
height:40px;
background-color:#fcf5f5;
display:flex;

justify-content:space-between ;
border:1px solid black;

`;
const Input = styled.input`
border:null;
flex:8;
padding-left:20px ;
`;

const Button=styled.button`
flex:1;
border:none;
background-color:teal ;
color:white;
cursor:pointer;
`;
const Newsletter = () => {
  return (
    <Conatiner>
      <Tite>Newsletter</Tite>
      <Description> Get timely Updates from our favorite products </Description>
      <InputContainer >
        <Input placeholder='Enter Your Email'></Input>
        <Button><SendIcon/></Button>
      </InputContainer>
    </Conatiner>
  );
}

export default Newsletter