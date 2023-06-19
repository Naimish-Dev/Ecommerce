import React from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components"
import { mobile, tablet } from "../../Respinsive";

const Container=styled.div`
flex:1;
margin:3px;
height:70vh;
position:relative;
`;
const Image = styled.img`
  width: 280px;
  height: 100%;
  object-fit: cover;
  ${tablet({ width: "100%" })}
`;
const Info = styled.div`
background-color:rgba(0,0,0,0.3) ;
position:absolute;
width:100%;
height:100%;
top:0;
left:0;
display:flex;
flex-direction:column ;
align-items: center;
justify-content:center ;
`;
const Titel = styled.h1`
text-align: center;
color:White;
margin-bottom:20px;
${mobile({fontSize:"24px"})}
${tablet({fontSize:"34px"})}
font-size:24px ;
`;
const Button = styled.button`
border:none;
cursor:pointer;
background-color:white ;
color:gray;
font-weight:600 ;
padding:10px;
`;


const CategoryItems = ({items}) => {
  return (
    <>
      <Container>
        <Link to={`/products/${items.Cat}`}>
          <Image src={items.img}></Image>
          <Info>
            <Titel>{items.title}</Titel>
            <Button>SHOP NOW</Button>
          </Info>
        </Link>
      </Container>
    </>
  );
}

export default CategoryItems