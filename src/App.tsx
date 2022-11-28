import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Concerts from "./pages/Concerts";
import Concert from "./pages/Concert";
import Main from "./pages/Main";
import MockTicketing from "./pages/MockTicketing";
import user from "./pages/user";
import Artist from "./pages/Artist";
import OAuthKakao from "./components/login/OAuthKakao";
if (process.env.NODE_ENV === "production") {
  console.log = function no_console() {};
  console.warn = function no_console() {};
}

function App() {
  return (
    <Layout>
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
        <Route path="/oauth/kakao/callback" element={<OAuthKakao />} />
        <Route path="game" element={<MockTicketing />} />
        <Route path="artist/:id" element={<Artist />} />
      </Routes>
    </Layout>
  );
}

export default App;
