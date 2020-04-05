import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as action from "./../../redux/action";
import Movie from "./../../components/movie";

function About(props) {
  useEffect(() => {
    //Goi action
    props.getListMovie();
  }, []);

  const renderHTML = () => {
    return props.listMovies.map((item, index) => {
      return <Movie key={index} movie={item} />;
    });
  };

  return (
    <div className="container">
      <div className="row">{renderHTML()}</div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    listMovies: state.movieReducer.listMovie
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getListMovie: () => {
      dispatch(action.actGetListMovieAPI());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
