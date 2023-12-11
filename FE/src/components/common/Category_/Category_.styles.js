import styled from 'styled-components'


const CategoryBox = styled.div`
  display: flex;
`;

const Category = styled.div`
  width: 200px;
  height: 44px;
  border: 1px solid ${(props) => (props.checked ? "black" : "#CECECE")};
  border-radius: 10px;
  cursor: pointer;
  background-color: ${(props) => (props.checked ? "#FADA5E" : "white")};
  color: ${(props) => (props.checked ? "#464234" : "#1e1e1e")};
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  :last-child {
    margin-right: 0px;
  }
  :hover {
    background-color: ${(props) => (props.checked ? "#DFB71C" : "#f0f0f0")};
  }
`;


const CategoryText = styled.span`
  font-size: 15px;
`;

const S = {
  CategoryBox,
  Category,
  CategoryText,
};

export default S;