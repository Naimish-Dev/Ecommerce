import React from "react";
import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from "@mui/icons-material/Pinterest";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from "@mui/icons-material/Email";
import payment from "../Assets/payment.png"
import { tablet } from "../Respinsive";

const Container = styled.div`
  display: flex;
  ${tablet({flexDirection:"column"})}
`;

const Left = styled.div`
  flex: 1;
  display:flex;
  flex-direction:column;
  padding: 20px;
`;


const Logo = styled.h1``;

const Des = styled.p`
margin: 20px 0;
`;
const SocialConatiner = styled.div`
display:flex;
`;
const Center = styled.div`
  flex: 1;
  padding: 20px;
  `;
const Title=styled.h3`
margin-bottom: 30px;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItems=styled.li`
width: 50%;
margin-bottom: 10px;
`;
const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const SocialIcon = styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
background-color:${props=>props.color} ;
color:white;
display: flex;
align-items: center;
justify-content: center;
margin-right: 20px;
`;

const ContentItem=styled.div`
display: flex;
margin-bottom: 20px;
align-items: center;
`;

const Payment=styled.img`
width:50%;
margin: 10px;
mix-blend-mode:color-burn ;
`;
const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>ECCOM.</Logo>
        <Des>
          there are many variations pd passages of lorem Ipsum available, but
          the meajority have suffered alteration in some from, by injected
          humour , or randomised words which doesn`t look even slightly
          believable`
        </Des>
        <SocialConatiner>
          <SocialIcon color="#3b5999">
            <FacebookIcon> </FacebookIcon>
          </SocialIcon>
          <SocialIcon color="#E4405f">
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon color="#55acee">
            <TwitterIcon />
          </SocialIcon>
          <SocialIcon color="#e60023">
            <PinterestIcon />
          </SocialIcon>
        </SocialConatiner>
      </Left>
      <Center>
        <Title>Usefull Links</Title>
        <List>
          <ListItems>Home</ListItems>
          <ListItems>Cart</ListItems>
          <ListItems>Man Fashion</ListItems>
          <ListItems>Woman Fashion</ListItems>
          <ListItems>Accessories</ListItems>
          <ListItems>My Acount</ListItems>
          <ListItems>Order Tracking</ListItems>
          <ListItems>Wishlist</ListItems>
          <ListItems>Terms</ListItems>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContentItem>
          <LocationOnIcon></LocationOnIcon>
          om, Ambavadi plot,Bhesan Jnd. 362020.
        </ContentItem>
        <ContentItem>
          <LocalPhoneIcon></LocalPhoneIcon>
          +91 7285857781
        </ContentItem>
        <ContentItem>
          <EmailIcon></EmailIcon>
          naimishbhesaniya212@gmail.com
        </ContentItem>
        <Payment src={payment} />
      </Right>
    </Container>
  );
};

export default Footer;
