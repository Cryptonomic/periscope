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
    position:relative;
    .account-graph {
        position: relative;
        left: 125px;
        top: 60px;
    }
    .graph-holder {
        padding-top: 25px;
    }
    .pos-abs {
      position:absolute;
      top:20px;
      left:12px;
      p {
        font-family: Nunito;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #3D4857;
        span,input {
          display:inline-block;
          vertical-align:middle;
        }
        input {
          margin: 0 10px;
          background: #F6F6F9;
          border: 1px solid #ECECEE;
          border-radius: 4px;
          font-family: Nunito;
          font-weight: 400;
          font-size: 11px;
          line-height: 16px;
          color: #242423;
          padding:4px 10px;
          width:76px;
          &:focus {
            outline:none;
          }
        }
      }
    }
  }
`;