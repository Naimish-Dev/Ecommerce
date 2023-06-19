import React, { useState } from 'react'
import styled from "styled-components"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SliderData from '../Data/SliderData'
import { mobile,tablet } from '../Respinsive';
import { Link } from 'react-router-dom';
const Conatainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  margin: 0;
  padding: 0;
  overflow: hidden;
    `;

const Arrow=styled.div`
width:50px;
height:50px;
background-color:#fff7f7 ;
border-radius:50%;
display:flex ;
justify-content:center ;
align-items:center ;
position:absolute;
top:0;
bottom:0;
left: ${props=>props.direction === "left" && "10px"};
right: ${props=>props.direction === "right" && "10px"};
margin:auto;
cursor:pointer;
opacity:0.6 ;
z-index:2;
${tablet({ width: "25px" ,height:"25px"})}
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items:center ;
  transition:all  1s ease-in-out;
  transform: translateX(${(props) => props.slidin * -100}vw);
  `;

const  Slide=styled.div`
width:100vw;
height:100vh;
display:flex;
align-items:center;
${tablet({ position: "relative" })}
`;

const  ImageContainer=styled.div`
height:80%;
flex:1;

`;

const Image = styled.img`
  height: 100%;
  width:100%;
  object-fit:cover;
  `;

const InfoContainer = styled.div`
flex:1;
padding:50px;
${tablet({position:"absolute",padding:"40px", width:"100%",backgroundColor:"rgba(225,225,225,0.3)",height:"100%",
display:"flex",flexDirection:"column",justifyContent:"space-around"})}
`;

const Title = styled.h1`
  font-size: 50px;
  ${mobile({ fontSize: "20px" })}
  ${tablet({ fontSize: "30px" })}
  `;
const Desc = styled.p`
  font-size: 25px;
  margin: 50px 0;
  font-weight: 500;
  letter-spacing: 2px;
  ${mobile({ fontSize: "15px" })}
  ${tablet({ fontSize: "20px" })}
`;

const TopButtom = styled.button`
  padding: 10px;
  ${tablet({ padding: "5px" })}
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  ${mobile({ fontSize: "10px", backgroundColor: "white", color: "black" })}
  ${tablet({ fontSize: "10px", backgroundColor: "white", color: "black" })}
`;
const Slider = () => {
    const [slidIndex,setslidIndex]=useState(0)
    const handleClick=(direction)=>{
if(direction === "left"){
setslidIndex(slidIndex > 0 ? slidIndex -1 : 2 );
}else{
    setslidIndex(slidIndex < 2 ? slidIndex + 1 : 0 );
}}

  return (
    <>
      <Conatainer>
        <Arrow
          direction="left"
          onClick={() => {
            handleClick("left");
          }}
        >
          <ArrowBackIosNewIcon />
        </Arrow>
        <Wrapper slidin={slidIndex}>
          {SliderData.map((val, id) => {
            return (
              <Slide bg={val.bg} key={id}>
                <ImageContainer>
                  <Image src={val.img}></Image>
                </ImageContainer>
                <InfoContainer>
                  <Title>{val.title}</Title>
                  <Desc>{val.des}</Desc>
                  <Link to="products">
                    <TopButtom type="filled">CONTINUE SHOPPING</TopButtom>
                  </Link>
                </InfoContainer>
              </Slide>
            );
          })}
        </Wrapper>
        <Arrow
          direction="right"
          onClick={() => {
            handleClick("right");
          }}
        >
          <ArrowForwardIosIcon />
        </Arrow>
      </Conatainer>
    </>
  );
}

export default Slider