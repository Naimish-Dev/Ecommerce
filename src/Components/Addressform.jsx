import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { userRequest } from '../AxiosReq';
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 0px;
  padding: 10px;
`;
const Textarea = styled.textarea`
  flex: 1;
  min-width: 40%;
  margin: 20px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 100px;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 15px;
  &::disabled {
    color: teal;
    cursor: not-allowed;
  }
`;





const Addressform = ({ userid, addresss }) => {
  const request=userRequest()
  const [formdata, setforndata] = useState(null);
  const [btn, setbtn] = useState(false);
 

  
  useEffect(() => {
     const getaddress = async () => {
       try {
         const responce = await request.get(`address/find/${userid}`);
         responce.status === 200 && setforndata(responce.data[0]);
         responce.data.length === 0 ? setbtn(false) : setbtn(true);
         
        responce.status === 200  && addresss(responce.data[0]._id);
       } catch (e) {
         console.log(e);
       }
     };
    getaddress();

  }, []);

  const setaddress = async () => {
    try {
      if (btn) {
        const responce = await userRequest.put(`address/${formdata._id}`, {
          userid,
          ...formdata,
        });
        responce.status === 200 && addresss(responce.data._id);
        responce.status === 200 && setforndata(responce.data);
      } else {
        const responce = await userRequest.post(`address`, {
          userid,
          ...formdata,
        });
        responce.status === 200 && addresss(responce.data._id);
        responce.status === 200 && setforndata(responce.data);
        responce.status === 200 && setbtn(true)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formhendler = (e) => {
    e.preventDefault();
    setaddress();
  };

  
  const namechanghendler = (e) => {
    setforndata((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };

  return (
    <div>
      <Form onSubmit={(e) => formhendler(e)}>
        <Input
          type="text"
          placeholder="Name"
          name="uname"
          onChange={(e) => namechanghendler(e)}
          defaultValue={formdata ? formdata.uname : ""}
        />

        <Textarea
          placeholder="Location"
          name="location"
          onChange={(e) => namechanghendler(e)}
          defaultValue={formdata ? formdata.location : ""}
        />

        <Input
          type="number"
          placeholder="PIN"
          name="pin"
          onChange={(e) => namechanghendler(e)}
          defaultValue={formdata ? formdata.pin : ""}
        />

        <Input
          type="number"
          placeholder="Number"
          name="number"
          onChange={(e) => namechanghendler(e)}
          defaultValue={formdata ? formdata.number : ""}
        />

        <Button>{btn ? "Update" : "Submit"}</Button>
      </Form>
    </div>
  );
};

export default Addressform