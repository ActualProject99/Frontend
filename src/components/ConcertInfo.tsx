import React from "react";

const ConcertInfo = ({
  concert,
}: {
  concert: {
    posterUrl: string;
    title: string;
    showTimes: string[];
    location: string;
    runningTime: string;
    viewableGrade: string;
    genre: string;
    latitude: number;
    longitude: number;
    ticketingUrl: {
      melon: string;
    };
  };
}) => {
  return (
    <div>
      <img alt="poster" src={concert.posterUrl} />
      <div>
        <p>{concert.title}</p>
      </div>
      <div>
        <dl className="flex flex-wrap flex-col">
          <dt>티켓팅기간</dt>
          <dd>{concert.showTimes}</dd>
          <dt>관람 시간</dt>
          <dd>{concert.runningTime}</dd>
          <dt>장르</dt>
          <dd>{concert.genre}</dd>
          <dt>관람등급</dt>
          <dd>{concert.viewableGrade}</dd>
          <dt>공연장</dt>
          <dd>{concert.location}</dd>
        </dl>
      </div>
    </div>
  );
};

export default ConcertInfo;
