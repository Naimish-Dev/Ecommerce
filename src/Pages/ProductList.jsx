import React from 'react'
import styled from 'styled-components'
import Announcement from '../Components/Announcement';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import Newsletter from '../Components/Newsletter';
import Products from '../Components/Product/Products';
import Filtercover from '../Components/Filter';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
const Conatiner=styled.div`

`;
const Title = styled.h1`
text-align:center;
margin:10px ;
`;

const ProductList = () => {
  const [filter, setfilter] = useState({});
  const [sort, setsort] = useState("newest");
   const cat = useLocation().pathname.split("/")[2];
   

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
       <Title>{cat}</Title>
       <Filtercover
         filter={filter}
         getfilter={filterhendler}
         getsort={sorthendler}
        //  getcat={cathendler}
       >
       </Filtercover>
       <Products cat={cat} filter={filter} sort={sort}></Products>
       <Newsletter></Newsletter>
       <Footer></Footer>
     </Conatiner>
   );
}

export default ProductList