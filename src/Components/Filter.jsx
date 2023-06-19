import React from 'react'
import { tablet } from "../Respinsive";

import styled from 'styled-components';
const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
`;
const FilterTest = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${tablet({ padding: "5px", marginRight: "5px" })}
`;
const Option = styled.option`
  margin: 5px;
`;

const Filtercover = ({filter,getfilter, getsort }) => {
 
   

  const filterHendler = (e) => {
    getfilter({ ...filter, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <FilterContainer>
        <Filter>
          <FilterTest>Filter Product</FilterTest>
          <Select defaultValue="color" name="color" onChange={filterHendler}>
            <Option disabled value="color">
              Colors
            </Option>
            <Option value="red">red</Option>
            <Option value="black">black</Option>
            <Option value="green">green</Option>
            <Option value="blue">blue</Option>
            <Option value="orang">orang</Option>
            <Option value="gray">gray</Option>
            <Option value="pink">pink</Option>
            <Option value="white">White</Option>
          </Select>
          <Select defaultValue="size" name="size" onChange={filterHendler}>
            <Option disabled value="size">
              Size
            </Option>
            <Option value="xlg">xlg</Option>
            <Option value="lg">lg</Option>
            <Option value="xsm">xsm</Option>
            <Option value="sm">sm</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterTest>Sort </FilterTest>
          <Select
            defaultValue="sort"
            onChange={(e) => {
            //   setsort(e.target.value);
                    getsort(e.target.value);

            }}
          >
            <Option disabled value="sort">
              sort
            </Option>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price(asc)</Option>
            <Option value="desc">Price(desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
    </div>
  );
};

export default Filtercover