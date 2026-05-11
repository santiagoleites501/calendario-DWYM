import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="home-container">
      <h1>📅 Calendario</h1>
      <div className="home-buttons">
        <Link to="/mes">
          <button className="nav-btn">Vista Mensual</button>
        </Link>
        <Link to="/semana">
          <button className="nav-btn">Vista Semanal</button>
        </Link>
      </div>
    </div>
  );
}