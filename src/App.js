import {Fragment, lazy, Suspense} from "react";
import "swiper/scss";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Main from "components/layout/Main";
import Banner from "components/banner/Banner";
// import HomePage from "pages/HomePage";
// import MoviePage from "pages/MoviePage";
// import MovieDetailPage from "pages/MovieDetailPage";
const HomePage = lazy(() => import("pages/HomePage"));
const MoviePage = lazy(() => import("pages/MoviePage"));
const MovieDetailPage = lazy(() => import("pages/MovieDetailPage"));
function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Router>
          <Routes>
            <Route element={<Main></Main>}>
              <Route
                path="/"
                element={
                  <>
                    <Banner></Banner>
                    <HomePage></HomePage>
                  </>
                }
              ></Route>
              <Route
                path="/movies"
                element={<MoviePage></MoviePage>}
              ></Route>
              <Route
                path="/movies/:movieId"
                element={<MovieDetailPage></MovieDetailPage>}
              ></Route>
              <Route path="*" element={<>Not Found</>}></Route>
            </Route>
          </Routes>
        </Router>
      </Suspense>
    </Fragment>
  );
}

export default App;
