import React from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Newsletter from "../Components/Newsletter";
import Announcement from "../Components/Announcement";
// import I from "../Assets/Products/p10.jpg"
import { mobile, tablet } from "../Respinsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../AxiosReq";
import { addtocart } from "../Redux/CartSlice";
import { useDispatch } from "react-redux";

const Conatiner = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${tablet({ flexDirection: "column", padding: "20px" })}
`;
const ImageContainer = styled.div`
  flex: 1;
`;
const Img = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${tablet({ marginBottom: "15px" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0 30px;
  ${tablet({ padding: "0 10px" })}
  ${mobile({ padding: "0 5px" })}
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.p`
  margin: 20px 0;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;
const FilterConatiner = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-style: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 5px;
  padding: 5px;

  &:hover {
    border-radius: 50%;
    border: 2px solid;
    border-color: ${(props) => (props.color === "black" ? "gray" : "black")};
  }
  cursor: pointer;
`;
const FiletrSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;
const AddContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  border: 2px solid black;
`;
const Remove = styled.div`
  padding: 0px 12px;
  cursor: pointer;
  font-size: 30px;
  font-weight: 900;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-left: 2px solid black;
  border-right: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
const Add = styled.option`
  padding: 0px 10px;
  cursor: pointer;
  font-size: 30px;
  font-weight: 900;
  &:hover {
    background-color: #f8f4f4;
  }
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  ${tablet({ padding: "10px" })}
  ${mobile({ padding: "8px" })}

&:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const ProductId = useLocation().pathname.split("/")[2];
  const [product, setproduct] = useState({});
  const [quantity, setquantity] = useState(1);
  const [color, setcolor] = useState(" ");
  const [size, setsize] = useState(" ");
  
const dispatch = useDispatch();


  useEffect(() => {
    const getproduct = async () => {
      try {
        const res = await publicRequest.get(`products/find/${ProductId}`);
        setproduct(res.data);
        setcolor(res.data.color[0]);
        setsize(res.data.size[0]);
      } catch (e) {
        console.log("get IND Product Error =>" + e);
      }
    };
    getproduct();
  }, [ProductId]);
  
  const productquantity=(type)=>{
    if(type === "add"){
    setquantity(quantity + 1)
  }else{
    quantity > 1 &&  setquantity(quantity - 1)
  }
}


const addtocarthendler=()=>{
  const OrderProduct_id = `${ProductId}+${color}+${size}`;
dispatch(
  addtocart({ ...product,productid:product._id, quantity , color , size, OrderProduct_id })
);
}

return (
    <Conatiner>
      <Navbar></Navbar>
      <Announcement></Announcement>

      <Wrapper>
        <ImageContainer>
          <Img src={product.img}></Img>
        </ImageContainer>
        <InfoContainer>
          <Title>{product.titel}</Title>
          <Desc>{product.desc}</Desc>
          <Price>RS.{product.price}</Price>

          <FilterConatiner>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c, index) => {
                return (
                  <FilterColor
                    color={c}
                    key={index}
                    onClick={() => {
                      setcolor(c);
                    }}
                  />
                );
              })}
            </Filter>
            <Filter>
              <FilterTitle>size</FilterTitle>
              <FiletrSize
                onChange={(e) => {
                  setsize(e.target.value);
                }}
              >
                {product.size?.map((s,id) => {
                  return <FilterSizeOption key={id}>{s}</FilterSizeOption>;
                })}
              </FiletrSize>
            </Filter>
          </FilterConatiner>

          <AddContainer>
            <AmountContainer>
              <Remove
                onClick={() => {
                  productquantity("rem");
                }}
              >
                -
              </Remove>
              <Amount>{quantity}</Amount>
              <Add onClick={() => productquantity("add")}>+</Add>
            </AmountContainer>

            <Button onClick={addtocarthendler}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>

      <Newsletter></Newsletter>
      <Footer></Footer>
    </Conatiner>
  );
};

export default Product;
