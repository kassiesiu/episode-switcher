import React, { Component } from "react";
import { getShowById, search } from "../api/get";
import Header from "./Header";
import ShowInfo from "./ShowInfo";
import Replace from "./Replace";
import Episodes from "./Episodes";
import formatEpisodesBySeasons from "../utils/format-episodes";

const MAX_SHOWS = 54999;

class EpisodeContainer extends Component {
  constructor() {
    super();

    this.state = {
      currentShow: ShowInfo.defaultProps.currentShow,
      episodesBySeason: {},
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
    const { episodesBySeason } = this.state;

    const {
      data: {
        _embedded: { episodes },
      },
    } = await search(value);

    // error handling

    const formatted = formatEpisodesBySeasons(episodes);

    const episodeToReplaceIndex = episodesBySeason[season].findIndex(
      (e) => e.number === episode
    );

    console.log("episodeToReplaceIndex :>> ", episodeToReplaceIndex);

    const newEpisodesList = [...episodesBySeason[season]];
    const replaceEpisode = formatted[season].find((e) => e.number === episode);
    newEpisodesList[episodeToReplaceIndex] = replaceEpisode;

    console.log("newEpisodesList :>> ", newEpisodesList);

    this.setState((prevState) => ({
      ...prevState,
      episodesBySeason: {
        ...prevState.episodesBySeason,
        [season]: newEpisodesList,
      },
    }));
  }

  render() {
    const { currentShow, episodesBySeason } = this.state;
    return (
      <div>
        <Header onSearch={this.search} />
        <ShowInfo currentShow={currentShow} />
        <Replace episodesBySeason={episodesBySeason} onReplace={this.replace} />
        <Episodes episodesBySeason={episodesBySeason} />
      </div>
    );
  }
}

export default EpisodeContainer;
