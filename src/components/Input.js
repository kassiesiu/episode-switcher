import React, { Component } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import PropTypes from "prop-types";

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
    };

    this.setValue = this.setValue.bind(this);
    this.click = this.click.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(target) {
    // fixed bug where pressing enter would refresh page
    if (target.charCode === 13) {
      target.preventDefault();
      this.click();
    }
  }

  setValue(e) {
    this.setState({
      value: e.currentTarget.value,
    });
  }

  click() {
    const { value } = this.state;
    const { onClick } = this.props;
    onClick(value);
  }

  render() {
    const { value } = this.state;
    const { buttonText } = this.props;
    return (
      <Form inline>
        <FormControl
          type="text"
          value={value}
          onChange={this.setValue}
          onKeyPress={this.handleKeyPress}
        />
        <Button variant="secondary" onClick={this.click}>
          {buttonText}
        </Button>
      </Form>
    );
  }
}

Input.propTypes = {
  onClick: PropTypes.func,
  buttonText: PropTypes.string,
};

Input.defaultProps = {
  onClick: () => {},
  buttonText: PropTypes.string,
};

export default Input;
