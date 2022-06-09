import { createApi } from "unsplash-js";
const ulrGenerator = (ll, query, limit) => {
  const url = `https://api.foursquare.com/v3/places/search?ll=${ll}&query=${query}&limit=${limit}`;
  return url;
};

const photosGenerator = async () => {
  const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
  });
  let formattedPhoto = [];
  try {
    const photos = await unsplash.search.getPhotos({
      query: "coffee",
      perPage: 6,
    });
    formattedPhoto = photos.response.results.map((each) => each.urls.small);
    s;
  } catch (e) {
    console.log(e);
  }
  return formattedPhoto;
};

export const fetchStore = async () => {
  const apiKey = process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY || "";
  let formattedData = [];
  try {
    const photos = await photosGenerator();
    const response = await fetch(ulrGenerator("23.73,90.37", "coffee", 6), {
      headers: {
        Accept: "application/json",
        Authorization: apiKey,
      },
    });
    if (response.ok) {
      const data = await response.json();

      formattedData = data.results.map((eachData, idx) => {
        return {
          id: eachData.fsq_id,
          name: eachData.name,
          address: eachData.location.formatted_address,
          neighbourhood:
            (eachData.location.neighborhood &&
              eachData.location.neighborhood[0]) ||
            "",
          imgUrl:
            photos.length > 0
              ? photos[idx]
              : "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        };
      });
    }
  } catch (e) {
    console.log(e.message);
  }

  return formattedData;
};
