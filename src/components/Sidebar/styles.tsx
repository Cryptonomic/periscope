import styled from 'styled-components';

export const Title = styled.h1`
    font-family: Quicksand;
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 20px;
    letter-spacing: 0.06em;
    color: #242423;
    margin: 0 0 20px;
    text-align:center;
    & a {
        text-decoration: none;
        color: inherit;
    }
`;

export const Holder = styled.div`
    background-color:#fff;
    padding:30px 10px;
    height: 100%;
    position: fixed;
    display: block;
    width: 280px;
    overflow-y: scroll;
`;

export const Subtitle = styled.p`
    font-family: Nunito;
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 20px;
    color: #274B93;
    margin:0 0 5px;
    text-align:left;
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
        padding:0;
        margin:0;
        li {
            margin-bottom:0;
            a {
                padding: 6px 10px;
                margin: 0 10px;
                display:block;
                svg {
                    margin-right:10px;
                }
                &.selected {
                    border-radius: 4px;
                    color:#5987D7;
                    svg path {
                        fill:#426DD5;
                        stroke:#426DD5;
                    }
                }
            }
        }
    }
    &.sub {
        padding: 6px 0px 0px 26px;
    }
`;

export const ListItem = styled.li`
    font-size:12px;
    list-style:none;
    margin-bottom:12px;
    svg,a {
        display: inline-block;
        vertical-align: sub;
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
        line-height: 20px;
        color: #000000;
        letter-spacing:0.5px;
        &.main-style {
            font-weight: 800;
        }
        &.selected {
            background: rgba(168, 218, 220, 0.23);
            border-radius: 4px;
        }
    }
`;

export const Footer = styled.div `
    text-align:center;
    p {
        text-align: left;
        padding: 16px 10px 0;
        margin: 90px 10px 5px;
        &.links {
            margin:0 10px;
            padding-top:0;
        }
    }
    img {
        display:inline-block;
        vertical-align:middle;
        margin-left:5px;
        margin-right: -5px;
    }
    span {
        font-family: Nunito;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #8492A4;
        display:inline-block;
        vertical-align:middle;
        &.logo {
            font-family: Nunito;
            font-weight: 600;
            font-size: 8px;
            line-height: 16px;
            color: #242423;
        }
        a {
            color:#5CBCD4;
            text-decoration:none;
        }
    }
`

export const CryptoNomicLogo = styled.div `
    text-align:center;
    p {
        text-align: center;
        padding: 0px;
        margin: 0px 0px 20px;
        &.links {
            margin:0 10px;
            padding-top:0;
        }
    }
    img {
        display:inline-block;
        vertical-align:middle;
        margin-left:0px;
        margin-right: -5px;
    }
    span {
        font-family: 'Roboto';
        font-size: 10px;
        font-weight:300;
        line-height: 12px;
        color: #242F57;
        display:inline-block;
        vertical-align:middle;
        &.logo {
            font-family: Nunito;
            font-weight: 600;
            font-size: 8px;
            line-height: 16px;
            color: #242423;
            margin-left:-9px;
        }
        a {
            color:#5CBCD4;
            text-decoration:none;
        }
    }
`



