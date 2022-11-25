import { useMutation, useQuery } from "@tanstack/react-query";
import { deactivate, activate } from "../instance";
import axios from "axios";
import { deactivate } from "../instance";

//콘서트 Interface

// export interface IGetConcert {
//   id: number;
//   concertId: number;
//   posterUrl: string;
//   title: string;
//   showTimes: string;
//   location: string;
//   runningTime: string;
//   viewableGrade: string;
//   genre: string;
//   latitude: number;
//   longitude: number;
//   vendor: number;
//   like: boolean;
//   ticketingUrl: [
//     {
//       url: string;
//       title: string;
//     }
//   ];
// }

export interface IGetConcert {
  concertId: number;
  categoryId: number;
  artistId: number;
  concertName: string;
  concertImg: string;
  concertInfo: string;
  concertDate: string;
  ticketingDate: string;
  ticketingUrl: string;
  locationName: string;
  playTime: string;
  ratings: string;
  createdAt: string;
  updatedAt: string;
  calender: string;
}

interface EditLike {
  concertId: number;
  like: boolean;
}

interface PostSMS {
  concertId: number;
}

//콘서트 API
const GetConcerts = () => {
  return useQuery<IGetConcert[]>(["concert"], async () => {
    const { data } = await deactivate.get<IGetConcert[]>("/concert");
    console.log("data", data);
    return data;
  });
};

const EditLikeConcerts = () => {
  return useMutation(async (payload: EditLike) => {
    const { data } = await axios.patch(
      `http://localhost:3001/concerts/${payload.concertId}`,
      payload
    );
    return data;
  });
};

//공연 SMS 알림 API

const PostConcertSMS = () => {
  return useMutation(async (payload: PostSMS) => {
    const { data } = await axios.post("url", payload);
    return data;
  });
};
const DeleteConcertSMS = () => {
  return useMutation(async (payload: PostSMS) => {
    const { data } = await axios.patch("url", payload);
    return data;
  });
};

const ConcertApi = {
  GetConcerts,
  EditLikeConcerts,
  PostConcertSMS,
  DeleteConcertSMS,
};

export default ConcertApi;
