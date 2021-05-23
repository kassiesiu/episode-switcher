import React, { Component } from "react";
import PropTypes from "prop-types";
import Image from "./Image";

import "./ShowInfo.css";

class ShowInfo extends Component {
  renderSubText() {
    const { currentShow } = this.props;
    const genres = currentShow.genres.join(", ");
    const premiered = `Premiered on ${currentShow.premiered}`;

    return (
      <div className="text-secondary">
        {genres.length ? `${genres} | ${premiered}` : premiered}
      </div>
    );
  }

  render() {
    const { currentShow } = this.props;
    return (
      <div className="main-container">
        <Image image={currentShow.image} />
        <div className="info">
          <h1>{currentShow.name}</h1>
          {this.renderSubText()}
          <div dangerouslySetInnerHTML={{ __html: currentShow.summary }} />
        </div>
      </div>
    );
  }
}

ShowInfo.propTypes = {
  currentShow: PropTypes.shape({
    genres: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.shape({
      original: PropTypes.string,
    }),
    premiered: PropTypes.string,
    name: PropTypes.string,
    summary: PropTypes.string,
  }),
};

ShowInfo.defaultProps = {
  currentShow: {
    genres: [],
    image: {
      original: "",
    },
    premiered: "",
    name: "",
    summary: "",
  },
};

export default ShowInfo;
