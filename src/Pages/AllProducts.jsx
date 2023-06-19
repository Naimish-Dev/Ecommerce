import React from "react";
import styled from "styled-components";
import Announcement from "../Components/Announcement";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Newsletter from "../Components/Newsletter";
import Products from "../Components/Product/Products";
import { useState } from "react";
import Filtercover from "../Components/Filter";
const Conatiner = styled.div``;
const Title = styled.h1`
  text-align: center;
  margin: 10px;
`;



const AllProducts = () => {
   const [filter, setfilter] = useState({})
   const [sort, setsort] = useState("newest");
  
   const filterhendler = (fil) => {
     setfilter(fil);
   }; 
   const sorthendler = (s) => {
    setsort(s)
   }; 
  

  return (
    <Conatiner>
      <Navbar />
      <Announcement />
      <Title>Products</Title>
      <Filtercover
        filter={filter}
        getfilter={filterhendler}
        getsort={sorthendler}
      ></Filtercover>

      <Products
        all={"allproduct"}
        filter={filter}
        sort={sort}
      ></Products>
      <Newsletter></Newsletter>
      <Footer></Footer>
    </Conatiner>
  );
};

export default AllProducts;
