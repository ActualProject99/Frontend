import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/layout";
import Concerts from "./pages/Concerts";
import Concert from "./pages/Concert";
import Main from "./pages/Main";
import MockTicketing from "./pages/MockTicketing";
import user from "./pages/user";

function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<Main />} />
        <Route path="concerts">
          <Route index element={<Concerts no1 />} />
          <Route path=":id" element={<Concert />} />
        </Route>
        <Route path="user">
          <Route path="login" element={<user.Login />} />
          <Route path="signup" element={<user.Signup />} />
          <Route path="mypage" element={<user.Mypage />} />
        </Route>
        <Route path="mock-ticketing" element={<MockTicketing />} />
      </Routes>
    </Layout>
  );
}

export default App;
