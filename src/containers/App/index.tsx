import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import {
    MainContainer,
} from './styles';

import { Props, States } from './types';

class Arronax extends React.Component<Props, States> {

    render() {
        return (
            <MainContainer>
                Hello From Periscope
            </MainContainer>
        );
    }
}

const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = (dispatch: any) => ({
});

export const ArronaxApp: any = compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Arronax);
