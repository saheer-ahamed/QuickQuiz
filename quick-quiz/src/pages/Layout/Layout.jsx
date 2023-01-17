import { Outlet } from "react-router-dom";
import "./Layout.css";

export default function Home() {
  return (
    <>
      <header>
        <div className="navTitle">
          <h2>QUICK QUIZ</h2>
        </div>
      </header>
      <section>
        <div className="main">
          <Outlet />
        </div>
      </section>
      <footer>
        <div className="designedBy">
          <h3>Designed by ID</h3>
        </div>
      </footer>
    </>
  );
}
