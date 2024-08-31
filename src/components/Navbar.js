import { Link } from "react-router-dom";
import "../styles/IMDB.css";
const Navbar = () => {
  return (
    <>
      <div className="navbar-wrapper">
        <Link to="/" className="links">Movie List</Link> 
        {/* <Link to="/Add-Movie" className="links">Add Movie</Link> */}
        <Link to="/favourites"className="links">WatchList</Link> 
      </div>
    </>
  );
};

export default Navbar;
