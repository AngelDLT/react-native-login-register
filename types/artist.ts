export interface Artist {
  id: number;
  name: string;
  imageUrl: string;
}

export interface ArtistResource {
  id: number;
  name: string;
  mbid: string;
  image: [
    ImageUrl //maybe any
  ];
}

interface ImageUrl {
  "#text": string;
}
