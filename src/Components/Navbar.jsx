import React from "react";
import styled from "styled-components";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { mobile, tablet } from "../Respinsive";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logoutuser } from "../Redux/UserSlice";
import { removefromcart } from "../Redux/CartSlice";
const Container = styled.div`
  height: 60px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 10px 0px;
  ${mobile({ height: "50px" })}
  position:sticky;
  top:0px;
  z-index:100;
  background:white;
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  ${mobile({ padding: " 0" })}
  ${tablet({ padding: "10px 10px" })}
`;

const Center = styled.div`
  flex: 1;
`;
const Logo = styled.h1`
  font-weight: bold;
  margin: 0;
  padding: 0;
  ${mobile({ fontSize: "15px" })}
  ${tablet({ fontSize: "20px" })}
  

  .logo {
    text-decoration: none;
    color: black;
  }
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ justifyContent: "center", flex: 2 })}
  ${tablet({ justifyContent: "flex-end", flex: 1 })}
`;
const Manuitems = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "8px" })}
  ${tablet({ fontSize: "12px", marginLeft: "8px" })}


  .link {
    font-size: 15px;
    color: black;
    text-decoration: none;
    weight: 700;
    padding: 3px;
  }
`;
const Logoutbtn = styled.button`
  border: none;
  padding: 3px 5px;
  background: transparent;
  font-size: 15px;
cursor:pointer;
  
`;
const Navbar = () => {
const navigate=useNavigate()
const dispatch=useDispatch()
  const quantity = useSelector((state) => state.cart.quantity);
  const { userdata } = useSelector((state) => state.user);
  const onlogouthendler = () => {
    dispatch(logoutuser())
    dispatch(removefromcart());
   navigate("/log-in")
  };

  return (
    <Container>
      <Wrapper>
        <Center>
          <Logo>
            <Link className="logo" to={"/"}>ECOMMERCE </Link></Logo>
        </Center>
        <Right>
          <Manuitems>
            <Link className="link" to="../products">
              Products
            </Link>
          </Manuitems>
          {userdata ? (
            <Manuitems>
              <Logoutbtn onClick={onlogouthendler}> logout </Logoutbtn>
            </Manuitems>
          ) : (
            <>
              <Manuitems>
                <Link className="link" to="log-in">
                  log-In
                </Link>
              </Manuitems>
              <Manuitems>
                <Link className="link" to="sign-Up">
                  Sign-Up
                </Link>
              </Manuitems>
            </>
          )}
          <Link to="/cart">
            <Manuitems>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartIcon color="action" />
              </Badge>
            </Manuitems>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
