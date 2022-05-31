import React, {useEffect, useState} from "react";
import MovieGrid from "components/movie/MovieGrid";
import {apiKey} from "config";
import useDebounce from "hooks/useDebounce";

const MoviePage = () => {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const getPage = (page) => {
    setPage(page);
  };
  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/discover/movie?api_key=c3e6cdeb8de2b808dbe2f2966b733d24&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`
  );
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const filterDebounce = useDebounce(filter, 500);
  useEffect(() => {
    if (filterDebounce)
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=${page}&include_adult=false&query=${filterDebounce}`
      );
    else {
      setUrl(
        `https://api.themoviedb.org/3/discover/movie?api_key=c3e6cdeb8de2b808dbe2f2966b733d24&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`
      );
    }
  }, [filterDebounce, page]);

  return (
    <div className="py-10">
      <div className=" flex mb-5 md:w-[50%] mx-auto">
        <div className="bg-slate-800 flex flex-1 w-full p-2 rounded-md">
          <input
            type="text"
            className="w-full text-white bg-transparent rounded-md outline-none"
            placeholder="Type here to search..."
            onChange={handleFilterChange}
          />
          <button className="bg-primary p-3 text-white rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <MovieGrid url={url} page={getPage} currentPage={page}></MovieGrid>
    </div>
  );
};

export default MoviePage;
