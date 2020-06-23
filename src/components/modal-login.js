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
class modalogin extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            message: "",
            show: true,
            username: "",
            password: "",
        }
    }


    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }



    _handleConfirmLogin = async () => {
        let { username, password } = this.state
        if (!username && !password) {
            return this.setState({
                error: true,
                message: "Vui lòng điền đầy đủ thông tin"
            })
        }

        Axios({
            method: "POST",
            url: `${BASE_URL}/users/login/`,
            data: { username, password }
        }).then(res => {
            if (res.data.token) {
                localStorage.setItem("token", res.data.token)
                Axios({
                    method: "GET",
                    url: `${BASE_URL}/users/me/`,
                    headers: {
                        'Authorization': `Token ${res.data.token}`
                    }
                }).then(res => {
                    console.log(res.data);
                    Store.dispatch({
                        type: ActionType.LOGIN_SUCCESS,
                        payload: res.data
                    })
                    this.handleClose()
                    this.setState({
                        error: false,
                        message: "",
                        show: true,
                        username: '',
                        password: ""
                    })

                }).catch(err => {
                    console.log(err);

                })
            }

        }).catch(err => {
            this.setState({
                error: true,
                message: "Tên đăng nhập hoặc mật khẩu không đúng"
            })
        })

        //  else if (username !== "thanhan" || password !== "123123") {

        // let data = await handleApi(login({ username, password }));

        // console.log(data)




        // this.setState({
        //     error: true,
        //     message: "Tên đăng nhập hoặc mật khẩu không đúng"
        // })
        // }
        //  else {
        //     alert("Đăng nhập thành công")
        //     localStorage.setItem("token", "1e2g4b")
        //     Store.dispatch({
        //         type: ActionType.LOGIN_SUCCESS,
        //         payload: {
        //             fullname: "Lê Thành An",
        //             age: 21,
        //             job: "IT"
        //         }
        //     })
        //     this.handleClose()
        //     this.setState({
        //         error: false,
        //         message: "",
        //         show: true,
        //         username: '',
        //         password: ""
        //     })

        // }
    }

    handleClose = () => {
        Store.dispatch({
            type: ActionType.HIDE_MODAL_LOGIN,
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

    _handleForgotPass = () => {
        Store.dispatch({
            type: ActionType.SHOW_MODAL_FORGOT_PASS,
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
                <Modal show={this.props.isShowModalLogin} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Đăng nhập</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ padding: 40 }}>
                        {/* <form> */}
                        <div className="form-group">
                            <label htmlFor="">Tên tài khoản</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                onChange={this.handleOnChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Mật khẩu</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                onChange={this.handleOnChange}
                            />
                        </div>
                        {
                            this.state.error &&
                            <p>
                                <i style={{ color: "red", }}>
                                    {`*${this.state.message}`}
                                </i>
                            </p>
                        }
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                                onClick={this._handleForgotPass}
                                className="btn btn-outline" style={{ marginBottom: 10 }}>
                                Quên mật khẩu?
                            </button>
                        </div>
                        <div style={{
                            display: 'flex',
                        }}>



                            <button onClick={this._handleConfirmLogin} style={{ width: '100%', backgroundColor: '#dd003f', color: '#FFFFFF', height: 45, fontWeight: 'bold' }} className="btn">
                                Đăng nhập
                            </button>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                            }}>
                            </div>
                        </div>
                       
                        <button onClick={this._handleSignin} style={{marginTop:20, width: '100%', backgroundColor: '#3a5a9a', color: '#FFFFFF', height: 45, fontWeight: 'bold' }} className="btn">
                            Đăng kí
                        </button>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => ({
    isShowModalLogin: state.userReducer.isShowModalLogin
});


export default connect(mapStateToProps, null)(modalogin);