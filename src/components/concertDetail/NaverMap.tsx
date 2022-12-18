import React, { useEffect, useRef } from "react";
import Marker from "../../image/Marker.png";
import { IGetLocation } from "../../types";

interface ConcertProps {
  location: IGetLocation | undefined;
}

export const NaverMap = ({ location }: ConcertProps) => {
  const mapRef = useRef<HTMLElement | null | any>(null);
  useEffect(() => {
    if (location) {
      mapRef.current = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(location.latitude, location.longitude),
        zoomControl: false,
        zoom: 18,
      });

      const currentMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(location.latitude, location.longitude),
        map: mapRef.current,
        // 원하는 이미지로 마커 커스텀
        icon: {
          content: [
            '<div className="" >',
            `<img src='${Marker}'style="width:2rem;height:2rem;"/>`,
            "</div>",
          ].join(""),
          // url: "../image/Marker.png",
          size: new naver.maps.Size(50, 52),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(15, 26),
        },
        animation: naver.maps.Animation.BOUNCE,
      });

      // 공연장 이름 지도에서 나타나게 하기
      var contentString = [
        '<div className="iw_inner" style="width:120px;text-align:center;padding:10px;">',
        `<p> ${location?.locationName} </p>`,
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
          location?.latitude,
          location.longitude
        );

        // 선택한 마커로 부드럽게 이동합니다.
        mapRef.current.panTo(mapLatLng, e?.coord);
      });
    }
  }, [location?.latitude, location?.locationName, location?.longitude]);

  //지도 사이즈 관련 스타일
  const mapStyle = {
    width: "100%",
    height: "500px",
    margin: "auto",
  };

  return (
    <React.Fragment>
      <div className="px-5 py-10">
        <div className="flex gap-7">
          <img
            className="flex, justify-items-center, items-center w-60 h-44"
            style={{
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
            }}
            alt="hallImg"
            src={location?.locationImg}
          />
          <div className="flex flex-wrap flex-col  gap-y-3 py-2">
            <p className="text-xl mb-3 font-bold">{location?.locationName}</p>
            <p>{location?.locationAddress}</p>
            <p>{location?.locationCall}</p>
            <p
              className="cursor-pointer"
              onClick={() => window.open(location?.locationUrl)}
            >
              {location?.locationUrl}
            </p>
          </div>
        </div>
        <div>
          <p className="flex items-center justify-start text-accent-main font-bold text-xl w-60 h-20 pl-1">
            공연장 위치
          </p>
          <div id="map" className="relative z-0" style={mapStyle}></div>
        </div>
      </div>
    </React.Fragment>
  );
};
