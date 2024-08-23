import { Link } from "react-router-dom";
import "../styles/IMDB.css";
const Navbar = () => {
  return (
    <>
      <div className="navbar-wrapper">
        <Link to="/">Movie List</Link> 
        <Link to="/Add-Movie">Add Movie</Link>
        <Link to="/favourites">WatchList</Link> 
      </div>
    </>
  );
};

export default Navbar;
