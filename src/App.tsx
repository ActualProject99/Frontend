import React from "react";
import { Route, Routes } from "react-router-dom";
import Calendar from "./pages/Calendar";
import Concert from "./pages/Concert";
import Main from "./pages/Main";
import MockTicketing from "./pages/MockTicketing";
import user from "./pages/user";

function App() {
  return (
    <Routes>
      <Route index element={<Main />} />
      <Route path="concert/:id" element={<Concert />} />
      <Route path="calender" element={<Calendar />} />
      <Route path="user">
        <Route path="login" element={<user.Login />} />
        <Route path="signup" element={<user.Signup />} />
        <Route path="mypage" element={<user.Mypage />} />
      </Route>
      <Route path="mock-ticketing" element={<MockTicketing />} />
    </Routes>
  );
}

export default App;
