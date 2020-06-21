import * as ActionType from "./../constants/ActionType";

let initialState = {
    infoUser: {

    },
    isShowModalLogin: false,
    isShowModalSignin: false,
    isShowModalForgotPass: false,
    isShowModalProfile: false
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
                isShowModalLogin: false,
                isShowModalSignin: true
            }
        case ActionType.SHOW_MODAL_FORGOT_PASS:
            return {
                ...state,
                isShowModalLogin: false,
                isShowModalForgotPass: true
            }
        case ActionType.SHOW_MODAL_PROFILE:
            return {
                ...state,
                isShowModalProfile: true
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
        case ActionType.HIDE_MODAL_FORGOT_PASS:
            return {
                ...state,
                isShowModalForgotPass: false
            }
        case ActionType.HIDE_MODAL_PROFILE:
            return {
                ...state,
                isShowModalProfile: false
            }
        case ActionType.CHANGE_AVATAR:

            return {
                ...state,
                infoUser: { ...state.infoUser, avatar: action.payload }
            }
        default:
            return { ...state };
    }
};

export default userReducer;
