import React from 'react'
import styled from "styled-components"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addtocart } from '../../Redux/CartSlice';
const Info = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.5s ease;
`;

const Container = styled.div`
  flex: 1;
  margin: 10px;
  min-width: 280px;
  max-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &:hover ${Info} {
  opacity:1;
  }
`;

const Circle = styled.div`
  height: 200px;
  width: 200px;
  border-radius:50% ;
  background-color: white;
  position:absolute;
  `;

const Image = styled.img`
height:75% ;
width:280px;
margin:auto;
z-index:2;
object-fit:cover ;
`;



const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin:10px;
transition:all 0.5s ease;
cursor:pointer;

&:hover{
  background-color:#e9f5f5 ;
  transform:scale(1.1) ;
}; 
`;

const Product = ({items}) => {
const dispatch=useDispatch()
  const addtocarthendler=(product)=>{
const OrderProduct_id = `${product._id}+${product.color[0]}+${product.size[0]}`;
dispatch(
  addtocart({
    ...product,
    productid: product._id,
    quantity: 1,
    color: product.color[0],
    size: product.size[0],
    OrderProduct_id,
  })
);
  }
  return (
    <Container>
      <Circle />
      <Image src={items.img}></Image>
      <Info>
        <Icon onClick={ ()=>addtocarthendler(items)}>
          <AddShoppingCartIcon></AddShoppingCartIcon>
        </Icon>
        <Link to={`/product/${items._id}`}>
          <Icon>
            <SearchIcon></SearchIcon>
          </Icon>
        </Link>
      </Info>
    </Container>
  );
}

export default Product