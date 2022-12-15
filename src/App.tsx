import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/layout";
import Concerts from "./pages/Concerts";
import Concert from "./pages/Concert";
import Main from "./pages/Main";
import user from "./pages/user";
import Artist from "./pages/Artist";
import OAuthKakao from "./components/login/OAuthKakao";
import useUser from "./hooks/useUser";
import NotFound from "./pages/404";
import "./firebase-messaging-sw";

if (process.env.NODE_ENV === "production") {
  console.log = function no_console() {};
  console.warn = function no_console() {};
}

function App() {
  const { isLoggedin } = useUser();
  return (
    <Layout>
      <AnimatePresence>
        <Routes>
          <Route index element={<Main />} />
          <Route path="concerts">
            <Route index element={<Concerts />} />
            <Route path=":id" element={<Concert />} />
          </Route>
          <Route path="user">
            <Route path="login" element={<user.Login />} />
            <Route path="signup" element={<user.Signup />} />
            <Route path="mypick" element={<user.MyPick />} />
          </Route>
          <Route path="/users/oauth/kakao/callback" element={<OAuthKakao />} />
          <Route path="artist/:id" element={<Artist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

export default App;
