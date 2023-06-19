import React from 'react'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";


const Container=styled.div`
width:100vw;
height: 100vh;
display:flex ;
justify-content: center;
align-items: center;
flex-direction:column;
`

const Heading=styled.h1`
font-size:50px ;
margin-bottom: 20px;
`
const Text=styled.p`
font-size:20px ;
letter-spacing:1px ;
margin-bottom: 10px;
cursor:pointer;
`
const Error = () => {
  const navigate= useNavigate()
  return (
    <Container>
      <Heading>Error 404 ! </Heading>
      <Text>This page is not founded</Text>
      <Text onClick={()=>navigate(-1)}>Go to back</Text>
    </Container>
  );
}

export default Error