import React, { Component } from "react";
import { getEpisodes, getShowById, search } from "../api/get";
import Header from "./Header";
import ShowInfo from "./ShowInfo";
import Replace from "./Replace";

const MAX_SHOWS = 54999;

class EpisodeContainer extends Component {
  constructor() {
    super();

    this.state = {
      currentShow: ShowInfo.defaultProps.currentShow,
      episodes: [],
    };

    this.search = this.search.bind(this);
  }

  async componentDidMount() {
    console.log("here");
    // some random ids in this range will be invalid, so make sure if it is to refresh
    const showId = Math.floor(Math.random() * MAX_SHOWS);
    await this.refreshShow(showId);
  }

  async refreshShow(showId) {
    const {
      data: {
        _embedded: { episodes },
        ...currentShow
      },
    } = await getShowById(showId);

    this.setState({ currentShow, episodes });
  }

  async search(value) {
    const {
      data: {
        _embedded: { episodes },
        ...currentShow
      },
    } = await search(value);

    console.log("episodes :>> ", episodes);
    console.log("currentShow :>> ", currentShow);
    this.setState({ currentShow, episodes });
  }

  render() {
    const { currentShow, episodes } = this.state;
    return (
      <div>
        <Header onSearch={this.search} />
        <ShowInfo currentShow={currentShow} />
        <Replace episodes={episodes} />
      </div>
    );
  }
}

export default EpisodeContainer;
