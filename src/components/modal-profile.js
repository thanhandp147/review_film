import React, { Component } from 'react';
import { MAIN_COLOR } from '../constants/color';
import Store from '../redux/store'
import * as ActionType from "../redux/constants/ActionType";
import { Modal, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { NavLink, Link } from "react-router-dom";

import { login } from '../../src/services/api'
import { handleApi } from '../services/utils';
import Axios from "axios";
import { BASE_URL, BASE_URL_AVATAR } from '../constants/url';

class modalProfile extends Component {
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



    handleClose = () => {
        Store.dispatch({
            type: ActionType.HIDE_MODAL_PROFILE,
            payload: null
        })
    }

    _handleChangeFile = e => {

        this.setState({
            avatar: e.target.files[0]
        }, () => {
            let tokenStorage = localStorage.getItem('token')
            let bodyFormData = new FormData();
            bodyFormData.append('avatar', this.state.avatar)
            Axios({
                method: "POST",
                url: `${BASE_URL}/users/upload-avatar/`,
                data: bodyFormData,
                headers: {
                    'Authorization': `Token ${tokenStorage}`,
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                Store.dispatch({
                    type: ActionType.CHANGE_AVATAR,
                    payload: res.data.avatar
                })

            }).catch(err => {
                console.log({ ...err });
            })
        })
    }
    _handleSubmit = e => {
        e.preventDefault();
        alert('alo')
        // const { avatar } = this.state
        // const { _updateAvatar } = this.props
        // _updateAvatar(avatar);
    }



    render() {
        return (
            <>
                <Modal show={this.props.isShowModalProfile} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Profile</Modal.Title>
                    </Modal.Header>
                    <div style={{
                        width: '100%',
                        paddingBottom: 30,
                        backgroundColor: '#e4eaf1'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}>

                            <img
                                style={{
                                    width: 150,
                                    height: 150,
                                    borderRadius: 150 / 2,
                                    alignSelf: 'center',
                                    marginTop: 20,
                                    marginBottom: 30,
                                    objectFit: 'cover'
                                }}
                                src={
                                    this.props.infoUser.avatar ?
                                        `${BASE_URL_AVATAR}/${this.props.infoUser.avatar.replace('"', '').replace('"', '')}`
                                        :
                                        "https://img.thehobbyblogger.com/2012/08/custom-avatar.png"
                                } alt="" />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {/* <img onClick={() => { this.upload.click() }} style={{ width: 200, height: 200, borderRadius:100 }} className="avatar" src={photoURL} alt="avatar" /> */}
                            <div onClick={() => { this.upload.click() }} >

                            </div>
                        </div>

                        <input ref={(ref) => this.upload = ref} style={{ display: "none" }} type="file" name="avatar" id="avatar"
                            onChange={e => this._handleChangeFile(e)}
                        />



                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <button
                                onClick={() => { this.upload.click() }}
                                // onClick={e => this._handleSubmit(e)}
                                name="submit" type="button"
                                style={{ marginBottom: 30, width: '80%', backgroundColor: '#dd003f', color: '#FFFFFF', height: 45, fontWeight: 'bold' }} className="btn">
                                Đổi ảnh đại diện
                            </button>
                        </div>

                        <Link
                            onClick={this.handleClose}
                            to={`/info-user/${this.props.infoUser.id}`}>
                            <p style={{
                                fontSize: 26,
                                marginLeft: 45,
                                fontWeight: '500',
                                color: '#395180'
                            }}>
                                {`${this.props.infoUser.first_name} ${this.props.infoUser.last_name} `}
                            </p>
                        </Link>

                        <div style={{ display: 'flex' }}>
                            <p style={{
                                fontSize: 26,
                                marginLeft: 45,
                                fontWeight: '500',
                                color: '#395180'
                            }}>
                                {`Tổng số bài Review: `}
                            </p>
                            <p style={{
                                fontSize: 26,
                                fontWeight: '500',
                                color: '#dd003f',
                                marginLeft: 5
                            }}>{this.props.infoUser.numberPost}</p>
                        </div>

                        <div style={{ display: 'flex' }}>
                            <p style={{
                                fontSize: 26,
                                marginLeft: 45,
                                fontWeight: '500',
                                color: '#395180'
                            }}>
                                {`Tổng số lượt like: `}
                            </p>
                            <p style={{
                                fontSize: 26,
                                fontWeight: '500',
                                color: '#dd003f',
                                marginLeft: 5
                            }}>{this.props.infoUser.numberLike}</p>
                        </div>


                    </div>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => ({
    isShowModalProfile: state.userReducer.isShowModalProfile,
    infoUser: state.userReducer.infoUser
});


export default connect(mapStateToProps, null)(modalProfile);