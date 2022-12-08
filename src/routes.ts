import { Pages } from "./types";

export const pages: Pages = {
  Home: {
    name: "Home",
    path: "/",
    title: "Home | Tgle",
    isNav: false,
    isNeedLogin: false,
  },
  Concert: {
    name: "Concerts",
    path: "concerts",
    title: "Concert | Tgle",
    isNav: true,
    isNeedLogin: false,
  },
  "My Picks!": {
    name: "My Picks!",
    path: "user/mypick",
    title: "my Picks | Tgle",
    isNav: true,
    isNeedLogin: true,
  },
  login: {
    name: "login",
    path: "user/login",
    title: "log in | Tgle",
    isNav: false,
    isNeedLogin: false,
  },
  signup: {
    name: "signup",
    path: "user/signup",
    title: "sign up | Tgle",
    isNav: false,
    isNeedLogin: false,
  },
};

export const loginOnlyPages = Object.values(pages).filter(
  (page) => page.isNeedLogin
);
export const loginOnlyPaths = loginOnlyPages.map((page) => page.path);
