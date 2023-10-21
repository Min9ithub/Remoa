import styled from "styled-components"

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  background-color: #f6f6f5;
`;

const Container = styled.div`
  background-color: white;
  margin-top: 104px;
  width: 560px;
  height: 480px;
  border-radius: 24px;
  display: inline-block;
`;

const OuterWrapper = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const OuterBox = styled.div`
  margin-top: 49px;
`;

const TextBox = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #1E1E1E;
  margin-bottom: 38px;
`
  
const InnerBox = styled.div`
  margin-bottom:31px;
`;

const CommentBox = styled.div`
  width: 468px;
  height: 60px;
  background: #f8f8f8;
  color: #464646;
  font-size: 14px;
  font-weight: 700;
  border-radius: 30px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding : 3px;
  margin-bottom: 18px;
`
  
const LoginBox = styled.div`
  text-align: center;
`

const LoginInfoBox = styled.div`
  margin-bottom: 3px;
`

const S = {
  Wrapper,
  Container,
  OuterWrapper,
  OuterBox,
  TextBox,
  InnerBox,
  CommentBox,
  LoginBox,
  LoginInfoBox,
};

export default S;