import React, { Component } from 'react';
// import { Container, Hidden } from '@material-ui/core';
import { MAIN_COLOR } from '../../constants/color'

class home extends Component {

  constructor() {
    super();
    this.state = {

    }
  }

  componentDidMount() {
    this.setState({
      listPostMovie: [
        {
          _id: 1,
          url: "https://upload.wikimedia.org/wikipedia/vi/d/df/Arrival%2C_Movie_Poster.jpg",
          title: "[REVIEW] CĂN HỘ CỦA QUỶ - 32 MALASANA STREET",
          description: "Căn hộ của quỷ (tựa gốc: 32 Malasana Street) – phim kinh dị đang được công chiếu tại Touch Cinema sẽ mang đến cho khán giả một câu chuyện đầy thú vị và kích thích. Nếu không có dịch..."
        },
        {
          _id: 2,
          url: "https://images-na.ssl-images-amazon.com/images/I/71zaL8t0qgL._AC_SL1406_.jpg",
          title: "[REVIEW] SÁT THỦ VÔ CÙNG CỰC – CƯỜI THẢ GA ĐUỔI CORONA",
          description: "Sát thủ vô cùng cực (Hitman: Agent Jun) là phim mới duy nhất được công chiếu tại Touch Cinema tuần này. Bộ phim mang đến cho khán giả những tình huống “dở khóc dở cười” đến từ s..."
        },
        {
          _id: 3,
          url: "https://touchcinema.com/uploads/phim-ngoi-lang-tu-khi/phim-ngoi-lang-tu-khi-thumbnail.jpg",
          title: "[REVIEW] VÌ ANH VẪN TIN – LẮNG NGHE NƯỚC MẮT",
          description: "I Still Believe (tựa Việt: Vì anh vẫn tin) được dựa trên câu chuyện có thật về cuộc đời của ca, nhạc sĩ người Mỹ - Jeremy Camp. Bộ phim mang đến cho khán giả những cảm xúc tươi đẹp nhưng lại đầy đau đớn về một..."
        },
        {
          _id: 4,
          url: "https://upload.wikimedia.org/wikipedia/vi/3/3a/Robin_Hood_%282018_film_poster%29.png",
          title: "[REVIEW] BLOODSHOT – ÂM THANH VÀ HÌNH ẢNH QUÁ ĐÃ!",
          description: "Bloodshot – một trong những siêu anh hùng nổi tiếng nhất của Valiant, chịu trách nhiệm mở ra một vũ trụ điện ảnh mới như Marvel hay DC đã có suất chiếu sớm đầu tiên tại Touch Cinema vào ngày..."
        },
      ]
    })
  }


  render() {
    const { listPostMovie } = this.state
    return (
      <div style={{ height: 1500, backgroundColor: '#e8e8e8' }}>
        <div style={{ height: 70 }}></div>
        <div className="container">
          <div className="row">

            <div style={styles.backgroundColor} className="col-8">
              {/* LEFT */}
              <div style={{
                display: 'flex',
                justifyContent: "center",
                marginBottom: 20
              }}>
                <p style={{
                  margin: 0,
                  fontSize: 25
                }}>ĐÁNH GIÁ PHIM</p>
              </div>

              {
                listPostMovie && listPostMovie.length > 0 &&
                listPostMovie.map((item, index) => {
                  return (
                    <div style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: 20
                    }}>
                      <div style={{ width: 300, height: 180, borderRadius: 10, overflow: "hidden", backgroundColor: 'red' }} >
                        <img style={{ height: "100%", width: "100%", objectFit: "cover" }} src={item.url} alt="" />
                      </div>

                      <div style={{ marginLeft: 10, flex: 1 }}>

                        <a style={{ margin: 0, fontSize: 18, color: MAIN_COLOR, fontWeight: '500' }} href="">
                          {item.title}
                        </a>
                        <p>
                          {item.description}
                        </p>
                      </div>

                    </div>
                  )
                })
              }


            </div>






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


export default home;

