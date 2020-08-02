import { combineReducers } from 'redux';
import { message } from './message/reducers';
import { modal } from './modal/reducers';
import { app } from './app/reducers';
import { accounts } from './accounts/reducers';

export interface RootState {
    accounts: any;
    app: any;
    message: any;
    modal: any;
}

export const rootReducer = combineReducers({
    accounts,
    app,
    message,
    modal,
});
