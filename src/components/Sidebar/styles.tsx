import styled from 'styled-components';

export const Title = styled.h1`
    font-family: Quicksand;
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 20px;
    letter-spacing: 0.05em;
    color: #242423;
    margin: 0 0 10px;
    text-align:center;
`;

export const Holder = styled.div`
    background-color:#fff;
    padding:30px 10px;
    min-height: 100vh;
`;

export const Subtitle = styled.p`
    font-family: Nunito;
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 20px;
    color: #274B93;
    margin:0 0 15px;
    text-align:center;
`;

export const List = styled.ul`
    padding:16px 10px;
    margin:0 10px;
    &.selected {
        background: rgba(168, 218, 220, 0.23);
        border-radius: 4px;
        svg path {
            fill:#426DD5;
            stroke:#426DD5;
        }
        a {
            color:#5987D7;
        }
    }
    &.head {
        li {
            margin-bottom:0;
        }
    }
    &.sub {
        padding:10px 16px 0px 26px;
    }
`;

export const ListItem = styled.li`
    font-size:12px;
    list-style:none;
    margin-bottom:10px;
    svg,a {
        display: inline-block;
        vertical-align: bottom;
    }
    svg path {
        fill:#8492A4;
        stroke:#8492A4;
    }
    a {
        margin-left:10px;
        text-decoration:none;
        font-family: Nunito;
        font-style: normal;
        font-weight:300;
        font-size: 14px;
        line-height: 18px;
        color: #000000;
        letter-spacing:0.5px;
        &.main-style {
            font-weight: 800;
        }
    }
`;


