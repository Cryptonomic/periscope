import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Props } from './types';
import { getErrorState, getMessageTxt } from '../../reducers/message/selectors';
import { clearMessageAction } from '../../reducers/message/actions';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
    DismissButton,
    DialogContentWrapper,
} from './styles';


class ErrorDialogComponent extends React.Component<Props> {

    handleErrorClose = () => {
        const { initMessage } = this.props;
        initMessage();
    };
    
    render() {
        return (
            <Dialog open={this.props.isError} onClose={this.handleErrorClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Error</DialogTitle>
                <DialogContentWrapper>
                    <DialogContentText id="alert-dialog-description">{this.props.message}</DialogContentText>
                </DialogContentWrapper>
                <DialogActions>
                    <DismissButton onClick={this.handleErrorClose}>Dismiss</DismissButton>
                </DialogActions>
            </Dialog>
        )
    }

}


const mapStateToProps = (state: any) => ({
    
    isError: getErrorState(state),
    message: getMessageTxt(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    initMessage: () => dispatch(clearMessageAction()),
});


export const ErrorDialog: any = compose(connect(mapStateToProps, mapDispatchToProps))(ErrorDialogComponent);