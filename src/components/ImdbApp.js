import Imdbheading from "./imdbheading";
import Imdblist from "./Imdblist";
import "../styles/IMDB.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieDetail from "./MovieDetail";
import Navbar from "./Navbar";
import MovieFavourite from "./MovieFavourites";
import PaymentComponent from "./PaymentComponent";

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
          <Route path="/favourites" element={<MovieFavourite />} />
          <Route path="/payment/:amount" element={<PaymentComponent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default ImdbApp;
