import React, { Component } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";

class Replace extends Component {
  renderSeasonDropdownItems() {}

  render() {
    return (
      <div className="Replace">
        Replace
        <DropdownButton id="dropdown-basic-button" title="Season 1">
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </DropdownButton>
        <DropdownButton id="dropdown-basic-button" title="Episode 1">
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </DropdownButton>
      </div>
    );
  }
}

Replace.propTypes = {
  episodes: PropTypes.arrayOf(PropTypes.string),
};

Replace.defaultProps = {
  episodes: [],
};

export default Replace;
