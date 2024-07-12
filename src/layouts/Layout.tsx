import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { useEffect } from "react";
import { useAppStore } from "../stores/useAppStore";
import Notification from "../components/Notification";

function Layout() {
  const loadFromStorage = useAppStore((state) => state.loadFromStorage);

  useEffect(() => {
    loadFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />

      <main className="container mx-auto py-10">
        <Outlet />
      </main>

      <Modal />
      <Notification />
    </>
  );
}
export default Layout;
