import axios from "./axios";

export const getShowById = (id) => axios.get(`/shows/${id}?embed=episodes`);

export const search = (query) =>
  axios.get(`/singlesearch/shows?q=${query}&embed=episodes`);
