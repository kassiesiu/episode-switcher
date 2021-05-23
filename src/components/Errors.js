import React from "react";
import { Alert } from "react-bootstrap";
import PropTypes from "prop-types";

const Errors = (props) => {
  const { error } = props;
  return <div>{error ? <Alert variant="danger">{error}</Alert> : ""}</div>;
};

Errors.propTypes = {
  error: PropTypes.string,
};

Errors.defaultProps = {
  error: "",
};

export default Errors;
