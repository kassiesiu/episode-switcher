import React from "react";
import { Image as ImageBootstrap } from "react-bootstrap";
import PropTypes from "prop-types";

import "./Image.css";

const Image = ({ image, ...props }) => {
  console.log("image :>> ", image);
  if (image) {
    const newProps = { ...props, src: image.original };
    return <ImageBootstrap {...newProps} />;
  }
  return <div className="empty-image" />;
};

Image.propTypes = {
  image: PropTypes.shape({ original: "" }),
};

Image.defaultProps = {
  image: {},
};

export default Image;
