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
class modasignin extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            message: "",
            show: true,
        }
    }


    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    _handleConfirmSignin = () => {
        let { email, username, password, firstName, lastName } = this.state
        if (!email || !username || !password || !firstName || !lastName) {
            return this.setState({
                error: true,
                message: "Vui lòng điền đầy đủ thông tin"
            })
        }
        Axios({
            method: "POST",
            url: `${BASE_URL}/users/register/`,
            data: {
                email, username, password, firstName, lastName
            }
        }).then(res => {
            alert('Đăng kí thành công')
            Store.dispatch({
                type: ActionType.HIDE_MODAL_SIGNIN,
                payload: null
            })

        }).catch(err => {
            alert(' Đăng kí thất bại, vui lòng thử lại')

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
            console.log({ ...res });

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
            type: ActionType.HIDE_MODAL_SIGNIN,
            payload: null
        })
    }

    _handleSignin = () => {
        this.setState({
            isSignIn: true
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
                <Modal show={this.props.isShowModalSignin} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Đăng ki</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* <form> */}
                        <div className="form-group">
                            <label htmlFor="">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                onChange={this.handleOnChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                onChange={this.handleOnChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                onChange={this.handleOnChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="firstName"
                                onChange={this.handleOnChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="lastName"
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
                        <div style={{
                            display: 'flex',
                        }}>

                            <button onClick={this._handleConfirmSignin} style={{ backgroundColor: MAIN_COLOR, color: '#FFFFFF' }} className="btn">
                                Xác nhận
                                    </button>
                            {/* <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                            }}>
                                <p style={{ margin: 0, marginRight: 20 }}>Chưa có tài khoản?</p>
                                <button
                                    onClick={this._handleSignin}
                                    style={{ borderColor: MAIN_COLOR, borderWidth: 1 }} className="btn btn-outline">
                                    Đăng kí
                                    </button>
                            </div> */}
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => ({
    isShowModalSignin: state.userReducer.isShowModalSignin
});


export default connect(mapStateToProps, null)(modasignin);