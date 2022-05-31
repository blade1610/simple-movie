import React, {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import useSWR from "swr";
import {fetcher, tmdbAPI} from "config";
import MovieCard from "components/movie/MovieCard";
import {Swiper, SwiperSlide} from "swiper/react";
const MovieDetailPage = () => {
  const [movieDetail, setMovieDetail] = useState([]);
  const {movieId} = useParams();
  const {data: movieData} = useSWR(
    tmdbAPI.getMovieDetails(movieId),
    fetcher
  );
  useEffect(() => {
    window.scrollTo({
      top: 0,
      //   behavior: "smooth",
    });
    if (movieData) setMovieDetail(movieData);
  }, [movieId, movieData]);

  return (
    <Fragment>
      <div className="page-container pb-10">
        <div className=" w-full max-h-[600px] overflow-hidden  md:block  relative mb-10">
          <div className="bg-opacity-60 absolute inset-0 bg-black bg-cover"></div>
          <div
            className="h-full bg-no-repeat bg-contain"
            style={{
              backgroundImage: `url(${tmdbAPI.getImage(
                movieDetail.backdrop_path
              )})`,
            }}
          >
            <img
              src={tmdbAPI.getImage(movieDetail.backdrop_path)}
              alt=""
              className="invisible w-full h-full"
            ></img>
          </div>
        </div>
        <div className="mb-5 relative max-w-[50%] max-h-[50%] lg:max-w-[40%] lg:max-h-[40%] z-10 -mt-[20%] rounded-md overflow-hidden mx-auto ">
          <img
            src={tmdbAPI.getImage(movieDetail.poster_path)}
            alt=""
            className="object-contain mx-auto rounded-md"
          />
        </div>
        <h1 className="mb-10 text-3xl font-bold text-center text-white">
          {movieDetail.title}
        </h1>
        <div className="flex items-center justify-center w-full">
          {movieDetail.genres && (
            <div className="gap-x-5 flex items-center mb-10 overflow-x-auto text-white">
              {movieDetail.genres.map((genre) => {
                return (
                  <span
                    key={genre.id}
                    className="border-primary px-4 py-2 border-2 rounded-lg cursor-default"
                  >
                    {genre.name}
                  </span>
                );
              })}
            </div>
          )}
        </div>
        <p className="text-white text-center leading-relaxed max-w-[600px] mx-auto mb-10">
          {movieDetail.overview}
        </p>
        <MovieCredits></MovieCredits>
        <MovieVideo></MovieVideo>
        <MovieSimilar></MovieSimilar>
      </div>
    </Fragment>
  );
};
function MovieCredits() {
  const {movieId} = useParams();
  const {data: movieCredits} = useSWR(
    tmdbAPI.getMovieInfo(movieId, "credits"),
    fetcher
  );

  if (!movieCredits) return null;
  return (
    <div className="flex flex-col justify-center">
      <h2 className="mb-10 text-3xl text-center text-white cursor-default">
        Casts
      </h2>
      <div className="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid grid-cols-1 gap-10">
        {movieCredits.cast.length > 0 &&
          movieCredits.cast.slice(0, 4).map((item) => {
            return (
              <div key={item.id}>
                <img
                  src={tmdbAPI.getImage(item.profile_path)}
                  alt=""
                  className="object-cover w-full mb-4 rounded-md  h-[350px]"
                />
                <h3 className="text-2xl font-medium text-white">
                  {item.name}
                </h3>
              </div>
            );
          })}
      </div>
    </div>
  );
}
function MovieVideo() {
  const {movieId} = useParams();

  const {data: movieVideo} = useSWR(
    tmdbAPI.getMovieInfo(movieId, "videos"),
    fetcher
  );

  if (!movieVideo) return null;
  return (
    <Fragment>
      <div className="py-10">
        <div className="flex flex-col items-center justify-center gap-5">
          {movieVideo.results.length > 0 &&
            movieVideo.results.slice(0, 4).map((video) => {
              return (
                <div key={video.id} className="w-full md:max-w-[80%]">
                  <h2 className="bg-primary w-fit bg-secondary p-3 mb-5 text-2xl font-medium text-white cursor-default">
                    {video.name}
                  </h2>
                  <div className="aspect-video w-full">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${video.key}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Fragment>
  );
}
function MovieSimilar() {
  const {movieId} = useParams();
  const {data: movieSimilar} = useSWR(
    tmdbAPI.getMovieInfo(movieId, "similar"),
    fetcher
  );
  if (!movieSimilar) return null;
  return (
    <Fragment>
      <div className="movie-list">
        <Swiper
          grabCursor={"true"}
          spaceBetween={40}
          slidesPerView={"auto"}
        >
          {movieSimilar.results.length > 0 &&
            movieSimilar.results.map((movie) => {
              return (
                <SwiperSlide key={movie.id}>
                  <MovieCard movie={movie}></MovieCard>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </Fragment>
  );
}
export default MovieDetailPage;
