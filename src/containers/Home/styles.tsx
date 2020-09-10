import styled from 'styled-components';

export const MainContainer = styled.div`
  margin:100px 0 20px;
`;

export const Title = styled.h2`
  font-family: Nunito;
  font-weight: 800;
  font-size: 24px;
  line-height: 20px;
  color: #000000;
  text-align:center;
  margin: 0;
`;

export const Widget = styled.div`
  padding: 0 20px;
  margin-top:50px;
  h3 {
    font-family: Nunito;
    font-style: normal;
    font-weight: 800;
    font-size: 20px;
    line-height: 20px;
    color: #000000;
    margin: 0 0 12px;
  }
  .subHeading {
    font-family: Nunito;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    float: left;
    color: #3D4857;
  }
  .mapHolder {
    min-height: 350px;
    .graph-holder {
      padding: 0
    }
  }
`;

export const Label = styled.span `
  font-size: 14px;
    line-height: 20px;
    color: #8492A4;
    font-family: Nunito;
    position: absolute;
    top: 40px;
    right: 40px;
`