import React, { Component } from 'react';
// import { Container, Hidden } from '@material-ui/core';
import { MAIN_COLOR } from '../../constants/color'
import { connect } from 'react-redux'

import { FaRegThumbsUp, FaCentercode } from 'react-icons/fa';
import Axios from 'axios'
import { BASE_URL, BASE_URL_AVATAR } from '../../constants/url'
import BackGroundSlider from '../../image/slider-bg.jpg'
import moment from 'moment';
import { FaThumbsUp } from 'react-icons/fa';

class InfoPost extends Component {

    constructor() {
        super();
        this.state = {
            infoPost: {},
            listCmtOwn: []
        }
    }

    componentDidMount() {
        console.log(this.props.match.params);
        let _idPost = this.props.match.params.id

        let tokenStorage = localStorage.getItem('token')

        let Authorization
        if (tokenStorage) {
            Authorization = `Token ${tokenStorage}`
        } else {
            Authorization = null
        }

        Axios({
            method: "GET",
            url: `${BASE_URL}/posts/${_idPost}`,
            headers: {
                'Authorization': Authorization,
                "Content-Type": "application/json"
            }

        }).then(res => {

            console.log(res.data.data);

            let isLiked = res.data.data.userLikes.find(item => item == this.props.infoUser.id)

            this.setState({
                infoPost: res.data.data,
                isLiked
            })

        }).catch(err => {

            // console.log(err.response.data );
            console.log({ ...err });

        })

        // if (_idPost == 100) {
        //     this.setState({
        //         infoPost: INFOPOST
        //     })

        // }

    }

    _handleOnchangeCmt = (e) => {
        this.setState({
            inputOfComment: e.target.value
        })
    }
    _handleSubmitComment = () => {
        let { inputOfComment } = this.state
        if (!inputOfComment) {
            return alert('Vui lòng điền vào ')
        }

        let tokenStorage = localStorage.getItem('token')

        let Authorization
        if (tokenStorage) {
            Authorization = `Token ${tokenStorage}`
        } else {
            alert('Bạn cần phải đăng nhập để thực hiện chức năng này')
            return Authorization = null
        }

        Axios({
            method: "POST",
            url: `${BASE_URL}/posts/create-comment/`,
            headers: {
                'Authorization': Authorization,
                "Content-Type": "application/json"
            },
            data: { postId: this.state.infoPost.id, content: inputOfComment }
        }).then(res => {
            console.log({ ...res })
            let newCmt = {
                createdAt: moment().format('DD/MM/YYYY HH:mm'),
                avatar: "",
                user: `${this.props.infoUser.first_name} ${this.props.infoUser.last_name}`,
                content: res.data.content
            }

            let listCmtOwnTemp = [...this.state.listCmtOwn]
            listCmtOwnTemp.unshift(newCmt)

            let infoPostTemp = { ...this.state.infoPost }
            infoPostTemp.commentCount = infoPostTemp.commentCount + 1

            this.setState({
                listCmtOwn: listCmtOwnTemp,
                inputOfComment: '',
                infoPost: infoPostTemp
            })
        }).catch(err => {
            console.log({ ...err });
        })


    }

    _handleLikePost = () => {
        let tokenStorage = localStorage.getItem('token')
        let Authorization
        if (tokenStorage) {
            Authorization = `Token ${tokenStorage}`
        } else {
            alert('Bạn cần phải đăng nhập để thực hiện chức năng này')
            return Authorization = null
        }
        Axios({
            method: "POST",
            url: `${BASE_URL}/posts/create-like/`,
            headers: {
                'Authorization': Authorization,
                "Content-Type": "application/json"
            },
            data: { postId: this.state.infoPost.id }
        }).then(res => {
            console.log({ ...res })
            let infoPostTemp = { ...this.state.infoPost }
            infoPostTemp.like = infoPostTemp.like + 1
            this.setState({
                isLiked: true,
                infoPost: infoPostTemp
            })
        }).catch(err => {
            console.log({ ...err });
        })
    }

    _handleUnPost = () => {
        let tokenStorage = localStorage.getItem('token')
        let Authorization
        if (tokenStorage) {
            Authorization = `Token ${tokenStorage}`
        } else {
            alert('Bạn cần phải đăng nhập để thực hiện chức năng này')
            return Authorization = null
        }
        Axios({
            method: "DELETE",
            url: `${BASE_URL}/posts/cancel-like/`,
            headers: {
                'Authorization': Authorization,
                "Content-Type": "application/json"
            },
            data: { postId: this.state.infoPost.id }
        }).then(res => {
            if (res.data.status == true) {
                let infoPostTemp = { ...this.state.infoPost }
                infoPostTemp.like = infoPostTemp.like - 1

                this.setState({
                    isLiked: false,
                    infoPost: infoPostTemp
                })
            }

        }).catch(err => {
            console.log({ ...err });
        })
    }



    render() {
        const { listPostMovie, infoPost, listCmtOwn } = this.state
        return (
            <div style={{ backgroundColor: '#020d18' }}>
                <div style={{ height: 70 }}></div>
                <div style={{ backgroundImage: `url(${BackGroundSlider})`, height: 150, objectFit: 'cover' }}></div>
                <div className="container" style={{backgroundColor:'#fff', borderRadius:20, marginTop:20}}>
                    <div style={{padding:100}}>
                        <h1 style={{
                            marginTop: 20,
                            marginBottom: 20
                        }}>
                            {infoPost.nameFilm}
                        </h1>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p style={{ padding: 0, color:'#dd003f'}}>
                                Đăng lúc {moment(infoPost.createdAt).format('L')}
                                {` bởi ${infoPost.user?.firstName} ${infoPost.user?.lastName}`}
                            </p>

                            {/* <div style={{ display: 'flex', alignItems: 'center', color: 'red' }}>

                                100
                              </div> */}


                            <div style={{ display: 'flex' }}>
                                {
                                    this.state.isLiked ?
                                        <button
                                            onClick={this._handleUnPost}
                                            className="btn "
                                            style={{ margin: 20 , backgroundColor:'#f5b50c', color:'#fff', fontWeight:'bold', boxShadow:'none', outline:'none'}}>
                                            Đã thích
                                        </button>
                                        :
                                        <button
                                            onClick={this._handleLikePost}
                                            className="btn"
                                            style={{ margin: 20 , backgroundColor:'#395180', color:'#fff', fontWeight:'bold', boxShadow:'none', outline:'none'}}>
                                            Thích
                                        </button>
                                }

                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <FaThumbsUp style={{ color: '#f5b50c', marginRight: 10, fontSize: 20, marginTop: 5 }} />
                            <h4 style={{ margin: 0 }}>{
                                this.state.infoPost.like
                            }</h4>
                        </div>

                        <div
                            style={{ marginTop: 20 }}
                            dangerouslySetInnerHTML={{ __html: infoPost.content }}>

                        </div>

                        <div style={{
                            width: "100%",
                            height: 0.25,
                            backgroundColor: '#e4eaf0',
                            marginTop:50
                        }} />

                        <p style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginTop: 20
                        }}>
                            {infoPost && infoPost.commentCount} Bình luận
                                {
                                // infoPost && infoPost.comments.length && `alo`
                            }
                        </p>

                        <div style={{ flexDirection: "row", display: "flex" , marginBottom:30}}>
                            <div style={{
                                width: 80,
                                height: 80,
                                borderRadius: 40,
                                overflow: 'hidden',
                            }}>
                                <img
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit:'cover'
                                    }}
                                    src=
                                    {
                                        this.props.infoUser.avatar ?
                                            `${BASE_URL_AVATAR}/${this.props.infoUser.avatar.replace('"', '').replace('"', '')}`
                                            :
                                            "https://img.thehobbyblogger.com/2012/08/custom-avatar.png"
                                    }
                                    alt="" />
                            </div>
                            <textarea
                                value={this.state.inputOfComment}
                                onChange={this._handleOnchangeCmt}
                                // type="textarea" 
                                placeholder="Thêm bình luận ... "
                                style={{
                                    flex: 1,
                                    marginLeft: 5,
                                    paddingLeft: 10,
                                    borderRadius:10,
                                    borderWidth:0.5,
                                    borderColor:'#fff',
                                    outline:'none',
                                    backgroundColor:'#e4eaf0',
                                    padding:10
                                }}
                            />
                            <button
                                className="btn "
                                style={{ margin: 5, width:100, fontSize:20, fontWeight:'bold', color:'#fff',backgroundColor:'#395180', outline:'none' }}
                                onClick={this._handleSubmitComment}
                            >
                                Đăng
                                </button>
                        </div>

                        {
                            listCmtOwn && listCmtOwn.length > 0 &&
                            listCmtOwn.map((item, index) => {
                                return (
                                    <ItemCmt key={index}

                                        avatar={
                                            this.props.infoUser.avatar ?
                                                `${BASE_URL_AVATAR}/${this.props.infoUser.avatar.replace('"', '').replace('"', '')}`
                                                :
                                                `https://img.thehobbyblogger.com/2012/08/custom-avatar.png`
                                        }
                                        createdAt={item.createdAt}
                                        fullname={item.user}
                                        content={item.content}
                                    />
                                )
                            })
                        }

                        {
                            infoPost && infoPost.comments && infoPost.comments.length > 0 &&
                            infoPost.comments.map((item, index) => {
                                return (
                                    <ItemCmt key={item.id}
                                        avatar={
                                            item.infoUser.avatar ?
                                                `${BASE_URL_AVATAR}/${item.infoUser.avatar.replace('"', '').replace('"', '')}`
                                                :
                                                `https://img.thehobbyblogger.com/2012/08/custom-avatar.png`
                                        }
                                        createdAt={moment(item.created_at).format('DD/MM/YYYY HH:mm')}
                                        fullname={`${item.infoUser.firstName} ${item.infoUser.lastName}`}
                                        content={item.content}
                                    />
                                )
                            }).reverse()
                        }


                        <div style={{ height: 250 }} />
                        {/* </div> */}

                        {/* RIGHT */}

                        {/* <div className="col-4">


                        </div> */}
                    </div>
                </div>

            </div>
        );
    }
}

const styles = {
    backgroundColor: {
        backgroundColor: '#FFFFFF'
    },
}

class ItemCmt extends Component {

    render() {
        return (
            <div style={{ marginTop: 20, borderRadius: 10, display: "flex", flexDirection: 'row', alignItems: 'center', backgroundColor: '#e4eaf0', paddingLeft: 30, paddingTop: 20, paddingBottom: 20 }}>
                <div style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    overflow: 'hidden'
                }}>
                    <img
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit:'cover'
                        }}
                        src={this.props.avatar} alt="" />
                </div>
                <div style={{ flex: 1, marginLeft: 20 }}>
                    <div style={{
                        display: 'flex',
                        // alignItems:'flex-end'
                        marginBottom: 5
                    }}>
                        <p style={{ margin: 0, marginLeft: 10, padding: 0, color: '#395180', fontWeight: "bold" }}>{`${this.props.fullname}`} </p>
                        <p style={{ margin: 0, marginLeft: 5, fontSize: 12, color: '#828282' }}>{`-${this.props.createdAt}`}</p>
                    </div>

                    <p style={{ margin: 0, marginLeft: 10 }}>{this.props.content}</p>
                </div>

            </div>
        );
    }
}



const mapStateToProps = state => ({
    infoUser: state.userReducer.infoUser
});

export default connect(mapStateToProps, null)(InfoPost);

const INFOPOST = {
    listCmtOfPost: [
        {
            avatar: "",
            fullname: "A 001",
            content: `it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

            Why do we use it?
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`
        },

        {
            avatar: "",
            fullname: "B 001",
            content: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable`
        },

        {
            avatar: "",
            fullname: "C 001",
            content: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from `
        },

    ],
    totalCmt: 20,
    author: "Le Thanh An",
    createAt: '04-05-2020',
    title: 'CĂN HỘ CỦA QUỶ - 32 MALASANA STREET',
    desciption: 'Căn hộ của quỷ (tựa gốc: 32 Malasana Street) – phim kinh dị đang được công chiếu tại Touch Cinema sẽ mang đến cho khán giả một câu chuyện đầy thú vị và kích thích',
    stringOutput: `<p><em style="font-family: Quicksand, Roboto, sans-serif; text-align: justify;"><span style="font-weight: 700;"><a href="https://touchcinema.com/phim/honest-candidate" target="_blank" rel="dofollow" style="color: rgb(33, 106, 148); text-decoration-line: underline; outline: 0px;">Bà hoàng nói dối – Honest Candidate</a>&nbsp;được đánh giá là một trong hai bộ phim xuất sắc nhất bên cạnh&nbsp;<a href="https://touchcinema.com/danh-gia-phim/phi-vu-dao-tau" target="_blank" rel="dofollow" style="color: rgb(48, 151, 209);">Phi vụ đào tẩu</a>, đang được chiếu tại Touch Cinema. Tác phẩm mang đến cho khán giả những tiếng cười châm biếm đầy sâu cay về góc khuất đằng sau giới chính trị mà những công dân bình thường chưa từng biết.</span></em></p><h3 style="font-family: Quicksand, Roboto, sans-serif; line-height: 1.1; margin-top: 22px; margin-bottom: 11px; font-size: 24px; text-align: justify;">Nội dung phim</h3><p style="margin-bottom: 11px; font-family: Quicksand, Roboto, sans-serif; text-align: justify;">Bà hoàng nói dối là câu chuyện xoay quanh Joo Sang Sook - ứng cử viên số 1 trong cuộc vận động tranh cử chức vụ tổng thống của Đại Hàn dân quốc. Xây dựng được một câu chuyện tốt, lộ trình ứng cử thuận lợi khi có sự ủng hộ của những tên tuổi trong giới chính trị; những tưởng Joo Sang Sook có thể nhanh chóng đạt được mục tiêu của mình, thế những một lời cầu nguyện vô tình của người bà bị lầm tưởng “đã chết” đã khiến Joo Sang Sook rơi vào hoàn cảnh tiến thoái lưỡng nan.</p><p style="margin-bottom: 11px; font-family: Quicksand, Roboto, sans-serif; text-align: justify;">Từ một người nói dối không chớp mắt, có thể biến thành thơ ca; Joo Sang Sook bỗng kiểm soát được những lời nói của mình, tất cả những lời nói bà thốt ra đều là lời nói thật. Mọi lời nói không chỉ khiến Joo Sang Sook bị những người ủng hộ quay lưng, mà còn vô tình tiết lộ những bí mật động trời của giới chính trị gia. Đứng trước tình hình này, bà Joo và các cố vấn của mình đã ngay lập tức lên kế hoạch xử lý khủng hoảng. Tuy nhiên mọi chuyện không hề dễ dàng như tưởng tượng.</p><p style="margin-bottom: 11px; font-family: Quicksand, Roboto, sans-serif; text-align: justify;">Bà hoàng nói dối sở hữu một cốt truyện khá thú vị và lạ lẫm. Biến quá trình tranh cử trở thành cơ hội để phanh phui những vấn đề nhức nhối của xã hội, mang đến cái nhìn rõ nét hơn về sự thối nát của giới chính quyền khi lợi dụng chức vụ để trục lợi. Mặc dù khai thác yếu tố chính trị, song bộ phim không mang đến cảm giác khô khan, cứng nhắc; thay vào đó khán giả đã có được những tiếng cười sảng khoái không ngớt từ đầu cho đến cuối phim.</p><p style="margin-bottom: 11px; font-family: Quicksand, Roboto, sans-serif; text-align: justify;">Sau những phút mở đầu khá chậm rãi, bộ phim dần trở nên hài hước hơn với những tình huống đầy éo le khi bà Joo không thể nào kiểm soát được lời nói của mình. Từ việc lợi dụng quyền hạn để tham nhũng, rửa tiền, ăn chơi hưởng thụ, chia bè kéo phái… được đạo diễn triển khai đầy khéo léo và đậm tính đả kích. Khiến khán giả nhiều phen cười lăn cười bò vì sự cố mà bà Joo mang lại.</p><p style="margin-bottom: 11px; font-family: Quicksand, Roboto, sans-serif; text-align: justify;">Ngoài ra bộ phim cũng khéo léo lồng ghép yếu tố gia đình vào trong phim. Một người bà bị lợi dụng để xây dựng bàn đáp cho cháu gái thăng tiến trong giới chính trị, dù hay nói những lời ác độc nhưng bà vẫn luôn mong muốn đứa cháu mình trở thành con người thiện lương, không bị quyền lực và tiền bạc làm mờ mắt. Một người mẹ cho dù có thể nói dối nhanh như gió trước hàng vạn người, song lại yêu thương và lo lắng cho con riêng của chồng từng ly từng tí.</p><p style="margin-bottom: 11px; font-family: Quicksand, Roboto, sans-serif; text-align: justify;">Các tình huống trong Bà hoàng nói dối được xây dựng rất tốt, cao trào phim không đến dồn dập, tình huống phim cũng không hồi hộp và căng thẳng. Thay vào đó các tình tiết lần lượt được triển khai theo đúng logic, mang đến cho khán giả mạch truyện thống nhất từ đầu đến cuối và yếu tố hài hước vừa đủ để tạo thú vị cho khán giả.</p><p><br></p>`
}