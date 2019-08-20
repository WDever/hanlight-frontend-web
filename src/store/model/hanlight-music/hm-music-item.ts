export interface HanlightMusicAlbum {
  name: string;
  album_id: number;
  artist: string;
  image_url: string;
}

export interface HanlightMusicItem {
  title: string;
  album: HanlightMusicAlbum;
}
