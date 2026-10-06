import { Link } from "react-router-dom";

function Home() {
  return (
    <section id="home" className="home">
      <div className="home-content">
        <p className="home-tagline">EXPLORE BEYOND THE ORDINARY</p>
        <h1>Discover Your Next Journey</h1>
        <p>
          Explore unforgettable destinations and carefully planned travel experiences with Beyond Horizons.
        </p>
        <Link to="/packages" className="primary-btn">
          Explore Packages
        </Link>
      </div>
    </section>
  );
}

export default Home;