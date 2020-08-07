import { combineReducers } from 'redux';
import { message } from './message/reducers';
import { modal } from './modal/reducers';
import { accounts } from './accounts/reducers';
import { bakers } from './bakers/reducers';

export interface RootState {
    accounts: any;
    bakers: any;
    message: any;
    modal: any;
}

export const rootReducer = combineReducers({
    accounts,
    bakers,
    message,
    modal,
});
