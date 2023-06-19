import React from "react";
import styled from "styled-components";
import {useNavigate} from "react-router"
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import firebaseapp from "../Firebase";
import axios from "axios";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: teal;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  padding: 20px;
  text-align: cenetr;
  background-color: white;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  letter-spacing: 2px;
  border-bottom: 2px solid teal;
  display: inline-block;
  margin: auto;
`;
const Error=styled.p`
  color:red;
margin:10px 0 ; `

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 300px;
  margin: 20px 10px 0 0;
  padding: 10px;
`;

const IMG = styled.img`
  width: 80px;
  height: 80px;
  object-fit:cover;
  margin: 20px 0  0 0;
border-radius:50%;
border-redius:50% ;
  `;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 15px 0;
`;

const Register = () => {
  const navigate=useNavigate()
  const [user, setuser] = useState({});
  const [img, setimg] = useState(
    "https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png"
  );
  const [error, seterror] = useState("");
  const inputhendler = (e) => {
    setuser((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };

  const inputfilehendler = (e) => {
    const filename = new Date().getTime() + e.target.files[0].name;
    const storage = getStorage(firebaseapp);
    const Referance = ref(storage, `Userss_img/${filename}`);

    const uploadTask = uploadBytesResumable(Referance, e.target.files[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setimg(downloadURL);
          console.log(downloadURL);
        });
      }
    );
  };
  const signuphendler = (e) => {
    e.preventDefault();
    const register = async () => {
            seterror("");

      try {
        const res = await axios.post(
          `http://localhost:5000/api/auth/register`,
          {
            ...user,
            img,
          }
        );
        if(res.status === 200){
          navigate("../log-in");
        }
      } catch (error) {
        console.log(error);

      }
    };
    if (
      user.userName &&
      user.email &&
      user.number &&
      user.password &&
      user.confirmpassword &&
      img
    ) {
      if (user.password === user.confirmpassword) {
        register();
      } else {
        seterror("check password");
      }
    } else {
      seterror("fill all the fild");
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>Sign-up</Title>

        <Form method="post" onSubmit={(e) => signuphendler(e)}>
          <label
            style={{
              textAlign: "center",
              cursor: "pointer",
              dispaly: "inline",
              width: "100px",
              margin: "auto",
            }}
            htmlFor="profile"
          >
            <IMG src={img} alt="Profile" />
          </label>

          <Input
            onChange={(e) => inputhendler(e)}
            type="text"
            name="userName"
            placeholder="User Name"
          ></Input>
          <Input
            onChange={(e) => inputfilehendler(e)}
            type="file"
            name="img"
            placeholder="Img"
            style={{ display: "none" }}
            id="profile"
          ></Input>
          <Input
            onChange={(e) => inputhendler(e)}
            type="email"
            name="email"
            placeholder="email"
          ></Input>
          <Input
            onChange={(e) => inputhendler(e)}
            type="number"
            name="number"
            placeholder="Phone"
          ></Input>

          <Input
            onChange={(e) => inputhendler(e)}
            type="password"
            name="password"
            placeholder="Password"
          ></Input>
          <Input
            onChange={(e) => inputhendler(e)}
            type="password"
            name="confirmpassword"
            placeholder="confirm Password"
          ></Input>

          <Button  >
            CREATE
          </Button>
          {error && <Error> {error} </Error>}
          <Link to="/log-in"> I Have an Account </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
