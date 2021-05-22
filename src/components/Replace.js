import React, { Component } from "react";
import {
  Button,
  Container,
  DropdownButton,
  Dropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import PropTypes from "prop-types";

import "./Replace.css";

class Replace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSeason: 1, // change this
      selectedEpisode: 1,
      replaceInput: "",
    };

    this.selectSeason = this.selectSeason.bind(this);
    this.selectEpisode = this.selectEpisode.bind(this);
  }

  static getDropdownItems(items, title, onClick) {
    // reusable function to generate dropdown items
    return items.map((item) => (
      <Dropdown.Item key={item} idx={item} onClick={onClick}>
        {title} {item}
      </Dropdown.Item>
    ));
  }

  selectSeason(e) {
    this.setState({
      selectedSeason: e.currentTarget.getAttribute("idx"),
      selectedEpisode: 1,
    });
  }

  selectEpisode(e) {
    this.setState({
      selectedEpisode: e.currentTarget.getAttribute("idx"),
    });
  }

  handleKeyPress(target) {
    // fixed bug where pressing enter would refresh page
    if (target.charCode === 13) {
      target.preventDefault();
      this.replace();
    }
  }

  replace() {}

  renderSeasonDropdownItems() {
    const { episodesBySeason } = this.props;
    return Replace.getDropdownItems(
      Object.keys(episodesBySeason),
      "Season",
      this.selectSeason
    );
  }

  renderEpisodeDropdownItems() {
    const { selectedSeason } = this.state;
    const { episodesBySeason } = this.props;

    const episodesWithinSeason = episodesBySeason[selectedSeason] || [];

    return Replace.getDropdownItems(
      episodesWithinSeason.map(({ number }) => number),
      "Episode",
      this.selectEpisode
    );
  }

  render() {
    const { selectedSeason, selectedEpisode, replaceInput } = this.state;
    return (
      <Container className="replace-container">
        Replace
        <DropdownButton
          id="dropdown-basic-button"
          title={`Season ${selectedSeason}`}
        >
          {this.renderSeasonDropdownItems()}
        </DropdownButton>
        <DropdownButton
          id="dropdown-basic-button"
          title={`Episode ${selectedEpisode}`}
        >
          {this.renderEpisodeDropdownItems()}
        </DropdownButton>
        with
        <Form inline>
          <FormControl
            type="text"
            value={replaceInput}
            onChange={this.setReplaceInput}
            onKeyPress={this.handleKeyPress}
          />
          <Button variant="secondary" onClick={this.replace}>
            Replace
          </Button>
        </Form>
      </Container>
    );
  }
}

Replace.propTypes = {
  episodesBySeason: PropTypes.objectOf(
    PropTypes.arrayOf(PropTypes.shape({ season: PropTypes.number }))
  ),
};

Replace.defaultProps = {
  episodesBySeason: {},
};

export default Replace;
