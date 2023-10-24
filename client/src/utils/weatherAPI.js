const API_KEY = "OTZjMzkxZDg0NTE4NGUwNjUyZGVhMm";
const url = `https://api.willyweather.com.au/v2/${API_KEY}/search.json?query=Sydney`;
export const getLocations = () => {
  return fetch(url);
};

getLocations();
