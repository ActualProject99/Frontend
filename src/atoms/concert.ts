import { atom } from "recoil";

export interface Concert {
  id: number;
  group: number;
  name: string;
  location: string;
  imageUrl: string;
  startDatetime: string;
  endDatetime: string;
}
export const initConcerts = [
  {
    id: 1,
    group: 1,
    name: "2022 THE BOYZ FAN CON:THE B-ROAD",
    location: "잠실실내체육관",
    imageUrl:
      "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022110715161989ac7a2a-df54-43ed-8d46-c956e58877d0.png/melon/resize/180x250/strip/true",
    startDatetime: "2022-11-11T13:00",
    endDatetime: "2022-11-11T14:30",
  },
  {
    id: 2,
    group: 2,
    name: "MAMAMOO WORLD TOUR 〈MY CON〉-SEOUL",
    location: "올림픽공원 올림픽홀",
    imageUrl:
      "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/10/202210211342336f3111f8-1152-498f-b133-78a61cce0f71.jpg/melon/resize/180x250/strip/true",
    startDatetime: "2022-11-20T09:00",
    endDatetime: "2022-11-20T11:30",
  },
  {
    id: 3,
    group: 3,
    name: "제56회 라이브 클럽 데이 Extended",
    location: "LIVE CLUB DAY",
    imageUrl:
      "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022111413080058d253d4-2077-4790-8ac8-525a3b224366.png/melon/resize/180x250/strip/true",
    startDatetime: "2022-11-20T17:00",
    endDatetime: "2022-11-20T18:30",
  },
  {
    id: 3,
    group: 3,
    name: "제56회 라이브 클럽 데이 Extended",
    location: "LIVE CLUB DAY",
    imageUrl:
      "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022111413080058d253d4-2077-4790-8ac8-525a3b224366.png/melon/resize/180x250/strip/true",
    startDatetime: "2022-11-20T17:00",
    endDatetime: "2022-11-20T18:30",
  },
  {
    id: 3,
    group: 3,
    name: "제56회 라이브 클럽 데이 Extended",
    location: "LIVE CLUB DAY",
    imageUrl:
      "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022111413080058d253d4-2077-4790-8ac8-525a3b224366.png/melon/resize/180x250/strip/true",
    startDatetime: "2022-11-20T17:00",
    endDatetime: "2022-11-20T18:30",
  },
  {
    id: 3,
    group: 3,
    name: "제56회 라이브 클럽 데이 Extended",
    location: "LIVE CLUB DAY",
    imageUrl:
      "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022111413080058d253d4-2077-4790-8ac8-525a3b224366.png/melon/resize/180x250/strip/true",
    startDatetime: "2022-11-20T17:00",
    endDatetime: "2022-11-20T18:30",
  },
  {
    id: 3,
    group: 3,
    name: "제56회 라이브 클럽 데이 Extended",
    location: "LIVE CLUB DAY",
    imageUrl:
      "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022111413080058d253d4-2077-4790-8ac8-525a3b224366.png/melon/resize/180x250/strip/true",
    startDatetime: "2022-11-20T17:00",
    endDatetime: "2022-11-20T18:30",
  },
  {
    id: 3,
    group: 3,
    name: "제56회 라이브 클럽 데이 Extended",
    location: "LIVE CLUB DAY",
    imageUrl:
      "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022111413080058d253d4-2077-4790-8ac8-525a3b224366.png/melon/resize/180x250/strip/true",
    startDatetime: "2022-11-20T17:00",
    endDatetime: "2022-11-20T18:30",
  },
  {
    id: 3,
    group: 3,
    name: "제56회 라이브 클럽 데이 Extended",
    location: "LIVE CLUB DAY",
    imageUrl:
      "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022111413080058d253d4-2077-4790-8ac8-525a3b224366.png/melon/resize/180x250/strip/true",
    startDatetime: "2022-11-20T17:00",
    endDatetime: "2022-11-20T18:30",
  },
  {
    id: 3,
    group: 3,
    name: "제56회 라이브 클럽 데이 Extended",
    location: "LIVE CLUB DAY",
    imageUrl:
      "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022111413080058d253d4-2077-4790-8ac8-525a3b224366.png/melon/resize/180x250/strip/true",
    startDatetime: "2022-11-20T17:00",
    endDatetime: "2022-11-20T18:30",
  },
  {
    id: 3,
    group: 3,
    name: "제56회 라이브 클럽 데이 Extended",
    location: "LIVE CLUB DAY",
    imageUrl:
      "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022111413080058d253d4-2077-4790-8ac8-525a3b224366.png/melon/resize/180x250/strip/true",
    startDatetime: "2022-11-20T17:00",
    endDatetime: "2022-11-20T18:30",
  },
  {
    id: 3,
    group: 3,
    name: "제56회 라이브 클럽 데이 Extended",
    location: "LIVE CLUB DAY",
    imageUrl:
      "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022111413080058d253d4-2077-4790-8ac8-525a3b224366.png/melon/resize/180x250/strip/true",
    startDatetime: "2022-11-20T17:00",
    endDatetime: "2022-11-20T18:30",
  },
  {
    id: 3,
    group: 3,
    name: "제56회 라이브 클럽 데이 Extended",
    location: "LIVE CLUB DAY",
    imageUrl:
      "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022111413080058d253d4-2077-4790-8ac8-525a3b224366.png/melon/resize/180x250/strip/true",
    startDatetime: "2022-11-20T17:00",
    endDatetime: "2022-11-20T18:30",
  },
  {
    id: 4,
    group: 4,
    name: "2022 장동우 1st Fan Meeting 〈DONGWOO TIMES〉",
    location: "연세대학교 백주년기념관 콘서트홀",
    imageUrl:
      "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/11/2022110418290021e3e9b2-4f68-4c27-b420-b25dac083058.jpg/melon/resize/180x250/strip/true",
    startDatetime: "2022-11-09T13:00",
    endDatetime: "2022-11-09T14:30",
  },
  {
    id: 5,
    group: 5,
    name: "2022 남지현 팬미팅 〈어서 와요，우리 집에！〉 ",
    location: "성신여대 운정그린캠퍼스 대강당",
    imageUrl:
      "https://cdnticket.melon.co.kr/resource/image/upload/product/2022/10/2022102419024583fa1c1c-1659-466f-92e3-0b85320851dc.jpg/melon/resize/180x250/strip/true",
    startDatetime: "2022-11-13T14:00",
    endDatetime: "2022-11-13T14:30",
  },
];

export const allConcerts = atom<Concert[]>({
  key: "allConcerts",
  default: initConcerts,
});
export const calendarConcerts = atom<Concert[]>({
  key: "calendarConcerts",
  default: initConcerts,
});
export const showingConcerts = atom<Concert[]>({
  key: "showingConcerts",
  default: initConcerts,
});
