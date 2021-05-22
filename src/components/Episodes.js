import React, { Component } from "react";
import { Image, Container } from "react-bootstrap";
import PropTypes from "prop-types";

class Episodes extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   searchInput: "",
    // };

    this.getEpisodeCount = this.getEpisodeCount.bind(this);
    this.renderSeason = this.renderSeason.bind(this);
  }

  static renderEpisode(episode) {
    return (
      <div>
        {episode.image ? (
          <Image
            className="image"
            src={episode.image.original} // conditional for when image is null
          />
        ) : (
          <div>imghere</div>
        )}
        <h4>{episode.name}</h4>
        <div className="text-secondary">
          Season {episode.season} | Episode {episode.number} | {episode.airdate}
        </div>
        <div>{episode.summary}</div>
      </div>
    );
  }

  getEpisodeCount(season) {
    const { episodesBySeason } = this.props;
    const count = episodesBySeason[season].length;
    return count === 1 ? "1 Episode" : `${count} Episodes`;
  }

  renderSeason(season) {
    const { episodesBySeason } = this.props;
    const episodesWithinSeason = episodesBySeason[season];

    return (
      <div>
        <h1>Season {season}</h1>
        <div className="text-secondary">{`${this.getEpisodeCount(
          season
        )} | Aired ${episodesWithinSeason[0].airdate}`}</div>
        <hr />
        {episodesWithinSeason.map(Episodes.renderEpisode)}
      </div>
    );
  }

  render() {
    const { episodesBySeason } = this.props;
    return (
      <Container>
        {Object.keys(episodesBySeason).map((season) =>
          this.renderSeason(season)
        )}
      </Container>
    );
  }
}

Episodes.propTypes = {
  // {1: [{...episodeInfo}], 2: [{...episodeInfo}]}
  episodesBySeason: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({ season: PropTypes.number, airdate: PropTypes.string })
    )
  ),
};

Episodes.defaultProps = {
  episodesBySeason: {},
};

export default Episodes;