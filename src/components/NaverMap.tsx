import React, { useEffect, useRef, useState } from "react";

export const NaverMap = ({
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
  const mapRef = useRef<HTMLElement | null | any>(null);
  useEffect(() => {
    mapRef.current = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(concert.latitude, concert.longitude),
      zoomControl: false,
    });

    const currentMarker = new naver.maps.Marker({
      position: new naver.maps.LatLng(concert.latitude, concert.longitude),
      map: mapRef.current,
      // 원하는 이미지로 마커 커스텀
      icon: {
        url: "../image/Marker.png",
        size: new naver.maps.Size(50, 52),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(25, 26),
      },
    });

    var contentString = [
      '<div className="iw_inner" style="width:120px;text-align:center;padding:10px;">',
      `<h3> ${concert.location} </h3>`,
      "</div>",
    ].join("");

    var infowindow = new naver.maps.InfoWindow({
      content: contentString,
    });

    naver.maps.Event.addListener(currentMarker, "click", function (e) {
      if (infowindow.getMap()) {
        infowindow.close();
      } else {
        infowindow.open(mapRef.current, currentMarker);
      }
    });
    infowindow.open(mapRef.current, currentMarker);

    naver.maps.Event.addListener(currentMarker, "click", (e: any) => {
      const mapLatLng = new naver.maps.LatLng(
        concert.latitude,
        concert.longitude
      );

      // 선택한 마커로 부드럽게 이동합니다.
      mapRef.current.panTo(mapLatLng, e?.coord);
    });
  }, []);

  //지도 사이즈 관련 스타일
  const mapStyle = {
    width: "50%",
    height: "500px",
    margin: "auto",
  };

  return (
    <React.Fragment>
      <h1>지도 나왔다!</h1>
      <div id="map" className="relative z-0" style={mapStyle}></div>
    </React.Fragment>
  );
};
