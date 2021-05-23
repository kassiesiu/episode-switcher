import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { getShowById, search } from "../api/get";
import Header from "./Header";
import ShowInfo from "./ShowInfo";
import Replace from "./Replace";
import Episodes from "./Episodes";
import Errors from "./Errors";

import formatEpisodesBySeasons from "../utils/format-episodes";

const MAX_SHOWS = 54999;

class EpisodeContainer extends Component {
  constructor() {
    super();

    this.state = {
      currentShow: ShowInfo.defaultProps.currentShow,
      episodesBySeason: {},
      error: Errors.defaultProps.errors,
    };

    this.search = this.search.bind(this);
    this.replace = this.replace.bind(this);
  }

  async componentDidMount() {
    // some random ids in this range will be invalid, so make sure if it is to refresh
    const showId = Math.floor(Math.random() * MAX_SHOWS);

    const {
      data: {
        _embedded: { episodes },
        ...currentShow
      },
    } = await getShowById(showId);

    this.setState({
      currentShow,
      episodesBySeason: formatEpisodesBySeasons(episodes),
    });
  }

  async search(value) {
    const {
      data: {
        _embedded: { episodes },
        ...currentShow
      },
    } = await search(value);

    this.setState({
      currentShow,
      episodesBySeason: formatEpisodesBySeasons(episodes),
    });
  }

  async replace(value, season, episode) {
    try {
      const { episodesBySeason } = this.state;

      const {
        data: {
          _embedded: { episodes },
        },
      } = await search(value);

      const formatted = formatEpisodesBySeasons(episodes);

      const episodeToReplaceIndex = episodesBySeason[season].findIndex(
        (e) => Number(e.number) === Number(episode)
      );

      const replaceEpisode = formatted[season].find(
        (e) => Number(e.number) === Number(episode)
      );

      if (!replaceEpisode) {
        // if there is no replace episode, that means the searched show doesn't have it
        this.setState({
          error: `There is no matching episode for the season, episode, and show provided.`,
        });

        return;
      }

      const newEpisodesList = [...episodesBySeason[season]];

      newEpisodesList[episodeToReplaceIndex] = replaceEpisode;

      this.setState((prevState) => ({
        ...prevState,
        episodesBySeason: {
          ...prevState.episodesBySeason,
          [season]: newEpisodesList,
        },
        error: "",
      }));
    } catch (e) {
      // if error, that means show does not exist
      this.setState({
        error: `There is no show matching "${value}"`,
      });
    }
  }

  render() {
    const { currentShow, episodesBySeason, error } = this.state;
    return (
      <div>
        <Header onSearch={this.search} />
        <Container>
          <ShowInfo currentShow={currentShow} />
          <Replace
            episodesBySeason={episodesBySeason}
            onReplace={this.replace}
          />
          <Errors error={error} />
          <Episodes episodesBySeason={episodesBySeason} />
        </Container>
      </div>
    );
  }
}

export default EpisodeContainer;
