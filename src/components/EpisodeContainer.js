import React, { Component } from "react";
import { getShow } from "../api/get";
import Header from "./Header";
import ShowInfo from "./ShowInfo";
import Replace from "./Replace";

const MAX_SHOWS = 54999;

class EpisodeContainer extends Component {
  constructor() {
    super();

    this.state = {
      currentShow: ShowInfo.defaultProps.currentShow,
    };
  }

  async componentDidMount() {
    const res = await getShow(Math.floor(Math.random() * MAX_SHOWS));

    console.log("res.data :>> ", res.data);

    this.setState({ currentShow: res.data });
  }

  render() {
    const { currentShow } = this.state;
    return (
      <div>
        <Header />
        <ShowInfo currentShow={currentShow} />
        <Replace />
      </div>
    );
  }
}

export default EpisodeContainer;
