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

    console.log("object :>> ", formatEpisodesBySeasons(episodes));

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

  render() {
    const { currentShow, episodesBySeason } = this.state;
    return (
      <div>
        <Header onSearch={this.search} />
        <ShowInfo currentShow={currentShow} />
        <Replace episodesBySeason={episodesBySeason} />
        <Episodes episodesBySeason={episodesBySeason} />
      </div>
    );
  }
}

export default EpisodeContainer;
