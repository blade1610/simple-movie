import React, {Fragment, useEffect, useState} from "react";
import {SwiperSlide, Swiper} from "swiper/react";
import MovieCard, {MovieCardSkeleton} from "./MovieCard";
import useSWR from "swr";
import {fetcher, tmdbAPI} from "config";
const MovieList = ({type = "now_playing", ...props}) => {
  const [movies, setMovies] = useState([]);

  const {data, error} = useSWR(tmdbAPI.getMovieList(type), fetcher);
  const isLoading = !data && !error;

  useEffect(() => {
    if (data && data.results) setMovies(data.results);
  }, [data]);

  return (
    <Fragment>
      {isLoading && (
        <div className="movie-list">
          <Swiper
            grabCursor={"true"}
            spaceBetween={40}
            slidesPerView={"auto"}
          >
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
          </Swiper>
        </div>
      )}
      {!isLoading && (
        <div className="movie-list">
          <Swiper
            grabCursor={"true"}
            spaceBetween={40}
            slidesPerView={"auto"}
          >
            {movies.length > 0 &&
              movies.map((movie) => {
                return (
                  <SwiperSlide key={movie.id}>
                    <MovieCard movie={movie}></MovieCard>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      )}
    </Fragment>
  );
};

export default MovieList;
