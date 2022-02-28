
import styled from 'styled-components';

const BoxBlock = styled.div`
  background-color : white;
  margin: 15px 0;
  width: 100%;
  height : 53vh;
  border-radius : 10px;
`;

const BoxInline = styled.div`
  width : 49.5%;
  height: 31vh;
  background-color : white;
  border-radius : 10px;
  padding:7px 15px;
  margin-left : ${props => props.right === true ? "0.5%" : 5};
  margin-right : ${props => props.left === true ? "0.5%" : "0"};
  box-shadow: 0px 3px 6px rgba(0,0,0,0.2);
  margin-bottom:10px;
`;


export { BoxBlock, BoxInline }