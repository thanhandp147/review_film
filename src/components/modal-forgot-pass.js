import React, { Component } from 'react';
import { MAIN_COLOR } from '../constants/color';
import Store from '../redux/store'
import * as ActionType from "../redux/constants/ActionType";
import { Modal, Button } from 'react-bootstrap'
import { connect } from 'react-redux'

import { login } from '../../src/services/api'
import { handleApi } from '../services/utils';
import Axios from "axios";
import { BASE_URL } from '../constants/url';
class modalForgotPass extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            message: "",
            show: true,
            username: "",
            password: "",
            email: ''
        }
    }


    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }



    _handleConfirmEmailToSend = async () => {
        let { email } = this.state
        if (!email) {
            return this.setState({
                error: true,
                message: "Vui lòng điền đầy đủ thông tin"
            })
        }

        this.setState({
            isFetching: true
        })

        Axios({
            method: "POST",
            url: `${BASE_URL}/users/send-recovery-code/`,
            data: { email }
        }).then(res => {
            console.log({ ...res });
            if (res.data.message == "Message has been sent") {
                alert(`Kiểm tra email: ${this.state.email} để lấy mã code`)
                this.setState({
                    isShowInputForNewPassword: true,
                    isFetching: false
                })
            }


        }).catch(err => {
            this.setState({
                error: true,
                message: "Tên đăng nhập hoặc mật khẩu không đúng",
                isFetching: false
            })
        })
    }
    _handleConfirmNewPassword = async () => {
        let { email, code, password } = this.state
        if (!email || !code || !password) {
            return this.setState({
                error: true,
                message: "Vui lòng điền đầy đủ thông tin"
            })
        }

        Axios({
            method: "POST",
            url: `${BASE_URL}/users/forgot-password/`,
            data: { code, password, email }
        }).then(res => {
            console.log({ ...res });
            if (res.data.message == "Change password success") {
                alert('Đổi mật khẩu thành công')
                Store.dispatch({
                    type: ActionType.HIDE_MODAL_FORGOT_PASS,
                    payload: null
                })
                Store.dispatch({
                    type: ActionType.SHOW_MODAL_LOGIN,
                    payload: null
                })
            }

        }).catch(err => {
            this.setState({
                error: true,
                message: "Tên đăng nhập hoặc mật khẩu không đúng",
                isFetching: false
            })
        })
    }

    handleClose = () => {
        Store.dispatch({
            type: ActionType.HIDE_MODAL_FORGOT_PASS,
            payload: null
        })
    }

    _handleSignin = () => {
        // Store.dispatch({
        //     type: ActionType.HIDE_MODAL_LOGIN,
        //     payload: null
        // })
        Store.dispatch({
            type: ActionType.SHOW_MODAL_SIGNIN,
            payload: null
        })
    }

    render() {
        return (
            // <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            //     <div className="modal-dialog" role="document">
            //         <div className="modal-content">
            //             <div className="modal-header">
            //                 <h5 className="modal-title" id="exampleModalLabel">Đăng nhập</h5>
            //                 <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            //                     <span aria-hidden="true">×</span>
            //                 </button>
            //             </div>
            //             <div className="modal-body">
            //                 {/* <form> */}
            //                 <div className="form-group">
            //                     <label htmlFor="">Tên tài khoản</label>
            //                     <input
            //                         type="text"
            //                         className="form-control"
            //                         name="username"
            //                         onChange={this.handleOnChange}
            //                     />
            //                 </div>
            //                 <div className="form-group">
            //                     <label htmlFor="">Mật khẩu</label>
            //                     <input
            //                         type="text"
            //                         className="form-control"
            //                         name="password"
            //                         onChange={this.handleOnChange}
            //                     />
            //                 </div>
            //                 {
            //                     this.state.error &&
            //                     <p>
            //                         <i style={{ color: "red", }}>
            //                             {`*${this.state.message}`}
            //                         </i>
            //                     </p>
            //                 }
            //                 <div style={{
            //                     display: 'flex',
            //                 }}>

            //                     <button onClick={this._handleConfirmLogin} style={{ backgroundColor: MAIN_COLOR, color: '#FFFFFF' }} className="btn">
            //                         Đăng nhập
            //                         </button>

            //                     <div style={{
            //                         display: 'flex',
            //                         justifyContent: 'center',
            //                         alignItems: 'center',
            //                         flex: 1,
            //                     }}>
            //                         <p style={{ margin: 0, marginRight: 20 }}>Chưa có tài khoản?</p>
            //                         <button style={{ borderColor: MAIN_COLOR, borderWidth: 1 }} className="btn btn-outline">
            //                             Đăng kí
            //                         </button>
            //                     </div>
            //                 </div>

            //             </div>
            //         </div>
            //     </div>
            // </div>
            <>
                <Modal show={this.props.isShowModalForgotPass} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Quên mật khẩu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ padding: 40 }}>
                        {/* <form> */}
                        <div className="form-group">
                            <label htmlFor="">Nhập địa chỉ Email vào bên dưới</label>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                onChange={this.handleOnChange}
                            />
                        </div>
                        {
                            this.state.isShowInputForNewPassword &&
                            <>
                                <div className="form-group">
                                    <label htmlFor="">Nhập Mã code</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="code"
                                        onChange={this.handleOnChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="">Nhập mật khẩu mới</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="password"
                                        onChange={this.handleOnChange}
                                    />
                                </div>
                            </>
                        }
                        {
                            this.state.error &&
                            <p>
                                <i style={{ color: "red", }}>
                                    {`*${this.state.message}`}
                                </i>
                            </p>
                        }
                        {
                            this.state.isShowInputForNewPassword ?
                                <button onClick={this._handleConfirmNewPassword} style={{ width: '100%', backgroundColor: '#3a5a9a', color: '#FFFFFF', height: 45, fontWeight: 'bold' }} className="btn">
                                    Xác nhận
                                </button>
                                :
                                <button onClick={this._handleConfirmEmailToSend} style={{ width: '100%', backgroundColor: '#3a5a9a', color: '#FFFFFF', height: 45, fontWeight: 'bold' }} className="btn">
                                    {
                                        this.state.isFetching ?
                                            `Vui lòng chờ`
                                            :
                                            `Gửi`
                                    }

                                </button>
                        }


                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => ({
    isShowModalForgotPass: state.userReducer.isShowModalForgotPass
});


export default connect(mapStateToProps, null)(modalForgotPass);