import axios from './axios'

export const getShow = async (id) => {
  return (await axios.get(`/shows/${id}`));
}