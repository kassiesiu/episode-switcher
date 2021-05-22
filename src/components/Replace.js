import React, { Component } from "react";
import { Container, DropdownButton, Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";
import Input from "./Input";

import "./Replace.css";
import { search } from "../api/get";

class Replace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSeason: 1, // change this
      selectedEpisode: 1,
    };

    this.selectSeason = this.selectSeason.bind(this);
    this.selectEpisode = this.selectEpisode.bind(this);
    this.replace = this.replace.bind(this);
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

  async replace(value) {
    const { onReplace } = this.props;
    const { selectedSeason, selectedEpisode } = this.state;
    onReplace(value, selectedSeason, selectedEpisode);
  }

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
    const { selectedSeason, selectedEpisode } = this.state;
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
        <Input buttonText="Replace" onClick={this.replace} />
      </Container>
    );
  }
}

Replace.propTypes = {
  episodesBySeason: PropTypes.objectOf(
    PropTypes.arrayOf(PropTypes.shape({ season: PropTypes.number }))
  ),
  onReplace: PropTypes.func,
};

Replace.defaultProps = {
  episodesBySeason: {},
  onReplace: () => {},
};

export default Replace;
