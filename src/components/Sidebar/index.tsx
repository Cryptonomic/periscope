import React from 'react';
import {
    Title,
    Holder,
    Subtitle,
    List,
    ListItem,
    Footer
} from './styles';
import Logo from '../../assets/images/logo.svg';
import { NavLink } from 'react-router-dom';

interface Props {
    // types goes here
}

const Sidebar: React.FC<Props> = props => {
    return (
        <div>
            <Holder>
                <Title>PERISCOPE</Title>
                <Subtitle>All Tezos Blockchain data at your fingertips</Subtitle>
                <List className="head selected">
                    <ListItem>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.819336 2.79316V13.3628C0.819336 14.1933 2.79382 15.3918 4.68271 16.2376L9.31933 17.75L14.0086 16.2376C16.5313 15.0627 17.8193 14.1933 17.8193 13.3628V2.79316C17.8193 1.96269 16.9693 1.28321 15.9304 1.28321L9.31933 0.25L2.70822 1.28321C1.65989 1.28321 0.819336 1.96269 0.819336 2.79316ZM12.1527 5.81307C12.1527 7.06633 10.8871 8.078 9.31933 8.078C7.75156 8.078 6.486 7.06633 6.486 5.81307C6.486 4.55981 7.75156 3.54814 9.31933 3.54814C10.8871 3.54814 12.1527 4.55981 12.1527 5.81307ZM3.65267 11.8529C3.65267 10.3429 7.43045 9.51245 9.31933 9.51245C11.2082 9.51245 14.986 10.3429 14.986 11.8529V12.6079H3.65267V11.8529Z" fill="#426DD5"/>
                    </svg>
                   <NavLink activeClassName="selected" className="main-style" to="/">Accounts</NavLink>
                    </ListItem>
                </List>
                <List className="sub">
                    <ListItem>
                        <a href="#">Top Accounts by Balance</a>
                    </ListItem>
                </List>
                <List className="head">
                    <ListItem>
                        <svg width="18" height="18" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.0487 2.5009C13.08 2.5518 13.1053 2.59754 13.1255 2.63658C13.2029 2.60717 13.3106 2.57074 13.4434 2.53679C13.7259 2.46457 14.1244 2.40308 14.589 2.44587C15.5259 2.53216 16.7072 3.04032 17.7405 4.6732C18.2639 5.5003 18.3989 6.28836 18.2991 7.0045C18.1998 7.71691 17.8697 8.3467 17.4814 8.86598C17.0928 9.38559 16.641 9.80105 16.2878 10.086C16.1109 10.2287 15.9579 10.3393 15.8488 10.4145C15.8072 10.4431 15.772 10.4666 15.7442 10.4848V18H4.01472V10.4866C3.98686 10.4691 3.9518 10.4467 3.91056 10.4194C3.80005 10.3464 3.64499 10.2387 3.46519 10.0993C3.10621 9.82083 2.64549 9.4133 2.24411 8.89915C1.84296 8.3853 1.49634 7.75883 1.37533 7.0434C1.25372 6.32444 1.36192 5.52635 1.85382 4.67819C2.82712 2.99997 4.02139 2.49052 4.98512 2.41501C5.46254 2.3776 5.87721 2.44706 6.17242 2.52565C6.32022 2.565 6.43871 2.6068 6.52095 2.63911C6.54869 2.59247 6.58612 2.53527 6.63223 2.46992C6.75405 2.29729 6.94334 2.06954 7.2153 1.84487C7.76155 1.39359 8.6344 0.960704 9.94479 1.00285C11.2503 1.04483 12.0613 1.47656 12.5479 1.90985C12.79 2.12548 12.9493 2.33931 13.0487 2.5009Z" fill="#8492A4"/>
                            <path d="M15.4468 10.3164L15.5194 10.2723L15.5212 10.2712L15.5241 10.2693C15.5241 10.2693 15.5271 10.2675 15.5289 10.2664C15.536 10.262 15.5466 10.2552 15.5606 10.2462C15.5885 10.2282 15.6296 10.2011 15.6816 10.1654C15.7855 10.0938 15.9323 9.98765 16.1025 9.85032C16.4437 9.57513 16.8755 9.17727 17.2444 8.68407C17.6134 8.19054 17.9146 7.60803 18.0046 6.96237C18.0941 6.32042 17.9767 5.60461 17.4902 4.83578C16.5036 3.27678 15.4026 2.82329 14.5621 2.74589C14.138 2.70683 13.7739 2.763 13.5162 2.82889C13.3874 2.8618 13.2857 2.897 13.2169 2.92362C13.1826 2.93691 13.1565 2.94804 13.1394 2.95562C13.1309 2.95942 13.1247 2.96232 13.1208 2.96416C13.1188 2.96508 13.1161 2.9664 13.1161 2.9664L12.9669 3.04078L12.9106 2.88207L12.9101 2.88068L12.9093 2.8785C12.9085 2.87655 12.9075 2.87391 12.9061 2.87063C12.9023 2.86116 12.896 2.84631 12.8869 2.82681C12.8687 2.78779 12.8393 2.73028 12.7962 2.66017C12.71 2.51996 12.5689 2.32969 12.3515 2.13611C11.919 1.75097 11.1748 1.34381 9.93535 1.30395C8.70079 1.26424 7.8972 1.67025 7.40325 2.07833C7.1551 2.28333 6.98335 2.49037 6.87416 2.64511C6.81959 2.72244 6.78078 2.78652 6.75597 2.83048C6.74357 2.85246 6.73468 2.86938 6.72909 2.88038C6.7263 2.88587 6.72433 2.88989 6.72316 2.89231L6.72202 2.8947L6.65789 3.03436L6.52084 2.96599C6.52084 2.96599 6.51847 2.96484 6.51634 2.96383C6.51209 2.96181 6.50533 2.95866 6.49618 2.95456C6.47787 2.94636 6.45 2.93435 6.41342 2.91998C6.34023 2.89123 6.23244 2.85311 6.09683 2.81701C5.82523 2.7447 5.44461 2.68116 5.00806 2.71537C4.14386 2.78308 3.03555 3.23529 2.11023 4.83079C1.65282 5.61949 1.55904 6.34573 1.66844 6.99252C1.77844 7.64285 2.09584 8.22356 2.47737 8.71229C2.85866 9.20071 3.29928 9.59116 3.64597 9.86006C3.81901 9.99426 3.96786 10.0976 4.07307 10.1671C4.12565 10.2019 4.16728 10.2282 4.19551 10.2456C4.20962 10.2543 4.22037 10.2609 4.22747 10.2651C4.23102 10.2672 4.23533 10.2698 4.23533 10.2698L4.23752 10.2711L4.31211 10.3145M13.1255 2.63658C13.1053 2.59754 13.08 2.5518 13.0487 2.5009C12.9493 2.33931 12.79 2.12548 12.5479 1.90985C12.0613 1.47656 11.2503 1.04483 9.94479 1.00285C8.6344 0.960704 7.76155 1.39359 7.2153 1.84487C6.94334 2.06954 6.75405 2.29729 6.63223 2.46992C6.58612 2.53527 6.54869 2.59247 6.52095 2.63911C6.43871 2.6068 6.32022 2.565 6.17242 2.52565C5.87722 2.44706 5.46254 2.3776 4.98512 2.41501C4.02139 2.49052 2.82712 2.99997 1.85382 4.67819C1.36192 5.52635 1.25372 6.32444 1.37533 7.0434C1.49634 7.75883 1.84296 8.3853 2.24411 8.89915C2.64549 9.4133 3.10621 9.82083 3.46519 10.0993C3.64499 10.2387 3.80005 10.3464 3.91056 10.4194C3.9518 10.4467 3.98686 10.4691 4.01472 10.4866V18H15.7442V10.4848C15.772 10.4666 15.8072 10.4431 15.8488 10.4145C15.9579 10.3393 16.1109 10.2287 16.2878 10.086C16.641 9.80105 17.0928 9.38559 17.4814 8.86598C17.8697 8.3467 18.1998 7.71691 18.2991 7.0045C18.3989 6.28836 18.2639 5.5003 17.7405 4.6732C16.7072 3.04032 15.5259 2.53216 14.589 2.44587C14.1244 2.40308 13.7259 2.46457 13.4434 2.53679C13.3106 2.57074 13.2029 2.60717 13.1255 2.63658Z" stroke="#8492A4"/>
                        </svg>
                        <NavLink activeClassName="selected" className="main-style" to="/bakers">Bakers</NavLink>
                    </ListItem>
                </List>
                <List className="sub">
                    <ListItem>
                        <a href="#">Top Bakers by Stake</a>
                    </ListItem>
                    <ListItem>
                        <a href="#">Top Bakers by Block</a>
                    </ListItem>
                    <ListItem>
                        <a href="#">Top Bakers by Delegations</a>
                    </ListItem>
                </List>
                <List className="head">
                    <ListItem>
                        <svg width="17" height="17" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.04541 18H12.3456C12.8979 18 13.3456 17.5523 13.3456 17V3.69995C13.3456 3.42351 13.2311 3.1594 13.0294 2.97035L11.2158 1.2704C11.0305 1.09668 10.786 1 10.532 1H1.04541C0.493125 1 0.0454102 1.44772 0.0454102 2V17C0.0454102 17.5523 0.493125 18 1.04541 18Z" fill="#8492A4"/>
                            <path d="M10.9248 3.25393V1.10889C10.9248 1.10889 11.0954 1.15726 11.192 1.24792C11.914 1.92568 12.9507 2.84855 13.0683 3.00666C13.22 3.21066 13.2332 3.25393 13.2332 3.25393H10.9248Z" stroke="white" stroke-width="0.3"/>
                            <line y1="-0.5" x2="8.58312" y2="-0.5" transform="matrix(0.999982 -0.00600035 0.00682947 0.999977 2.3418 6.47412)" stroke="white"/>
                            <line y1="-0.5" x2="8.58312" y2="-0.5" transform="matrix(0.999982 -0.00600035 0.00682947 0.999977 2.3418 10.0806)" stroke="white"/>
                            <line y1="-0.5" x2="8.58312" y2="-0.5" transform="matrix(0.999982 -0.00600035 0.00682947 0.999977 2.3418 13.6875)" stroke="white"/>
                            <path d="M15.0955 13.3332H14.8039V12.7498C14.8039 11.9448 14.1505 11.2915 13.3455 11.2915C12.5405 11.2915 11.8872 11.9448 11.8872 12.7498V13.3332H11.5955C11.2747 13.3332 11.0122 13.5957 11.0122 13.9165V16.8332C11.0122 17.154 11.2747 17.4165 11.5955 17.4165H15.0955C15.4164 17.4165 15.6789 17.154 15.6789 16.8332V13.9165C15.6789 13.5957 15.4164 13.3332 15.0955 13.3332ZM13.3455 15.9582C13.0247 15.9582 12.7622 15.6957 12.7622 15.3748C12.7622 15.054 13.0247 14.7915 13.3455 14.7915C13.6664 14.7915 13.9289 15.054 13.9289 15.3748C13.9289 15.6957 13.6664 15.9582 13.3455 15.9582ZM14.2497 13.3332H12.4414V12.7498C12.4414 12.2511 12.8468 11.8457 13.3455 11.8457C13.8443 11.8457 14.2497 12.2511 14.2497 12.7498V13.3332Z" fill="#3D4857"/>
                        </svg>
                        <a className="main-style" href="#">Contracts</a>
                    </ListItem>
                </List>
                <List className="sub">
                    <ListItem>
                        <a href="#">Top Contracts by Balance</a>
                    </ListItem>
                    <ListItem>
                        <a href="#">Top Contracts by Invocation</a>
                    </ListItem>
                </List>
                <List className="head">
                    <ListItem>
                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.32 8.81056C10.32 8.46603 10.5499 8.15412 10.9058 8.01573L17.5334 5.4389C18.1804 5.18736 18.9058 5.60749 18.9058 6.23374V13.7449C18.9058 14.0759 18.6934 14.378 18.3584 14.5239L11.7307 17.41C11.0802 17.6933 10.32 17.2735 10.32 16.631V8.81056Z" fill="#8492A4"/>
                        <path d="M9.49154 8.81056C9.49154 8.46603 9.26164 8.15412 8.90571 8.01573L2.2781 5.4389C1.63114 5.18736 0.905762 5.60749 0.905762 6.23374V13.7449C0.905762 14.0759 1.11807 14.378 1.45316 14.5239L8.08078 17.41C8.73134 17.6933 9.49154 17.2735 9.49154 16.631V8.81056Z" fill="#8492A4"/>
                        <path d="M9.61072 0.562749C9.83449 0.479249 10.0868 0.479078 10.3107 0.562272L17.5867 3.26556C18.316 3.53654 18.3288 4.44851 17.6073 4.73543L10.3313 7.62875C10.0955 7.7225 9.82576 7.72231 9.59016 7.62822L2.34536 4.73489C1.62559 4.44743 1.63835 3.53752 2.36597 3.26602L9.61072 0.562749Z" fill="#8492A4"/>
                    </svg>

                        <a className="main-style" href="#">Blocks</a>
                    </ListItem>
                </List>
                <List className="sub">
                    <ListItem>
                        <a href="#">Blocks per Hour</a>
                    </ListItem>
                    <ListItem>
                        <a href="#">Priority Zero Blocks per Hour</a>
                    </ListItem>
                    <ListItem>
                        <a href="#">Endorsements per Hour</a>
                    </ListItem>
                </List>
                <List className="head">
                    <ListItem>
                        <svg width="18" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.5703 11.3358C16.6063 11.0358 16.6303 10.7238 16.6303 10.3998C16.6303 10.0758 16.6063 9.76381 16.5583 9.46381L18.5863 7.87981C18.7663 7.73581 18.8143 7.4718 18.7063 7.2678L16.7863 3.9438C16.6663 3.7278 16.4143 3.6558 16.1983 3.7278L13.8103 4.6878C13.3063 4.3038 12.7783 3.9918 12.1903 3.7518L11.8303 1.2078C11.7943 0.967805 11.5903 0.799805 11.3503 0.799805H7.51028C7.27028 0.799805 7.07828 0.967805 7.04228 1.2078L6.68228 3.7518C6.09428 3.9918 5.55428 4.3158 5.06228 4.6878L2.67428 3.7278C2.45828 3.6438 2.20628 3.7278 2.08628 3.9438L0.166282 7.2678C0.0462824 7.4838 0.0942826 7.73581 0.286283 7.87981L2.31428 9.46381C2.26628 9.76381 2.23028 10.0878 2.23028 10.3998C2.23028 10.7118 2.25428 11.0358 2.30228 11.3358L0.274282 12.9198C0.0942823 13.0638 0.0462824 13.3278 0.154282 13.5318L2.07428 16.8558C2.19428 17.0718 2.44628 17.1438 2.66228 17.0718L5.05028 16.1118C5.55428 16.4958 6.08228 16.8078 6.67028 17.0478L7.03028 19.5918C7.07828 19.8318 7.27028 19.9998 7.51028 19.9998H11.3503C11.5903 19.9998 11.7943 19.8318 11.8183 19.5918L12.1783 17.0478C12.7663 16.8078 13.3063 16.4838 13.7983 16.1118L16.1863 17.0718C16.4023 17.1558 16.6543 17.0718 16.7743 16.8558L18.6943 13.5318C18.8143 13.3158 18.7663 13.0638 18.5743 12.9198L16.5703 11.3358ZM9.43028 13.9998C7.45028 13.9998 5.83028 12.3798 5.83028 10.3998C5.83028 8.41981 7.45028 6.7998 9.43028 6.7998C11.4103 6.7998 13.0303 8.41981 13.0303 10.3998C13.0303 12.3798 11.4103 13.9998 9.43028 13.9998Z" fill="#8492A4"/>
                        </svg>
                        <a className="main-style" href="#">Operations</a>
                    </ListItem>
                </List>
                <List className="sub">
                    <ListItem>
                        <a href="#">Transactions per Hour</a>
                    </ListItem>
                    <ListItem>
                        <a href="#">Transaction volume per Hour</a>
                    </ListItem>
                    <ListItem>
                        <a href="#">Gas Consumed per Hour</a>
                    </ListItem>
                    <ListItem>
                        <a href="#">Fees paid per Hour</a>
                    </ListItem>
                    <ListItem>
                        <a href="#">Activiations per Day</a>
                    </ListItem>
                    <ListItem>
                        <a href="#">Originations per Day</a>
                    </ListItem>
                </List>
                <Footer>
                    <p>
                        <span>A product of </span>
                        <img src={Logo} alt="img"/>
                        <span className="logo">CRYPTONOMIC</span>
                    </p>
                    <p className="links">
                        <span>Powered by <a href="#">Arronax</a>, <a href="#">Conseil</a> and  <a href="#">Nautilus Cloud</a></span>
                    </p>
                </Footer>
            </Holder>
        </div>
    )
}

export default Sidebar;