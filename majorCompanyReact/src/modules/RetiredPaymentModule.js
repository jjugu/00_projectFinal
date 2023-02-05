import {createActions, handleActions} from 'redux-actions';

const initialState = [];

export const GET_ALL_RETIRED_MEMBERS     = 'retired/GET_ALL_RETIRED_MEMBERS';
export const POST_RETIRED_PAYMENT        = 'retired/POST_RETIRED_PAYMENT';
export const GET_RETIRED_MEMBER          = 'retired/GET_RETIRED_MEMBER';
export const POST_RETIRED_PAYMENT_OKAY   = 'retired/POST_RETIRED_PAYMENT_OKAY';
export const PUT_MEMBER_ENT              = 'retired/PUT_MEMBER_ENT';
export const PUT_MEMBER_ENT_BACK         = 'retired/PUT_MEMBER_ENT_BACK';

const actions = createActions({
    [GET_ALL_RETIRED_MEMBERS]: () => {},
    [POST_RETIRED_PAYMENT]: () => {},
    [GET_RETIRED_MEMBER]: () => {},
    [POST_RETIRED_PAYMENT_OKAY]: () => {},
    [PUT_MEMBER_ENT]: () => {},
    [PUT_MEMBER_ENT_BACK]: () => {}
});

const retiredMemberReducer = handleActions(
    {
        [GET_ALL_RETIRED_MEMBERS]: (state, { payload }) => {
            
            return payload;
        },
        [POST_RETIRED_PAYMENT]: (state, { payload }) => {
            
            return payload;
        },
        [GET_RETIRED_MEMBER]: (state, { payload }) => {
            
            return payload;
        },
        [POST_RETIRED_PAYMENT_OKAY]: (state, { payload }) => {
            
            return payload;
        },
        [PUT_MEMBER_ENT]: (state, { payload }) => {
            
            return payload;
        },
        [PUT_MEMBER_ENT_BACK]: (state, { payload }) => {
            
            return payload;
        }
    },
    initialState
);

export default retiredMemberReducer;






