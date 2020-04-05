import React, { Component } from "react";
import * as action from "./../../redux/action";
import { connect } from "react-redux";

class ThemNguoiDung extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      hoTen: ""
    };
  }

  handleOnChange = e => {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    let user = { ...this.state };
    user.maNhom = "GP01";
    user.maLoaiNguoiDung = "KhachHang";

    this.props.addUser(user);
  };

  render() {
    return (
      <div className="container">
        <div className="col-sm-6 mx-auto">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="taiKhoan"
                onChange={this.handleOnChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="text"
                className="form-control"
                name="matKhau"
                onChange={this.handleOnChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                onChange={this.handleOnChange}
              />
            </div>
            <div className="form-group">
              <label>SDT</label>
              <input
                type="text"
                className="form-control"
                name="soDt"
                onChange={this.handleOnChange}
              />
            </div>
            <div className="form-group">
              <label>Ho Ten</label>
              <input
                type="text"
                className="form-control"
                name="hoTen"
                onChange={this.handleOnChange}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Them Nguoi Dung
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUser: user => {
      dispatch(action.actThemNguoiDung(user));
    }
  };
};

export default connect(null, mapDispatchToProps)(ThemNguoiDung);
