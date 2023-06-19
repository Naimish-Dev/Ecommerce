import React from 'react'
import styled from "styled-components"

const Container= styled.div`
height:30px;
display: flex;
justify-content:center ;
align-items:center ;
font-size:14px ;
font-weight:600;
background-color:teal ;
color:white;
`;
const Announcement = () => {
  return (<>
    <Container>Super Deal! with 50% discount </Container>
  </>
  )
}

export default Announcement