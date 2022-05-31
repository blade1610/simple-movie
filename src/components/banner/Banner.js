import React, {useEffect, useState} from "react";
import useSWR from "swr";
import {fetcher} from "../../config";
import {Autoplay} from "swiper";
import {SwiperSlide, Swiper} from "swiper/react";
import {useNavigate} from "react-router-dom";
import Button from "../button/Button";
const Banner = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  const {data: dataMovies, error} = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=c3e6cdeb8de2b808dbe2f2966b733d24`,
    fetcher
  );
  const {data: dataGenres, error2} = useSWR(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=c3e6cdeb8de2b808dbe2f2966b733d24&language=en-US`,
    fetcher
  );

  useEffect(() => {
    if (dataMovies && dataMovies.results) setMovies(dataMovies.results);
  }, [dataMovies]);
  useEffect(() => {
    if (dataGenres && dataGenres.genres) setGenres(dataGenres.genres);
  }, [dataGenres]);

  return (
    <section className=" page-container object-cover h-[500px]  mb-20 pb-10 banner">
      <Swiper
        modules={[Autoplay]}
        grabCursor="true"
        spaceBetween={80}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={1000}
      >
        {movies.length > 0 &&
          movies.map((movie) => {
            return (
              <SwiperSlide key={movie.id}>
                <BannerItem movie={movie} genres={genres}></BannerItem>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </section>
  );
};

const BannerItem = ({movie, genres}) => {
  const {id, title, poster_path, genre_ids} = movie;
  const navigate = useNavigate();
  const [genreName, setGenreName] = useState([]);
  useEffect(() => {
    if (genres.length > 0 && genre_ids)
      setGenreName(() => {
        return genre_ids.map((id) => {
          return genres.find((item) => item.id === id && item.name);
        });
      });
  }, [genre_ids, genres]);

  return (
    <div className="relative w-full h-full rounded-lg">
      <div className="absolute inset-0 rounded-lg overlay bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] "></div>
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt=""
        className="object-cover object-center w-full h-full rounded-lg"
      />
      <div className="bottom-5 left-5 absolute w-full text-white">
        <h2 className=" mb-5 text-3xl font-bold">{title}</h2>
        <div className="flex overflow-x-auto sm:overflow-x-visible  items-center max-w-[400px]  mb-8 gap-x-3">
          {genreName.length > 0 &&
            genreName.map((genre) => {
              return (
                <span
                  key={genre.id}
                  className="min-w-fit px-4 py-2 border border-white rounded-md cursor-default"
                >
                  {genre.name}
                </span>
              );
            })}
        </div>
        {/* <button
          onClick={() => navigate(`/movies/${id}`)}
          className="bg-primary px-6 py-3 font-medium text-white rounded-lg"
        >
          Watch Now
        </button> */}
        <Button
          onClick={() => navigate(`/movies/${id}`)}
          className=" w-max"
        >
          Watch Now
        </Button>
      </div>
    </div>
  );
};
export default Banner;
