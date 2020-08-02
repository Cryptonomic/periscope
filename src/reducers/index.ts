import { combineReducers } from 'redux';
import { message } from './message/reducers';
import { modal } from './modal/reducers';
import { accounts } from './accounts/reducers';

export interface RootState {
    accounts: any;
    message: any;
    modal: any;
}

export const rootReducer = combineReducers({
    accounts,
    message,
    modal,
});
