import React from "react";
import {useNavigate} from "react-router-dom";
import Button from "components/button/Button";
import {tmdbAPI} from "config";
import LoadingSkeleton from "components/loading/LoadingSkeleton";
const MovieCard = ({movie}) => {
  const {id, title, vote_average, release_date, poster_path} = movie;
  const navigate = useNavigate();

  return (
    <div className="bg-slate-800 movie-card display flex flex-col h-full p-3 text-white rounded-lg select-none">
      <img
        src={tmdbAPI.getImage(poster_path, "w500")}
        alt=""
        className=" object-cover w-full rounded-lg h-[250px] mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className=" flex-1 mb-3 text-xl font-bold">{title}</h3>
        <div className="flex items-center justify-between mb-5">
          <span>
            {isNaN(release_date) && new Date(release_date).getFullYear()}
          </span>
          <div className="gap-x-2 flex">
            <span> {vote_average.toFixed(1)}</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-yellow-400 w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </span>
          </div>
        </div>
        <Button
          bgColor="primary"
          onClick={() => navigate(`/movies/${id}`)}
        >
          Watch Now
        </Button>
        {/* <button
          onClick={() => navigate(`/movies/${id}`)}
          className="bg-primary w-full px-6 py-3 mt-auto capitalize rounded-lg"
        >
          Watch Now
        </button> */}
      </div>
    </div>
  );
};
export const MovieCardSkeleton = () => {
  return (
    <div className="bg-slate-800 movie-card display flex flex-col h-full p-3 text-white rounded-lg select-none">
      <LoadingSkeleton
        width="100%"
        height="250px"
        radius="8px"
        className="mb-5"
      ></LoadingSkeleton>
      <div className="flex flex-col flex-1">
        <h3 className=" flex-1 mb-3 text-xl font-bold">
          <LoadingSkeleton height="20px"></LoadingSkeleton>
        </h3>
        <div className="flex items-center justify-between mb-5">
          <span>
            <LoadingSkeleton width="50px" height="10px"></LoadingSkeleton>
          </span>
          <div className="gap-x-2 flex">
            <span>
              <LoadingSkeleton
                width="50px"
                height="10px"
              ></LoadingSkeleton>
            </span>
            <span>
              <LoadingSkeleton
                width="30px"
                height="10px"
              ></LoadingSkeleton>
            </span>
          </div>
        </div>
        <LoadingSkeleton height="40px"></LoadingSkeleton>
        {/* <button
          onClick={() => navigate(`/movies/${id}`)}
          className="bg-primary w-full px-6 py-3 mt-auto capitalize rounded-lg"
        >
          Watch Now
        </button> */}
      </div>
    </div>
  );
};
export default MovieCard;
