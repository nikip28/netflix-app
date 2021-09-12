const baseUrl = "http://localhost:3010";

export const getCategories = () => {
  return fetch(`${baseUrl}/categories`);
};

export const getMovieListByCategory = (params = {}) => {
  return fetch(`${baseUrl}/category?` + new URLSearchParams(params));
};
