import Navbar from "../Components/Navbar";
import Announcement from "../Components/Announcement";
import Footer from "../Components/Footer";
import styled from "styled-components";
import { tablet, lg } from "../Respinsive";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { userRequest } from "../AxiosReq";
import { useSelector } from "react-redux";
import Addressform from "../Components/Addressform";
import OrderSummary from "../Components/OrderSummary";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  ${tablet({ padding: "5px" })}
  ${lg({ flexDirection: "column" })}
  gap: 10px;
`;

const Title = styled.h3`
  margin: 10px 20px;
`;

const Info = styled.div`
  flex: 3;

  border: 1px solid lightgray;
  border-radius: 8px;
  padding: 5px;
  min-width: 300px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 5px;
  height: 100%;
  position: sticky;
  top: 100px;
`;
const SummartTitle = styled.h2`
  font-weight: 200;
  ${tablet({ fontSize: "20px" })}
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
  // cursor: ${(props) => props.type === "false" && "context-menu"};
`;

const Checkout = () => {
  const navigate = useNavigate();
  const request = userRequest();

  const [carddetails, setcarddetails] = useState([]);
  const [payment, setpayment] = useState([]);
  const [addressid, setaddressid] = useState(null);
  const [btnvalidation, setbtnvalidation] = useState(true);

  const [token, settoken] = React.useState(null);
  const user = useSelector((store) => store.user);
  const usercartId = useSelector((store) => store.cart.cartid);
  const Key = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

  useEffect(() => {
    const getaddress = async () => {
      try {
        const cartdataresponce = await request.get(`cart/${usercartId}`);
        cartdataresponce.status === 200 &&
          setcarddetails(cartdataresponce.data);
      } catch (e) {
        console.log(e);
      }
    };
    usercartId && getaddress();
  }, [request, usercartId]);

  const onaddresshendler = (addressid1) => {
    setaddressid(addressid1);
    setbtnvalidation(false);
  };

  const ontoken = (token) => {
    settoken(token);
  };
  useEffect(() => {
    const makerequest = async () => {
      try {
        const res = await request.post("/checkout/payment", {
          amount: carddetails.amount,
          user_details: token.card,
        });
        res?.status === 200 && setpayment(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    token && makerequest();
  }, [token, addressid, carddetails.amount, request]);

  useEffect(() => {
    const makerequest = async () => {
      try {
        const res = await request.post("/transaction", {
          userid: user.userdata._id,
          tid: payment.id,
          amount: payment.amount,
          status: payment.metadata.funding,
          card: payment.metadata.last4,
        });
        res?.status === 200 &&
          navigate("/success", {
            state: {
              userid: user.userdata._id,
              cartid: carddetails._id,
              addressid: addressid,
              transactionid: res.data._id,
            },
          });
      } catch (e) {
        console.log(e);
      }
    };
    payment && makerequest();
  }, [
    payment,
    addressid,
    carddetails._id,
    navigate,
    request,
    user.userdata._id,
  ]);

  const cartdatahendler = () => {};

  return (
    <Container>
      <Navbar></Navbar>
      <Announcement></Announcement>
      <Title>ORDER DETAILS</Title>
      <Wrapper>
        <Info>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Address</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Addressform
                userid={user.userdata._id}
                addresss={onaddresshendler}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Products Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <OrderSummary cartdata={carddetails?.products} />
            </AccordionDetails>
          </Accordion>
        </Info>
        <Summary>
          <SummartTitle>ORDER SUMMARY</SummartTitle>
          <SummartItem>
            <SummaryItemText>Subtotal</SummaryItemText>
            <SummaryItemPrice>RS.{+carddetails?.amount}</SummaryItemPrice>
          </SummartItem>

          <SummartItem>
            <SummaryItemText> Discount 50%</SummaryItemText>
            <SummaryItemPrice>
              RS. {(+carddetails?.amount * (100 - 50)) / 100}
            </SummaryItemPrice>
          </SummartItem>
          <SummartItem>
            <SummaryItemText>Estimated Shipping</SummaryItemText>
            <SummaryItemPrice>RS.50</SummaryItemPrice>
          </SummartItem>
          <SummartItem type="total">
            <SummaryItemText> Total</SummaryItemText>
            <SummaryItemPrice>
              RS. {(+carddetails?.amount * (100 - 50)) / 100 + 50}
            </SummaryItemPrice>
          </SummartItem>
          <StripeCheckout
            name="Testing-Ecomm.buy"
            description="payment will be a....!"
            // billingAddress
            // shippingAddress
            amount={((+carddetails?.amount * (100 - 50)) / 100 + 50) * 100}
            currency="INR"
            stripeKey={Key}
            token={ontoken}
          >
            <Button disabled={btnvalidation} onClick={cartdatahendler}>
              Check Out
            </Button>
          </StripeCheckout>
        </Summary>
      </Wrapper>

      <Footer></Footer>
    </Container>
  );
};

export default Checkout;
