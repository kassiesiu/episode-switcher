import React, { Component } from "react";
import { Image, Container } from "react-bootstrap";
import PropTypes from "prop-types";

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
      <Container className="main-container">
        <Image
          className="image"
          src={currentShow.image.original} // conditional for when image is null
        />
        <div className="info">
          <h1>{currentShow.name}</h1>
          {this.renderSubText()}
          <div>{currentShow.summary}</div>
        </div>
      </Container>
    );
  }
}

ShowInfo.propTypes = {
  currentShow: PropTypes.shape({
    image: PropTypes.shape({
      original: PropTypes.string,
    }),
    genres: PropTypes.arrayOf(PropTypes.string),
    premiered: PropTypes.string,
    name: PropTypes.string,
    summary: PropTypes.string,
  }),
};

ShowInfo.defaultProps = {
  currentShow: {
    image: {
      original: "",
    },
    genres: [],
    premiered: "",
    name: "",
    summary: "",
  },
};

export default ShowInfo;
