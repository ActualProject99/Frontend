import { ReactNode } from "react";
import { RegisterOptions } from "react-hook-form";

// Component Props
export interface ArtistProps {
  artistConcert: IGetArtistConcert;
}
export interface ArtistInfoProps {
  artist: IGetArtist;
}
export interface IComments {
  comment?: IgetComment;
}
export type JoinState = "before" | "opened" | "closed";
export interface ConcertProps {
  concert: IGetConcert;
}

export type Option<T> = [keyof T, RegisterOptions];
export type SubOptionCreator<T> = (customOpts?: RegisterOptions) => Option<T>;
export type OptionCreator = <T>(option: Option<T>) => SubOptionCreator<T>;

export interface LoginForm {
  email: string;
  password: string;
  nickname: string;
  phoneNumber: string;
  comfirm: string;
}

export interface EditNickname {
  nickname: string;
}

export interface CommentForm {
  comment: string;
  editcomment: string;
}

export interface IgetComment {
  concertId?: number;
  id: number;
  userId?: number;
  commentId: number;
  comment: string;
  nickname: string;
  profileImg: string;
  createdAt: string;
}

export interface IgetMyComment {
  comment: ReactNode;
  id: number;
  userId: number;
  concertName: string;
  concertId: number;
  createdAt: string;
  updatedAt: string;
}

interface Page {
  name: string;
  path: string;
  title: string;
  isNav: boolean;
  isNeedLogin: boolean;
}
export interface Pages {
  [key: string]: Page;
}

export interface IGetArtist {
  artistName: string;
  artistId: number;
  artistImg: string;
  debutSong: string;
  debutDate: string;
  category: string;
  like: boolean;
}

export interface IGetArtistConcert {
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
  calender: string;
  saleDone: string;
}

export interface ArtistLike {
  artistId: number;
}

export interface likeArtistProps {
  artistLikeId: number;
  userId: number;
  artistId: number;
}

export interface IPayload {
  concertId: string;
  commentId: number;
  id: number;
  userId: number;
  comment: string;
  name: string;
  profileImg: string;
  createdAt: string;
  body?: {
    commentId: number;
    comment: string;
  };
}

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
  locationId: number;
  playTime: string;
  ratings: string;
  createdAt: string;
  updatedAt: string;
  calender: string;
  month: number;
  saleDone: string;
}

export interface IGetHotConcert {
  hotconcertId: number;
  concertId: number;
  posterName: string;
  posterImg: string;
  ticketingDate: string;
  locationName: string;
  exclusion: string;
}

export interface IConcertProps {
  concert: IGetConcert;
}

export interface ConcertLike {
  concertId: number;
}
export interface likeConcertProps {
  concertLikeId: number;
  userId: number;
  concertId: number;
}
export interface alarmConcertProps {
  alarmId: number;
  userId: number;
  concertId: number;
}

export interface PostSMS {
  concertId: number;
}

export interface IGetLocation {
  locationId: number;
  locationName: string;
  locationAddress: string;
  locationCall: string;
  locationUrl: string;
  locationImg: string;
  latitude: number;
  longitude: number;
}

//?????? Info Interface
export interface IGetUser {
  id: number;
  userId: number;
  email: any;
  nickname: string;
  phone: string;
  userImg: string;
  phoneNumber: number;
  profileImg: string;
}
export interface EditNamePayload {
  nickname: string | undefined;
}
export interface EditImgPayload {
  profileImg: string | undefined | File | FormData;
}

//?????? ????????? ????????? Interface

export interface IGetLikeConcert {
  id: number;
  concertId: number;
  posterUrl: string;
  title: string;
  showTimes: string;
  location: string;
  runningTime: string;
  viewableGrade: string;
  genre: string;
  latitude: number;
  longitude: number;
  vendor: number;
  like: boolean;
  buy: string;
  ticketingUrl: {
    melon: string;
    interpark: string;
    yes24: string;
  };
}

export interface Concert {
  id: number;
  group: number;
  name: string;
  location: string;
  imageUrl: string;
  startDatetime: string;
  endDatetime: string;
}

export interface User {
  isLoggedin: boolean;
  id: number | null;
  email: string | null;
}
export interface CalendarProps {
  checkedDates?: Date[];
  className?: string;
  selectable?: boolean;
  selectedDate?: Date;
}

export interface Concert {
  id: number;
  group: number;
  name: string;
  location: string;
  imageUrl: string;
  startDatetime: string;
  endDatetime: string;
}
export interface CardsProps {
  concert?: boolean;
  data: IGetConcert;
  horizontal?: boolean;
  vertical?: boolean;
}

export interface IconProps {
  strokeWidth?: number;
  iconClassName?: string;
  [key: string]: any;
}

export interface ArtistIconProps {
  artist: IGetArtist;
}

export type UserValue = number | string | boolean | null | (() => void);

export interface UserInput {
  [key: string]: UserValue | { value: UserValue; className: string };
}

export interface CancelButton {
  buttonText: string;
  value: boolean;
  className: string;
}

export interface CommentTimeCheck {
  createdAt: string;
  updateAt: string;
}

export type IconType = "ckeck" | "warn" | "info" | "only msg";
export interface PopupOptions {
  userInputs?: UserInput;
  cacelButton: boolean | CancelButton;
  toastOnly: boolean;
  type: IconType;
}
export type AfterToasted = () => void;

export type baseArr = any[] | baseArr[];
export type MainContent = number | null;
export type MainScrollRef = HTMLElement | null;
export type HasBooked = boolean[][][];
export type UserSelected = [number, number, number] | [null, null, null];
export type HasPlaced = boolean[];
export type IsGameSuccess = [boolean | null, boolean | null];
export type IsRefreshedValid = null | boolean;
export type IsGameDone = boolean;

export type Tap = [string, React.ReactNode];
export type IsScrolled = boolean;
