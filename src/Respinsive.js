import {css} from "styled-components"


export const mobile=(props)=>{
return css`
  @media (max-width:380px) {
${props}  
}
`;
}

export const tablet=(props)=>{
return css`
  @media (max-width:678px) {
    ${props}
  }
`;

}
export const lg=(props)=>{
return css`
  @media (max-width:980px) {
    ${props}
  }
`;

}