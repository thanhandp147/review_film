import React, { Component } from "react";
import Movie from "./../../components/movie";
import { connect } from "react-redux";
import * as action from "./../../redux/action";

class ListMovie extends Component {
  componentDidMount() {
    this.props.getListMovies();
  }

  componentWillUnmount() {
    setInterval(() => {
      console.log("componentWillUnmount");
    }, 2000);
  }

  renderHTML = () => {
    return this.props.listMovie.map((movie, index) => {
      return <Movie key={index} movie={movie} />;
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">{this.renderHTML()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listMovie: state.movieReducer.listMovie
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getListMovies: () => {
      dispatch(action.actGetListMovieAPI());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListMovie);
