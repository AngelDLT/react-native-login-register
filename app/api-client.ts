import { ArtistResource } from "@/types/artist";

const API_KEY = "ec180db585ec3b46fac7c0ab094596d6";
const URL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&api_key=${API_KEY}&format=json`;

function getMusicData() {
  return fetch(URL, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => data.topartists.artist)
    .then((artist) =>
      artist.map((artist: ArtistResource) => {
        return {
          id: artist.mbid,
          name: artist.name,
          imageUrl: artist.image[0]["#text"],
        };
      })
    );
}

export { getMusicData };
