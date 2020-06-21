import React, { Component } from 'react';
// import { Container, Hidden } from '@material-ui/core';
import { MAIN_COLOR } from '../../constants/color'
import { NavLink, Link } from "react-router-dom";

import { FaThumbsUp, FaStar, FaRegThumbsDown, FaRegCommentDots, FaRegUserCircle } from 'react-icons/fa';
import Axios from 'axios';
import { BASE_URL, BASE_URL_AVATAR } from '../../constants/url'
import Carousel from 'react-bootstrap/Carousel'
import BackGround from '../../image/ft-bg.jpg'
import BackGroundSlider from '../../image/slider-bg.jpg'
import { _substringMaxValue } from '../../constants/utils'
import { connect } from 'react-redux'
import moment from 'moment'
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';

class InfoUser extends Component {

    constructor() {
        super();
        this.state = {
            dataUser: null
        }
    }

    componentDidMount() {
        let tokenStorage = localStorage.getItem('token')

        let Authorization
        if (tokenStorage) {
            Authorization = `Token ${tokenStorage}`
        } else {
            Authorization = null
        }



        Axios({
            method: "GET",
            url: `${BASE_URL}/posts/posts-by-user/${this.props.match.params.id}`,
            headers: {
                'Authorization': Authorization,
            }
        }).then(res => {
            console.log({...res});
            
            this.setState({
                dataUser: res.data.data
            }, () => {
                console.log(this.state.dataUser);

            })

        })
    }



    render() {
        let { dataUser } = this.state
        return (
            <>
                <div style={{ marginTop: 50 }} />
                {/* <div style={{ backgroundImage: `url(${BackGroundSlider})`, height: 700, padding: 200 }}>


                </div> */}

                <div style={{ backgroundColor: '#020d18', paddingBottom: 100 }}>
                    <div style={{ height: 70 }}></div>
                    <div className="container">
                        <div className="row">

                            <div className="col-4">

                                <p
                                    style={{
                                        color: '#FFF',
                                        fontSize: 20,
                                        fontWeight: "500"
                                    }}>
                                    SPOTLIGHT CELEBRITIES
                                </p>
                                <div style={{
                                    width: '80%',
                                    height: 1,
                                    backgroundColor: '#828282',
                                    marginBottom: 50
                                }} />
                                <div style={{
                                    width: '80%',
                                    height: 400,
                                    backgroundColor: 'grey',
                                    borderRadius: 10,
                                    overflow: 'hidden'
                                }}>
                                    <img
                                        style={{
                                            width: "100%",
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                        src={
                                            dataUser && dataUser.inforUser && dataUser.inforUser.avatar ?
                                                `${BASE_URL_AVATAR}/${dataUser.inforUser.avatar.replace('"', '').replace('"', '')}`
                                                :
                                                "https://img.thehobbyblogger.com/2012/08/custom-avatar.png"
                                        } alt="" />
                                </div>
                                <p style={{
                                    marginTop: 30,
                                    fontSize: 23,
                                    fontWeight: '500',
                                    color: '#395180'
                                }}>
                                    {
                                        dataUser ?
                                            `${dataUser.inforUser.firstName} ${dataUser.inforUser.lastName}`
                                            :
                                            ` `
                                    }
                                </p>
                                <div style={{ display: 'flex' }}>
                                    <p style={{
                                        fontSize: 23,
                                        fontWeight: '500',
                                        color: '#395180'
                                    }}>
                                        {`Tổng số bài Review: `}
                                    </p>
                                    <p style={{
                                        fontSize: 23,
                                        fontWeight: '500',
                                        color: '#dd003f',
                                        marginLeft: 5
                                    }}>{
                                            dataUser &&
                                            dataUser.inforUser.numberPost
                                        }</p>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <p style={{
                                        fontSize: 23,
                                        fontWeight: '500',
                                        color: '#395180'
                                    }}>
                                        {`Tổng số lượt like: `}
                                    </p>
                                    <p style={{
                                        fontSize: 23,
                                        fontWeight: '500',
                                        color: '#dd003f',
                                        marginLeft: 5
                                    }}>{
                                            dataUser &&
                                            dataUser.inforUser.numberLike
                                        }</p>
                                </div>

                            </div>

                            <div style={styles.backgroundColor} className="col-8">
                                <div style={{ height: 80 }} />
                                {
                                    dataUser?.listPost.length > 0 &&
                                    dataUser.listPost.map(item => {
                                        return (
                                            <ItemPost
                                                key={item.id}
                                                nameFilm={item.nameFilm}
                                                title={item.title}
                                                createdAt={item.createdAt}
                                                picture={item.picture}
                                                id={item.id}
                                            />
                                        )
                                    })
                                }
                            </div>


                        </div>
                    </div>

                </div>

                {/* <div>

          <img src={require('../../image/ft-bg.jpg')} alt=""/>
          <p style={{fontSize:20, color:'#fff'}}>KKKKKKKK</p>
        </div> */}
                <div style={{ backgroundImage: `url(${BackGround})`, height: 300 }}>
                    <img src="https://boostifythemes.com/demo/html/bustter/images/logo1.png" alt="" />
                </div>
            </>
        );
    }
}

const styles = {
    backgroundColor: {
        backgroundColor: 'transparent',
    },
}

class ItemPost extends Component {
    render() {

        return (
            <div style={{ marginBottom: 20, width: '100%', height: 180, backgroundColor: 'grey', borderRadius: 10, display: 'flex', backgroundColor: '#07182a' }}>
                <div style={{
                    width: 200,
                    height: '100%',
                    backgroundColor: '#828282',
                    borderRadius: 10,
                    overflow: 'hidden'
                }}>
                    <img
                        style={{
                            width: "100%",
                            height: '100%',
                            objectFit: 'cover'
                        }}
                        src={
                            `${BASE_URL_AVATAR}/${this.props.picture.replace('"', '').replace('"', '')}`
                        } alt="" />
                </div>
                <div style={{ flex: 1, padding: 15 }}>
                    <Link
                        to={`/info-post/${this.props.id}`}>
                        <p style={{ fontSize: 18, color: '#4280bf', fontWeight: 'bold' }}>{this.props.nameFilm}</p>
                    </Link>
                    <p style={{ fontSize: 12, color: '#abb7c4', fontWeight: '300' }}>
                        {
                            moment(this.props.createdAt).format('L')
                        }
                    </p>
                    <p style={{ fontSize: 14, color: '#abb7c4', fontWeight: '300' }}>
                        {_substringMaxValue(this.props.title, " ", 200)}
                    </p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isShowModalProfile: state.userReducer.isShowModalProfile,
    infoUser: state.userReducer.infoUser
});

export default connect(mapStateToProps, null)(InfoUser);

