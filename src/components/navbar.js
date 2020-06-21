import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux'
import Store from '../redux/store'
import * as ActionType from '../redux/constants/ActionType'
import { BASE_URL_AVATAR } from '../constants/url'

class navbar extends Component {
  constructor() {
    super();

    let isLogin
    if (localStorage.getItem('token')) {
      isLogin = true
    } else {
      isLogin = false
    }

    this.state = {
      isLogin: isLogin
    }
  }
  _handleLogout = (e) => {
    localStorage.removeItem("token");
    Store.dispatch({
      type: ActionType.LOG_OUT,
      payload: null
    })
    e.preventDefault()
  }

  _handleAlertToLogin = () => {
    alert("Bạn cần phải đăng nhập để thực hiện chức năng này")
  }

  handleClick = (e) => {
    if (!localStorage.getItem('token')) {
      alert('Bạn cần phải đăng nhập để thực hiện chức năng này')
      return e.preventDefault()
    }
  }

  _handleOpenModalLogin = () => {
    Store.dispatch({
      type: ActionType.SHOW_MODAL_LOGIN,
      payload: null
    })
  }

  _handleShowProfile = () => {
    Store.dispatch({
      type: ActionType.SHOW_MODAL_PROFILE,
      payload: null
    })
  }


  render() {
    console.log(this.props.infoUser);

    return (
      <nav className="navbar fixed-top navbar-expand-md " style={{ backgroundColor: '#0f2234' }} >
        <div className="container">

          <a className="navbar-brand" href="#" style={{ color: 'red' }} >
            <img
            style={{
              height:50
            }}
            src="https://boostifythemes.com/demo/html/bustter/images/logo1.png" alt="" />
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  exact
                  className="nav-link"
                  style={{
                    color: 'grey',
                    fontWeight: '500',
                    fontSize: 20
                  }}
                  to="/">
                  Trang chủ
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  onClick={this.handleClick}
                  activeClassName="active"
                  className="nav-link"
                  style={{
                    color: 'grey',
                    fontWeight: '500',
                    fontSize: 20
                  }}
                  to="/insert-post"
                >
                  Đăng bài
              </NavLink>
              </li>
              {/* {
                !localStorage.getItem('token') ?
                  <li className="nav-item">
                    <NavLink
                      activeClassName="active"
                      className="nav-link"
                      to="/insert-post">
                      Đăng bài
                    </NavLink>
                  </li>
                  : <li class="nav-item">
                    <a onClick={() => alert('Bạn cần phải đăng nhập để thực hiện chức năng này')} class="nav-link" href="#">Đăng bài</a>
                  </li>
              } */}

              {/* <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  className="nav-link"
                  to="/list-movie"
                >
                  List Movie
              </NavLink>
              </li> */}
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            {/* {
              this.props.infoUser && this.props.infoUser.fullname !== undefined ?
                <div style={{display:"flex", alignItems:"center", marginLeft:60g}}>
                  <p style={{color:"#FFFFFF", fontWeight:'500', margin:0}}>{`Xin chào ${this.props.infoUser.fullname}`}</p>

                </div>
                : <button style={{ marginLeft: 60 }} className="btn btn-primary my-2 my-sm-0" data-toggle="modal" data-target="#exampleModal">
                  Đăng nhập
                </button>
            } */}
            {
              this.props.infoUser && this.props.infoUser.username !== undefined ?
                <ul style={{ marginLeft: 60 }} class="navbar-nav">
                  <li className="nav-item dropdown" style={{display:'flex'}}>
                    {/* <div style={{display:'flex'}}> */}
                      <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        overflow: 'hidden',
                        marginRight:10
                      }}>
                        <img
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
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
                      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color:'#fff', fontWeight:'500', fontSize:20}}>
                        {`${this.props.infoUser.first_name} ${this.props.infoUser.last_name}`}
                      </a>
                    {/* </div> */}
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <a onClick={this._handleLogout} class="dropdown-item" href="#">
                        {/* <NavLink
                          activeClassName="active"
                          className="nav-link dropdown-item"
                          to="#"
                          style={{ color: '#000000' }}
                        >
                        </NavLink> */}
                        Đăng xuất
                      </a>
                      <a onClick={this._handleShowProfile} class="dropdown-item" href="#">
                        {/* <NavLink
                          activeClassName="active"
                          className="nav-link dropdown-item"
                          to="#"
                          style={{ color: '#000000' }}
                        >
                        </NavLink> */}
                        Xem profile
                      </a>
                    </div>
                  </li>
                </ul>
                :
                <button onClick={this._handleOpenModalLogin} style={{ marginLeft: 60 }} className="btn btn-primary my-2 my-sm-0" >
                  Đăng nhập
                </button>
            }
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  infoUser: state.userReducer.infoUser
});

export default connect(mapStateToProps, null)(navbar);