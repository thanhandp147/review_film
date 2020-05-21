import React, { Component } from 'react';
// import { Container, Hidden } from '@material-ui/core';
import { MAIN_COLOR } from '../../constants/color'
import { connect } from 'react-redux'

import { FaRegThumbsUp } from 'react-icons/fa';

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

        if (_idPost == 100) {
            this.setState({
                infoPost: INFOPOST
            })

        }

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
        let newCmt = {
            avatar: "",
            fullname: this.props.infoUser.fullname,
            content: inputOfComment
        }

        let listCmtOwnTemp = [...this.state.listCmtOwn]
        listCmtOwnTemp.unshift(newCmt)

        this.setState({
            listCmtOwn: listCmtOwnTemp,
            inputOfComment: ''
        }, () => {


        })
    }


    render() {
        const { listPostMovie, infoPost, listCmtOwn } = this.state
        return (
            <div style={{ backgroundColor: '#e8e8e8' }}>
                <div style={{ height: 70 }}></div>
                <div className="container">
                    <div className="row">

                        <div style={styles.backgroundColor} className="col-8">
                            {/* LEFT */}
                            <div style={{
                                display: 'flex',
                                // justifyContent: "center",
                            }}>
                                <p style={{
                                    margin: 0,
                                    fontSize: 22,
                                    color: MAIN_COLOR,
                                    marginBottom: 20
                                }}>[Review] - {infoPost.title}</p>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{ padding: 0 }}>
                                    Đăng lúc {infoPost.createAt} bởi {infoPost.author}
                                </p>

                                <div style={{ display: 'flex' }}>
                                    <button
                                        className="btn btn-primary my-2 my-sm-0"
                                        style={{ margin: 20 }}>
                                        Thích
                                </button>

                                    <button
                                        className="btn btn-primary my-2 my-sm-0">
                                        Chia sẻ
                                </button>
                                </div>
                            </div>

                            <div
                                style={{ marginTop: 20 }}
                                dangerouslySetInnerHTML={{ __html: infoPost.stringOutput }}>

                            </div>

                            <div style={{
                                width: "100%",
                                height: 1,
                                backgroundColor: '#000000'
                            }} />

                            <p style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                marginTop: 20
                            }}>
                                {infoPost.totalCmt} Bình luận
                            </p>

                            <div style={{ flexDirection: "row", display: "flex" }}>
                                <div style={{
                                    width: 50,
                                    height: 50,
                                    backgroundColor: "#828282"
                                }}>

                                </div>
                                <input
                                    value={this.state.inputOfComment}
                                    onChange={this._handleOnchangeCmt}
                                    placeholder="Thêm bình luận ... "
                                    style={{
                                        flex: 1,
                                        marginLeft: 5,
                                        paddingLeft: 10
                                    }}
                                />
                                <button
                                    className="btn btn-primary my-2 my-sm-0"
                                    style={{ margin: 5 }}
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
                                            // avatar={item.avatar}
                                            fullname={item.fullname}
                                            content={item.content}
                                        />
                                    )
                                })
                            }

                            {
                                infoPost && infoPost.listCmtOfPost && infoPost.listCmtOfPost.length &&
                                infoPost.listCmtOfPost.map((item, index) => {
                                    return (
                                        <ItemCmt key={index}
                                            avatar={item.avatar}
                                            fullname={item.fullname}
                                            content={item.content}
                                        />
                                    )
                                })
                            }


                            <div style={{ height: 50 }} />
                        </div>

                        {/* RIGHT */}

                        <div className="col-4">


                        </div>
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
            <div style={{ flexDirection: "row", display: "flex", marginTop: 20 }}>
                <div style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "#828282"
                }}>

                </div>
                <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, marginLeft: 10, padding: 0, color: '#395180', fontWeight: "bold" }}>{this.props.fullname}</p>
                    <p style={{ marginLeft: 10 }}>{this.props.content}</p>
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