import axios from "axios";

export const fetchDetailItem = (type, id) => {
  return axios.get(`https://rickandmortyapi.com/api/${type}/${id}`).then((res) => res.data);
};
