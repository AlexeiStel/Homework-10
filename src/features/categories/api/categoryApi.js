import axios from 'axios';

export const fetchCategoryItems = (category, page) => {
    return axios.get(`https://rickandmortyapi.com/api/${category}?page=${page}`);
};
