import React, {Fragment, useEffect, useState} from "react";
import useSWR from "swr";
import {fetcher} from "config";
import MovieCard from "./MovieCard";
import ReactPaginate from "react-paginate";

const itemsPerPage = 20;
const MovieGrid = ({url, page, currentPage}) => {
  const [movies, setMovies] = useState({});
  const {data: movieGridData, error} = useSWR(url, fetcher);
  const loading = !movieGridData && !error;
  // const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  useEffect(() => {
    if (movieGridData) setMovies(movieGridData);
  }, [movieGridData]);
  console.log(movieGridData);
  useEffect(() => {
    // Fetch items from another resources.
    if (!movies || !movies.total_results) return;
    setPageCount(Math.ceil(movies.total_results / itemsPerPage));
  }, [itemOffset, movies]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    if (!movies || !movies.total_results) return;
    const newOffset =
      (event.selected * itemsPerPage) % movies.total_results;
    setItemOffset(newOffset);
    page(event.selected + 1);
  };

  return (
    <Fragment>
      {loading && (
        <div className="border-primary border-t-transparent animate-spin w-10 h-10 mx-auto border-4 rounded-full"></div>
      )}
      <div className="md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 grid grid-cols-1 gap-10">
        {!loading &&
          movies.results &&
          movies.results.length > 0 &&
          movies.results.map((movie) => {
            return <MovieCard key={movie.id} movie={movie}></MovieCard>;
          })}
      </div>

      <div className={`mt-10 text-white ${loading ? "hidden" : null} `}>
        <ReactPaginate
          className="pagination"
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={4}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </div>
    </Fragment>
  );
};

export default MovieGrid;
