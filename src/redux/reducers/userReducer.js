import * as ActionType from "./../constants/ActionType";

let initialState = {
    infoUser: {

    },
    isShowModalLogin: false,
    isShowModalSignin:false
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.LOGIN_SUCCESS:
            return {
                ...state,
                infoUser: action.payload
            }
        case ActionType.REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                infoUser: action.payload
            }
        case ActionType.LOG_OUT:
            return {
                ...state,
                infoUser: initialState.infoUser
            }
        case ActionType.SHOW_MODAL_LOGIN:
            return {
                ...state,
                isShowModalLogin: true
            }
        case ActionType.SHOW_MODAL_SIGNIN:
            return {
                ...state,
                isShowModalLogin:false,
                isShowModalSignin: true
            }
        case ActionType.HIDE_MODAL_LOGIN:
            return {
                ...state,
                isShowModalLogin: false
            }
        case ActionType.HIDE_MODAL_SIGNIN:
            return {
                ...state,
                isShowModalSignin: false
            }
        default:
            return { ...state };
    }
};

export default userReducer;
