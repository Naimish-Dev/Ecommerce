import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { userRequest } from "../AxiosReq.jsx";
import { useSelector, useDispatch } from "react-redux";
import { removefromcart } from "../Redux/CartSlice.js";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Div = styled.div`
  text-align: center;

  h1 {
    padding: 10px;
  }
`;

const Success = () => {
  const [orderid, setorderid] = React.useState("");
  const data = useLocation();
  const dispatch = useDispatch();
const request=userRequest()

console.log(data.state);
  useEffect(() => {
    const setdata = async () => {
      try {
        const res = await request.post("/orders", {
          userid: data.state.userid,
          cartid: data.state.cartid,
          addressid: data.state.addressid,
          transactionid: data.state.transactionid,
        });
        setorderid(res.data._id);
        res.status === 200 && dispatch(removefromcart());
      } catch (e) {
        console.log(e);
      }
    };
    setdata();
  }, [ ]);


  return (
    <Container>
      <Div>
        <h1>Success </h1>
        <p>Order id : {orderid && orderid}</p>
        <Link to="/"> Go back</Link>
      </Div>
    </Container>
  );
};

export default Success;
