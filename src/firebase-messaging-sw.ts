import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCsOFzeQwki-4_wR_591Je7p-s1A0p70QM",
  authDomain: "tgle-4309b.firebaseapp.com",
  projectId: "tgle-4309b",
  storageBucket: "tgle-4309b.appspot.com",
  messagingSenderId: "677419032353",
  appId: "1:677419032353:web:24ed324770f0a2af772860",
  measurementId: "G-DV9BSZW5BV",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

async function requestPermission() {
  console.log("권한 요청 중...");

  const permission = await Notification.requestPermission();
  if (permission === "denied") {
    console.log("알림 권한 허용 안됨");
    return;
  }

  console.log("알림 권한이 허용됨");

  const VAPID_KEY = process.env.REACT_APP_VAPID_KEY;
  console.log("VK", VAPID_KEY);

  const token = await getToken(messaging, {
    vapidKey: process.env.REACT_APP_VAPID_KEY,
  });
  console.log("token", token);
  console.log("여기 옴?");

  if (token) console.log("token: ", token);
  else console.log("Can not get Token");
  console.log("여기 옴?22");
  onMessage(messaging, (payload) => {
    console.log("메시지가 도착했습니다.", payload);
    // ...
  });
}

requestPermission();
