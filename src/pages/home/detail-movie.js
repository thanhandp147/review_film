import React, { Component } from "react";
import { actGetDetailMovie } from "./../../redux/action";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class DetailMovie extends Component {
  componentDidMount() {
    // Lay maPhim từ trên đường link URL
    const id = this.props.match.params.id;
    this.props.getDetailMovie(id);
  }

  renderTable = () => {
    if (this.props.movie.lichChieu) {
      return this.props.movie.lichChieu.map((item, index) => {
        return (
          <tr key={index}>
            <td>{item.thongTinRap.tenCumRap}</td>
            <td>{item.thongTinRap.tenRap}</td>
            <td>{new Date(item.ngayChieuGioChieu).toLocaleTimeString()}</td>
            <td>{new Date(item.ngayChieuGioChieu).toLocaleDateString()}</td>
            <td>
              <Link className="btn btn-info" to="">
                Booking
              </Link>
            </td>
          </tr>
        );
      });
    }
  };

  render() {
    console.log(this.props.movie); // {}
    let { movie } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <img className="img-fluid" src={movie.hinhAnh} alt="" />
          </div>
          <div className="col-sm-6">
            <table className="table">
              <tbody>
                <tr>
                  <td>ten phim</td>
                  <td>{movie.tenPhim}</td>
                </tr>
                <tr>
                  <td>mo ta</td>
                  <td>{movie.moTa}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <table className="table">
              <thead>
                <tr>
                  <th>Ten Cum Rap</th>
                  <th>Ten Rap</th>
                  <th>Gio Chieu</th>
                  <th>Ngay Chieu</th>
                </tr>
              </thead>
              <tbody>{this.renderTable()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movie: state.movieReducer.movie
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDetailMovie: id => {
      dispatch(actGetDetailMovie(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailMovie);
