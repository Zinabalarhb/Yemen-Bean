import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function PublicLayout({ searchTerm, setSearchTerm }) {
  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Outlet />
    </>
  );
}
