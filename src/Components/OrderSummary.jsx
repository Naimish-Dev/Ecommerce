
import styled from "styled-components";
import { tablet,mobile } from "../Respinsive";





const Product = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:center;
  margin: 5px;
`;

const ProductDetails = styled.div`
  flex: 2;
  display: flex;
  align-items:center;
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
  ${tablet({ width: "40px", height: "40px" })}
`;

const Details = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${tablet({ padding: "14px" })}
  ${mobile({ padding: "4px" })}
`;
const ProductName = styled.div``;
const ProductColorContainer = styled.div`
  display: flex;
  align-items:center;
`;

const ProductColor = styled.div`
  width: 12px;
  height: 12px;
  margin-left: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  ${tablet({ width: "14px", height: "14px" })}
`;
const ProductSize = styled.div``;

const ProductPrice = styled.h4`
margin:3px 0;
`;

const Cart = ({cartdata}) => {
  return (
    <>
      {cartdata?.map((val, id) => {
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
                    <b> color : </b>
                    <ProductColor color={val.color} />
                  </ProductColorContainer>
                  <ProductSize>
                    <b>Size: </b> {val.size}
                  </ProductSize>
                </Details>
              </ProductDetails>
              <Details>
                <ProductPrice>
                  <b> quentity :- {val.quantity}x </b>
                </ProductPrice>
                <ProductPrice>
                  <b>Rs. {val.price} </b>
                </ProductPrice>
              </Details>
            </Product>
          </div>
        );
      })}
    </>
  );
};

export default Cart;
