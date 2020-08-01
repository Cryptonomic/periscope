import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import {
    MainContainer,
} from './styles';

import { Props, States } from './types';

class AccountsComponent extends React.Component<Props, States> {

    render() {
        return (
            <MainContainer>
                Hello From accounts
            </MainContainer>
        );
    }
}

const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = (dispatch: any) => ({
});

export const Accounts: any = compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(AccountsComponent);
