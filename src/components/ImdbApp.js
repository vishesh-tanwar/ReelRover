import Imdbheading from "./imdbheading";
import Imdblist from "./Imdblist";
import "../styles/IMDB.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieDetail from "./MovieDetail";
import AddMovie from "./AddMovie";
import Navbar from "./Navbar";

const ImdbApp = () => {
  return (
    <Router>
      <div>
        <Navbar/> 
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Imdbheading />
                <Imdblist />
              </>
            }
          /> 
          <Route path="/Movie-Detail/:MovieId" element={<MovieDetail />} />
          <Route path="/Add-Movie" element={<AddMovie />} />
        </Routes>
      </div>
    </Router>
  );
};

export default ImdbApp;
