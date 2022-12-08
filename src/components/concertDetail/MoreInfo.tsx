import ArtistApi from "../../apis/query/ArtistAPI";
import { ConcertProps } from "../../types";
import { useNavigate } from "react-router-dom";

const MoreInfo = ({ concert }: ConcertProps) => {
  const { data: artists } = ArtistApi.GetArtist();
  const moreInfoConcert = JSON.parse(concert.concertInfo);
  const navigate = useNavigate();
  console.log("at", artists);
  return (
    <div className="px-5 py-8">
      <p className="text-2xl mb-7 text-accent-main font-bold">출연진</p>
      <div className="flex gap-x-7 mb-10">
        {artists &&
          artists.map((artist) =>
            concert.artistId === artist.artistId ? (
              <div
                className="grid content-center justify-start justify-items-center items-center gap-y-2 cursor-pointer"
                onClick={() => navigate(`/artist/${artist.artistId}`)}
              >
                <img
                  title={artist.artistName}
                  className="w-24 h-24 rounded-[50%]"
                  alt="artist"
                  src={artist.artistImg}
                />
                {artist.artistName.length < 20 ? (
                  <p className="font-bold ">{artist.artistName}</p>
                ) : (
                  <p
                    title={artist.artistName}
                    className="w-32 font-bold overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    {artist.artistName}
                  </p>
                )}
              </div>
            ) : null
          )}
      </div>
      <div className="mb-10">
        <p className="text-2xl mb-5 text-accent-main font-bold">공연기간</p>
        <p className="pl-1 font-bold">{concert?.concertDate}</p>
      </div>
      <div className="mb-10">
        <p className="text-2xl mb-5 text-accent-main font-bold">작품설명</p>
        {moreInfoConcert.map((moreInfo: { url: string }) => (
          <div className="flex justify-center items-center">
            <img alt="concertInfo" src={moreInfo.url} className="pl-1" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoreInfo;
