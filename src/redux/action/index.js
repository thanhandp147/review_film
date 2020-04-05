import * as ActionType from "./../constants/ActionType";
import Axios from "axios";
import Store from '../store'


export const _refreshToken = () => {
  let tokenStorage = localStorage.getItem('token')
  if (tokenStorage == "1e2g4b") {
    Store.dispatch({
      type: ActionType.REFRESH_TOKEN_SUCCESS,
      payload: {
        fullname: "Lê Thành An",
        age: 21,
        job: "IT"
      }
    })
  }
}



// 
export const actThemNguoiDung = user => {
  const userAdmin = JSON.parse(localStorage.getItem("UserAdmin"));

  return dispatch => {
    Axios({
      method: "POST",
      url:
        "http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",
      data: user,
      headers: {
        Authorization: `Bearer ${userAdmin.accessToken}`
      }
    })
      .then(result => {
        console.log(result.data);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };
};

export const actGetListMovieAPI = () => {
  return dispatch => {
    Axios({
      method: "GET",
      url:
        "http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01"
    })
      .then(result => {
        dispatch({
          type: ActionType.GET_LIST_MOVIES,
          listMovie: result.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const actGetDetailMovie = id => {
  return dispatch => {
    Axios({
      method: "GET",
      url: `http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`
    })
      .then(result => {
        dispatch({
          type: ActionType.GET_DETAIL_MOVIE,
          movie: result.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const actLoginAdmin = (user, history) => {
  return dispatch => {
    Axios({
      method: "POST",
      url: "http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
      data: user
    })
      .then(result => {
        console.log(result.data);
        if (result.data.maLoaiNguoiDung === "QuanTri") {
          localStorage.setItem("UserAdmin", JSON.stringify(result.data));
          alert("Login success");
          history.push("/dashboard");
        } else {
          alert("K co quyen vao he thong");
        }
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };
};
