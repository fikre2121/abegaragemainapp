import { Outlet } from "react-router-dom";

import Header from "../../components/header/Header";
import Foter from "../../components/footer/Foter";

function PublicLayout() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <Foter />
    </>
  );
}

export default PublicLayout;
