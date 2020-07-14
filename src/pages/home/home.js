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
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';

class home extends Component {

  constructor() {
    super();
    this.state = {
      index: 0,
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
      url: `${BASE_URL}/users/rank/`,
      headers: {
        'Authorization': Authorization,
      }
    }).then(res => {

      let topUser = res.data.data
      console.log({topUser});
      topUser = topUser.filter(item => {
        return item.numberLike !== 0 && item.numberPost !== 0
      })
      console.log(topUser);
      this.setState({
        topUsersHasLikes: topUser
      })


    })

    Axios({
      method: "GET",
      url: `${BASE_URL}/posts/rating/`,
      headers: {
        'Authorization': Authorization,
      }
    }).then(res => {


      let arrOrigin = res.data.data

      let flagArr = [];
      let result = arrOrigin.reduce((previousVal, currentVal, index) => {
        if (flagArr.length === 4) {
          previousVal.push(flagArr)
          flagArr = [];
        }
        if (arrOrigin.length - 1 === index) {
          previousVal.push(flagArr)
        }
        flagArr.push(currentVal);

        return previousVal;
      }, []);

      this.setState({
        listPostHasMostLike: result
      }, () => {
        console.log({ topPost: this.state.listPostHasMostLike });

      })


    })


    Axios({
      method: "GET",
      url: `${BASE_URL}/posts/`,
      headers: {
        'Authorization': Authorization,
      }

    }).then(res => {

      let list1 = [];
      let list2 = [];
      let list3 = []

      res.data.data.map(item => {
        switch (item.filmType) {
          case 1:
            return list1.push(item)
            break;

          case 2:
            return list2.push(item)
            break;

          case 3:
            return list3.push(item)
            break;

          default:
            break;
        }
      })

      console.log(list1, list2, list3);


      let arrOrigin1 = list1
      let arrOrigin2 = list2
      let arrOrigin3 = list3



      let flagArr1 = [];
      let result1 = arrOrigin1.reduce((previousVal, currentVal, index) => {
        if (flagArr1.length === 4) {
          previousVal.push(flagArr1)
          flagArr1 = [];
        }
        if (arrOrigin1.length - 1 === index) {
          previousVal.push(flagArr1)
        }
        flagArr1.push(currentVal);

        return previousVal;
      }, []);

      let flagArr2 = [];
      let result2 = arrOrigin2.reduce((previousVal, currentVal, index) => {
        if (flagArr2.length === 4) {
          previousVal.push(flagArr2)
          flagArr2 = [];
        }
        if (arrOrigin2.length - 1 === index) {
          previousVal.push(flagArr2)
        }
        flagArr2.push(currentVal);

        return previousVal;
      }, []);

      let flagArr3 = [];
      let result3 = arrOrigin3.reduce((previousVal, currentVal, index) => {
        if (flagArr3.length === 4) {
          previousVal.push(flagArr3)
          flagArr3 = [];
        }
        if (arrOrigin3.length - 1 === index) {
          previousVal.push(flagArr3)
        }
        flagArr3.push(currentVal);

        return previousVal;
      }, []);


      this.setState({
        // listPostMovie: result
        listPostMovie1: result1,
        listPostMovie2: result2,
        listPostMovie3: result3

      }, () => {
        console.log(this.state.listPostMovie);

      })

    }).catch(err => {

      console.log({ ...err });

    })

    // this.setState({
    //   listPostMovie: [
    //     {
    //       _id: 1,
    //       url: "https://upload.wikimedia.org/wikipedia/vi/d/df/Arrival%2C_Movie_Poster.jpg",
    //       title: "[REVIEW] CĂN HỘ CỦA QUỶ - 32 MALASANA STREET",
    //       description: "Căn hộ của quỷ (tựa gốc: 32 Malasana Street) – phim kinh dị đang được công chiếu tại Touch Cinema sẽ mang đến cho khán giả một câu chuyện đầy thú vị và kích thích. Nếu không có dịch..."
    //     },
    //     {
    //       _id: 2,
    //       url: "https://images-na.ssl-images-amazon.com/images/I/71zaL8t0qgL._AC_SL1406_.jpg",
    //       title: "[REVIEW] SÁT THỦ VÔ CÙNG CỰC – CƯỜI THẢ GA ĐUỔI CORONA",
    //       description: "Sát thủ vô cùng cực (Hitman: Agent Jun) là phim mới duy nhất được công chiếu tại Touch Cinema tuần này. Bộ phim mang đến cho khán giả những tình huống “dở khóc dở cười” đến từ s..."
    //     },
    //     {
    //       _id: 3,
    //       url: "https://touchcinema.com/uploads/phim-ngoi-lang-tu-khi/phim-ngoi-lang-tu-khi-thumbnail.jpg",
    //       title: "[REVIEW] VÌ ANH VẪN TIN – LẮNG NGHE NƯỚC MẮT",
    //       description: "I Still Believe (tựa Việt: Vì anh vẫn tin) được dựa trên câu chuyện có thật về cuộc đời của ca, nhạc sĩ người Mỹ - Jeremy Camp. Bộ phim mang đến cho khán giả những cảm xúc tươi đẹp nhưng lại đầy đau đớn về một..."
    //     },
    //     {
    //       _id: 4,
    //       url: "https://upload.wikimedia.org/wikipedia/vi/3/3a/Robin_Hood_%282018_film_poster%29.png",
    //       title: "[REVIEW] BLOODSHOT – ÂM THANH VÀ HÌNH ẢNH QUÁ ĐÃ!",
    //       description: "Bloodshot – một trong những siêu anh hùng nổi tiếng nhất của Valiant, chịu trách nhiệm mở ra một vũ trụ điện ảnh mới như Marvel hay DC đã có suất chiếu sớm đầu tiên tại Touch Cinema vào ngày..."
    //     },
    //   ]
    // })
  }

  handleSelect = (selectedIndex) => {
    this.setState({
      index: selectedIndex,
    })
  }
  handleClick = () => {
    alert('adc')
  }


  render() {
    const { listPostMovie1, listPostMovie2, listPostMovie3 } = this.state

    return (
      <>
        <div style={{ marginTop: 50 }} />
        <div style={{ backgroundImage: `url(${BackGroundSlider})`, height: 700, padding: 200 }}>
          <Carousel indicators={false} activeIndex={this.state.index} onSelect={this.handleSelect}>
            {
              this.state.listPostHasMostLike && this.state.listPostHasMostLike.length > 0 &&
              this.state.listPostHasMostLike.map((item, index) => {
                return (
                  <Carousel.Item key={index}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-evenly'
                    }}>
                      <div style={{ width: 274, height: 420 }}>
                        {
                          item[0]?.id &&
                          <Link
                            to={`/info-post/${item[0].id}`}>
                            <img style={{ borderRadius: 10, height: "100%", width: "100%", objectFit: "cover" }}
                              src={
                                `${BASE_URL_AVATAR}/${item[0].picture.replace('"', '').replace('"', '')}`
                              }
                              alt="" />
                          </Link>
                        }

                      </div>
                      <div style={{ width: 274, height: 420 }}>
                        {
                          item[1]?.id &&
                          <Link
                            to={`/info-post/${item[1].id}`}>
                            <img style={{ borderRadius: 10, height: "100%", width: "100%", objectFit: "cover" }}
                              src={
                                `${BASE_URL_AVATAR}/${item[1].picture.replace('"', '').replace('"', '')}`
                              }
                              alt="" />
                          </Link>
                        }
                      </div>
                      <div style={{ width: 274, height: 420 }}>
                        {
                          item[2]?.id &&
                          <Link
                            to={`/info-post/${item[2].id}`}>
                            <img style={{ borderRadius: 10, height: "100%", width: "100%", objectFit: "cover" }}
                              src={
                                `${BASE_URL_AVATAR}/${item[2].picture.replace('"', '').replace('"', '')}`
                              }
                              alt="" />
                          </Link>
                        }
                      </div>
                      <div style={{ width: 274, height: 420 }}>
                        {
                          item[3]?.id &&
                          <Link
                            to={`/info-post/${item[3].id}`}>
                            <img style={{ borderRadius: 10, height: "100%", width: "100%", objectFit: "cover" }}
                              src={
                                `${BASE_URL_AVATAR}/${item[3].picture.replace('"', '').replace('"', '')}`
                              }
                              alt="" />
                          </Link>
                        }
                      </div>
                    </div>
                  </Carousel.Item>
                )
              })
            }
          </Carousel>
        </div>


        <div style={{ backgroundColor: '#020d18', paddingBottom: 100 }}>
          <div style={{ height: 70 }}></div>
          <div className="container">
            <div className="row">

              <div style={styles.backgroundColor} className="col-8 ">
                <p
                  style={{
                    color: '#dcf836',
                    fontSize: 20,
                    fontWeight: "500",
                    marginTop: 50
                  }}>
                  Phim hành động
                </p>

                <Carousel indicators={false}>
                  {
                    listPostMovie1 && listPostMovie1.length &&
                    listPostMovie1.map((item, index) => {
                      return (
                        <Carousel.Item>
                          <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly'
                          }}>
                            <div style={{ width: 162, height: 250 }}>
                              <Link
                                to={`/info-post/${item[0].id}`}>
                                <img style={{ borderRadius: 10, height: "100%", width: "100%", objectFit: "cover" }}
                                  src={
                                    item[0].picture &&
                                    `${BASE_URL}/uploads/${item[0].picture.replace('"', '').replace('"', '')}`
                                  }
                                  alt="" />
                              </Link>
                            </div>
                            <div style={{ width: 162, height: 250 }}>
                              {
                                item[1]?.id &&
                                <Link
                                  to={`/info-post/${item[1].id}`}>
                                  <img style={{ borderRadius: 10, height: "100%", width: "100%", objectFit: "cover" }}
                                    src={
                                      item[1].picture &&
                                      `${BASE_URL}/uploads/${item[1].picture.replace('"', '').replace('"', '')}`
                                    }
                                    alt="" />
                                </Link>
                              }

                            </div>
                            <div style={{ width: 162, height: 250 }}>
                              {
                                item[2]?.id &&
                                <Link
                                  to={`/info-post/${item[2].id}`}>
                                  <img style={{ borderRadius: 10, height: "100%", width: "100%", objectFit: "cover" }}
                                    src={
                                      item[2].picture &&
                                      `${BASE_URL}/uploads/${item[2].picture.replace('"', '').replace('"', '')}`
                                    }
                                    alt="" />
                                </Link>
                              }
                            </div>
                            <div style={{ width: 162, height: 250 }}>
                              {
                                item[3]?.id &&
                                <Link
                                  to={`/info-post/${item[3].id}`}>
                                  <img style={{ borderRadius: 10, height: "100%", width: "100%", objectFit: "cover" }}
                                    src={
                                      item[3].picture &&
                                      `${BASE_URL}/uploads/${item[3].picture.replace('"', '').replace('"', '')}`
                                    }
                                    alt="" />
                                </Link>
                              }
                            </div>
                          </div>
                        </Carousel.Item>
                      )
                    })

                  }

                </Carousel>
                <div style={{ height: 50 }} />
                <p
                  style={{
                    color: '#dcf836',
                    fontSize: 20,
                    fontWeight: "500"
                  }}>
                  Phim Lãng mạn
                </p>

                <Carousel indicators={false}>
                  {
                    listPostMovie2 && listPostMovie2.length &&
                    listPostMovie2.map((item, index) => {
                      return (
                        <Carousel.Item>
                          <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly'
                          }}>
                            <div style={{ width: 162, height: 250 }}>
                              <Link
                                to={`/info-post/${item[0].id}`}>
                                <img style={{ borderRadius: 10, height: "100%", width: "100%", objectFit: "cover" }}
                                  src={
                                    item[0].picture &&
                                    `${BASE_URL}/uploads/${item[0].picture.replace('"', '').replace('"', '')}`
                                  }
                                  alt="" />
                              </Link>
                            </div>
                            <div style={{ width: 162, height: 250 }}>
                              {
                                item[1]?.id &&
                                <Link
                                  to={`/info-post/${item[1].id}`}>
                                  <img style={{ borderRadius: 10, height: "100%", width: "100%", objectFit: "cover" }}
                                    src={
                                      item[1].picture &&
                                      `${BASE_URL}/uploads/${item[1].picture.replace('"', '').replace('"', '')}`
                                    }
                                    alt="" />
                                </Link>
                              }

                            </div>
                            <div style={{ width: 162, height: 250 }}>
                              {
                                item[2]?.id &&
                                <Link
                                  to={`/info-post/${item[2].id}`}>
                                  <img style={{ borderRadius: 10, height: "100%", width: "100%", objectFit: "cover" }}
                                    src={
                                      item[2].picture &&
                                      `${BASE_URL}/uploads/${item[2].picture.replace('"', '').replace('"', '')}`
                                    }
                                    alt="" />
                                </Link>
                              }
                            </div>
                            <div style={{ width: 162, height: 250 }}>
                              {
                                item[3]?.id &&
                                <Link
                                  to={`/info-post/${item[3].id}`}>
                                  <img style={{ borderRadius: 10, height: "100%", width: "100%", objectFit: "cover" }}
                                    src={
                                      item[3].picture &&
                                      `${BASE_URL}/uploads/${item[3].picture.replace('"', '').replace('"', '')}`
                                    }
                                    alt="" />
                                </Link>
                              }
                            </div>
                          </div>
                        </Carousel.Item>
                      )
                    })

                  }

                </Carousel >
                <div style={{ height: 50 }} />
                <p
                  style={{
                    color: '#dcf836',
                    fontSize: 20,
                    fontWeight: "500"
                  }}>
                  Phim kinh dị
                </p>

                <Carousel indicators={false}>
                  {
                    listPostMovie3 && listPostMovie3.length &&
                    listPostMovie3.map((item, index) => {
                      return (
                        <Carousel.Item>
                          <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly'
                          }}>
                            <div style={{ width: 162, height: 250 }}>
                              <Link
                                to={`/info-post/${item[0].id}`}>
                                <img style={{ borderRadius: 10, height: "100%", width: "100%", objectFit: "cover" }}
                                  src={
                                    item[0].picture &&
                                    `${BASE_URL}/uploads/${item[0].picture.replace('"', '').replace('"', '')}`
                                  }
                                  alt="" />
                              </Link>
                            </div>
                            <div style={{ width: 162, height: 250 }}>
                              {
                                item[1]?.id &&
                                <Link
                                  to={`/info-post/${item[1].id}`}>
                                  <img style={{ borderRadius: 10, height: "100%", width: "100%", objectFit: "cover" }}
                                    src={
                                      item[1].picture &&
                                      `${BASE_URL}/uploads/${item[1].picture.replace('"', '').replace('"', '')}`
                                    }
                                    alt="" />
                                </Link>
                              }

                            </div>
                            <div style={{ width: 162, height: 250 }}>
                              {
                                item[2]?.id &&
                                <Link
                                  to={`/info-post/${item[2].id}`}>
                                  <img style={{ borderRadius: 10, height: "100%", width: "100%", objectFit: "cover" }}
                                    src={
                                      item[2].picture &&
                                      `${BASE_URL}/uploads/${item[2].picture.replace('"', '').replace('"', '')}`
                                    }
                                    alt="" />
                                </Link>
                              }
                            </div>
                            <div style={{ width: 162, height: 250 }}>
                              {
                                item[3]?.id &&
                                <Link
                                  to={`/info-post/${item[3].id}`}>
                                  <img style={{ borderRadius: 10, height: "100%", width: "100%", objectFit: "cover" }}
                                    src={
                                      item[3].picture &&
                                      `${BASE_URL}/uploads/${item[3].picture.replace('"', '').replace('"', '')}`
                                    }
                                    alt="" />
                                </Link>
                              }
                            </div>
                          </div>
                        </Carousel.Item>
                      )
                    })

                  }

                </Carousel>

                {/* <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                  {
                    listPostMovie && listPostMovie.length > 0 &&
                    listPostMovie.map((item, index) => {
                      console.log(item.picture.replace('"', '').replace('"', ''));

                      return (
                        <div style={{
                          display: "flex",
                          flexDirection: "row",
                          marginBottom: 20
                        }}>
                          <div style={{ width: 300, height: 180, borderRadius: 10, overflow: "hidden", backgroundColor: '#828282' }} >
                            <img style={{ height: "100%", width: "100%", objectFit: "cover" }}
                              // src={item.picture} 
                              src={
                                item.picture &&
                                `http://re-flim.azurewebsites.net/uploads/${item.picture.replace('"', '').replace('"', '')}`
                              }
                              alt="" />
                          </div>

                          <div style={{ marginLeft: 10, flex: 1 }}>

                            <Link
                              style={{ margin: 0, fontSize: 18, color: '#fff', fontWeight: '500' }}
                              to={`/info-post/${item.id}`}>
                              {item.nameFilm}
                            </Link>

                            <p style={{
                              color: '#fff'
                            }}>
                              {item.title}
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                              <div style={{ display: 'flex', alignItems: 'center', color:'#fff' }}>
                                <FaRegThumbsUp style={{ marginRight: 10 }} />
                                100
                              </div>

                              <div style={{ display: 'flex', alignItems: 'center', marginLeft: 20 }}>
                                <FaRegThumbsDown style={{ marginRight: 10 }} />
                                100
                              </div>

                              <div style={{ display: 'flex', alignItems: 'center', marginLeft: 20 }}>
                                <FaRegCommentDots style={{ marginRight: 10 }} />
                                100
                              </div>

                              <div style={{ display: 'flex', flex: 1, alignItems: 'center', marginRight: 20, justifyContent: 'flex-end' }}>
                                <FaRegUserCircle style={{ marginRight: 10 }} />
                                <p style={{
                                  color: '#000000',
                                  fontWeight: 'bold',
                                  fontStyle: 'italic',
                                  margin: 0
                                }}>Fullname User</p>
                              </div>
                            </div>

                          </div>

                        </div>
                      )
                    }).reverse()
                  }
                </div> */}


              </div>






              <div className="col-4" >
                <div style={{ paddingLeft: 60 }}>
                  <p
                    style={{
                      color: '#FFF',
                      fontSize: 20,
                      fontWeight: "500"
                    }}>
                    Top Writers
                </p>
                  <div style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: '#828282',
                    marginBottom: 50
                  }} />


                  {
                    this.state.topUsersHasLikes && this.state.topUsersHasLikes.length > 0 &&
                    this.state.topUsersHasLikes.map((item, index) => {
                      return (
                        <ItemVVIPUser
                          uri={
                            item.user.avatar ?
                              `${BASE_URL_AVATAR}/${item.user.avatar.replace('"', '').replace('"', '')}`
                              :
                              require('../../image/avatar.png')
                          }
                          fullname={`${item.user.firstName} ${item.user.lastName}`}
                          totalPost={item.numberPost}
                          totalLike={item.numberLike}
                          id={item.user.id}
                        />
                      )
                    })
                  }



                </div>
              </div>
            </div>
          </div>

        </div>

        {/* <div>

          <img src={require('../../image/ft-bg.jpg')} alt=""/>
          <p style={{fontSize:20, color:'#fff'}}>KKKKKKKK</p>
        </div> */}
        <div style={{ backgroundImage: `url(${BackGround})`, height: 300 }}>
          <a target='_blank' href="https://dungtran.top/">
            <p style={{
              paddingTop: 20,
              fontSize: 25,
              fontWeight: '500',
              color: '#dd003f',
              margin: 0,
              textAlign: 'center'
            }}>
              DUNGTRAN.TOP
          </p>
          </a>
          <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={require('../../image/footerfake.png')} alt="" />
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

class ItemVVIPUser extends Component {
  render() {
    let { uri, fullname, totalPost, totalLike } = this.props
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 30
      }}>
        <img style={{ borderRadius: 50, height: 100, width: 100, objectFit: "cover" }}
          src={
            uri
          }
          alt="" />
        <div>
          <Link
            to={`/info-user/${this.props.id}`}>
            <p style={{
              margin: 0,
              color: '#f5b50c',
              fontWeight: "bold",
              fontSize: 18,
              marginLeft: 10
            }}>
              {fullname}
            </p>
          </Link>
          <p style={{
            margin: 0,
            color: '#fff',
            fontSize: 16,
            marginLeft: 10
          }}>
            {totalPost} bài viết
          </p>
          <p style={{
            margin: 0,
            color: '#fff',
            fontSize: 16,
            marginLeft: 10
          }}>
            Tổng số lượt thích: {totalLike}
          </p>
        </div>
      </div>
    );
  }
}


export default home;

