import React from 'react'
import styled from "styled-components"
import CategoryItems from './CategoryItems';
import Categories from '../../Data/Category';
import {tablet } from '../../Respinsive';

const Container = styled.div`
  background-color: #fcf5f5;
  display: flex;
  padding: 20px;
  justify-content: space-around;
  flex-wrap: wrap;
  ${tablet({
    flexDirection: "column",
    justifyContent: "center",
    alignItem: "center",
  })}
`;
const Header = styled.h2`
  text-align: center;
  text-decoration: underline;
  text-underline-offset: 10px;
  margin: 20px;
`;
const Categorie = () => {
  return (
    <>
      <Header> Product-Categories</Header>
      <Container>
        {Categories.map((items, id) => {
          return (
            <div key={id}>
              <CategoryItems items={items} key={id}>
              </CategoryItems>
            </div>
          );
        })}
      </Container>
    </>
  );
}

export default Categorie