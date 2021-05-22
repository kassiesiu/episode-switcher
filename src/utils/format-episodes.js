const formatEpisodesBySeasons = (episodes) =>
  episodes.reduce((episodesBySeason, episode) => {
    const { season } = episode;
    if (!episodesBySeason[season]) {
      episodesBySeason[season] = [episode];
    } else {
      episodesBySeason[season].push(episode);
    }

    return episodesBySeason;
  }, {});

export default formatEpisodesBySeasons;
