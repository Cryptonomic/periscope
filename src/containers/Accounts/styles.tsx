import styled from 'styled-components';

export const MainContainer = styled.div`
  margin-top:100px;
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
    font-size: 16px;
    line-height: 20px;
    color: #000000;
    margin: 0 0 7px;
  }
  .linkHolder {
    margin-bottom:25px;
    ul {
      padding:0;
      margin:0;
      display:flex;
      li {
        list-style:none;
        &.rightAlign {
          flex-grow: 1;
          text-align: right;
        }
        a {
          font-family: Nunito;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 20px;
          color: #5CBBD4;
          margin-left:15px;
          text-decoration:none;
        }
        svg {
          display: inline-block;
          margin-left: 5px;
        }
      }
    }
  }
  .mapHolder {
    min-height:350px;
    background:#fff;
  }
`;