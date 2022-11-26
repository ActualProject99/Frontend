import React from "react";
import { useParams } from "react-router-dom";
import ArtistApi from "../apis/query/ArtistAPI";
import ArtistInfo from "../components/artists/ArtistInfo";

const Artist = () => {
  const { data: artists } = ArtistApi.GetArtist();
  const { id } = useParams();
  console.log("id", id);

  return (
    <>
      {artists &&
        artists.map((artist) =>
          artist.artistId === Number(id) ? (
            <ArtistInfo key={artist.id} artist={artist} />
          ) : null
        )}
    </>
  );
};

export default Artist;
