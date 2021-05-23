import React, { Component } from "react";
import PropTypes from "prop-types";
import Image from "./Image";

import "./Episodes.css";

class Episodes extends Component {
  constructor(props) {
    super(props);

    this.getEpisodeCount = this.getEpisodeCount.bind(this);
    this.renderSeason = this.renderSeason.bind(this);
  }

  static renderEpisode(episode) {
    return (
      <div className="episode">
        <div className="image-container">
          <Image image={episode.image} />
        </div>
        <div className="info">
          <h4>{episode.name}</h4>
          <div className="text-secondary">
            Season {episode.season} | Episode {episode.number} |
            {episode.airdate}
          </div>
          <div dangerouslySetInnerHTML={{ __html: episode.summary }} />
        </div>
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
      <div className="season">
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
      <div>
        {Object.keys(episodesBySeason).map((season) =>
          this.renderSeason(season)
        )}
      </div>
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
