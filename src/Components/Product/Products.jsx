import React, { useState ,useEffect} from 'react'
import styled from "styled-components"
import Product from './Product';
import { tablet } from '../../Respinsive';
import axios from "axios"
const Container = styled.div`
  padding: 20px;
  text-align: center;
  .headers {
    text-decoration: underline;
    text-underline-offset: 10px;
    margin:20px 0;
  }

`;

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${tablet({ justifyContent: "center" })}
`;


const Products = ({all,cat,filter,sort}) => {
const [products,setproducts]=useState([]);
const [filteredproducts,setfilteredproducts]=useState([]);
useEffect(()=>{
  
const fatchproduct = async () => {
  try {
    const responce = await axios.get(
      cat
        ? `https://ecommerce-backend-production-4ddd.up.railway.app/api/products?category=${cat}`
        : `https://ecommerce-backend-production-4ddd.up.railway.app/api/products`
    );
  setproducts(responce.data);
  } catch (error) {
    console.log("product Error=> " + error);
  }
};

fatchproduct();
},[cat,all])

useEffect(()=>{
  //filter ||  sort ? setfilteredproducts(
  //   products.filter((item) => Object.entries(filter).every(([key,value]) => item[key].includes(value)))
  //   ) : setfilteredproducts(...products)

  let keys = " ";
  let keys2 = " ";
  filter || sort ? (keys = Object.keys(filter)[0]) : (keys = " ");
  filter || sort ? (keys2 = Object.keys(filter)[1]) : (keys2 = " ");

  let d = [...products];

  filter || sort
    ? filter.color === undefined 
      ? (d = [...products])
      : (d = d.filter((item) => {
          return (
            item[keys]?.includes(filter.color) ||
            item[keys2]?.includes(filter.color)
          );
        }))
    : (d = [...products]);

  filter || sort
    ? filter.size === undefined 
      ? (d = [...d])
      : (d = d.filter((item) => {
          return item[keys2]?.includes(filter.size) || item[keys]?.includes(filter.size)
        }))
    : (d = [...products]);

  cat && setfilteredproducts(d);
  all && setfilteredproducts(d);
},[filter,cat,products,all,sort])

useEffect(() => {
  if (sort === "newest") {
    setfilteredproducts((pre) => {
      return [...pre].sort((a, b) => a.createdAt - b.createdAt);
    });
  } else if (sort === "asc") {
    setfilteredproducts((pre) => {
      return [...pre].sort((a, b) => a.price - b.price);
    });
  } else {
    setfilteredproducts((pre) => {
      return [...pre].sort((a, b) => b.price - a.price);
    });
  }
}, [sort, filter,all]);

return (
  <>
    <Container>
      {!cat && !all && <h1 className="headers">Products</h1>}
      <Wrapper>
        {cat || all
          ? filteredproducts.map((items, index) => {
              return <Product items={items} key={index}></Product>;
            })
          : products.slice(0, 4).map((items, index) => {
              return <Product items={items} key={index * 10}></Product>;
            })}
      </Wrapper>
    </Container>
  </>
);
}

export default Products
