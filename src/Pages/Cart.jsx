import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Announcement from "../Components/Announcement";
import Footer from "../Components/Footer";
import styled from "styled-components";
import { tablet } from "../Respinsive";
import { useSelector,useDispatch } from "react-redux";
import { userRequest } from "../AxiosReq";
import {  Link, useNavigate } from "react-router-dom";
import {
  quantityaddcarditem,
  quantityremovecarditem,
  removefromcart,
  cartid,
} from "../Redux/CartSlice";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${tablet({ padding: "5px" })}
`;
const Title = styled.h1`
  width: 200px;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  ${tablet({ padding: "5px" })}
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
`;



const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
gap:10px;
  ${tablet({ flexDirection: "column" })}
  position:relative
`;
const Info = styled.div`
  flex: 3;
  border: 1px solid lightgray;
  border-radius: 8px;
  padding:3px;
`;
const Emptcart = styled.h2`
width:100%;
height:300px;
color:gray;
display:flex;
align-items:center;
justify-content:center;
border:1px solid lightgray;
border-radius:3px;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
`;

const ProductDetails = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  ${tablet({ width: "100px", height: "100px" })}
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${tablet({ padding: "14px" })}
`;
const ProductName = styled.div``;
const ProductColorContainer = styled.div`
display: flex; 
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 10px ;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  ${tablet({ width: "14px", height: "14px" })}
`;
const ProductSize = styled.div``;

const PriceDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  flex: 1;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  border: 2px solid black;
`;
const Remove = styled.div`
  padding: 0px 8px;
  cursor: pointer;
  font-size: 30px;
  font-weight: 900;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Amount = styled.span`
  width: 100%;
  border-left: 2px solid black;
  border-right: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;
const Add = styled.option`
  padding: 0px 5px;
  cursor: pointer;
  font-size: 30px;
  font-weight: 900;
  &:hover {
    background-color: #f8f4f4;
  }`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${tablet({ fontSize: "24px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 100%;
`;
const SummartTitle = styled.h1`
  font-weight: 200;
  ${tablet({ fontSize: "24px" })}
`;
const SummartItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && 500};
  font-size: ${(props) => props.type === "total" && " 24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  width: 100%;
  background-color: black;
  color: White;
  padding: 10px;
  border: none;
  cursor: pointer;
`;

const Cart = () => {

  const cart = useSelector((state) => state.cart);
  const { userdata } = useSelector((state) => state.user);
 
  const dispatch =useDispatch()
  const navigate = useNavigate();

  const emptycart=()=>{
    dispatch(removefromcart())
  }

const productquantityadd=(id)=>{
  dispatch(quantityaddcarditem(id));
}


const productquantityremove=(id)=>{
  dispatch(quantityremovecarditem(id));
}

const request=userRequest();
  const cartdatahendler=()=>{
const setdata = async()=>{
  try{
    const res = await request.post("/cart", {
      userid: userdata._id,
      products: cart.products,
      amount: cart.total,
    });
    res.status === 200 && dispatch(cartid(res.data._id));
   res.status === 200 && navigate("/checkout")
  }catch(e){
console.log(e);
  }
}
cart.products && setdata()
   }

  return (
    <Container>
      <Navbar></Navbar>
      <Announcement></Announcement>
      <Wrapper>
        <Title>YOUR BAG</Title>
        {cart.products.length > 0 ? (
          <>
            <Top>
              <Link to="../">
                <TopButtom type="filled">CONTINUE SHOPPING</TopButtom>
              </Link>

              <TopButtom type="filled" onClick={emptycart}>
                Clear Cart
              </TopButtom>
            </Top>
            <Bottom>
              <Info>
                {cart.products.map((val, id) => {
                  return (
                    <div key={id}>
                      <Product>
                        <ProductDetails>
                          <Image src={val.img}></Image>
                          <Details>
                            <ProductName>
                              <b>Product: </b>
                              {val.titel}
                            </ProductName>
                            <ProductColorContainer>
                              <b> color : </b>{" "}
                              <ProductColor color={val.color} />
                            </ProductColorContainer>
                            <ProductSize>
                              <b>Size: </b> {val.size}
                            </ProductSize>
                          </Details>
                        </ProductDetails>

                        <PriceDetail>
                          <AmountContainer>
                            <Remove
                              onClick={() =>
                                productquantityremove(val.OrderProduct_id)
                              }
                            >
                              -
                            </Remove>
                            <Amount>{val.quantity}</Amount>
                            <Add
                              onClick={() => {
                                productquantityadd(val.OrderProduct_id);
                              }}
                            >
                              +
                            </Add>
                          </AmountContainer>
                          <ProductPrice>{val.price} </ProductPrice>
                        </PriceDetail>
                      </Product>

                      <Hr />
                    </div>
                  );
                })}
              </Info>
              <Summary>
                <SummartTitle>ORDER SUMMARY</SummartTitle>
                <SummartItem>
                  <SummaryItemText>Subtotal</SummaryItemText>
                  <SummaryItemPrice>RS.{cart.total}</SummaryItemPrice>
                </SummartItem>

                <SummartItem>
                  <SummaryItemText>Estimated Shipping</SummaryItemText>
                  <SummaryItemPrice>RS. 60</SummaryItemPrice>
                </SummartItem>
                <SummartItem>
                  <SummaryItemText> Shipping Discount</SummaryItemText>
                  <SummaryItemPrice>RS. 10</SummaryItemPrice>
                </SummartItem>
                <SummartItem type="total">
                  <SummaryItemText> Total</SummaryItemText>
                  <SummaryItemPrice>RS. {cart.total}</SummaryItemPrice>
                </SummartItem>
                  <Button onClick={cartdatahendler}>Order Now</Button>
              </Summary>
            </Bottom>
          </>
        ) :  <Emptcart> Cart is Empty </Emptcart>  }
      </Wrapper>

      <Footer></Footer>
    </Container>
  );
};

export default Cart;
