import React from "react";
import MovieCard from "../components/MovieCard";
import BlurCircle from "../components/BlurCircle";
import { useAppContext } from "../context/AppContext";

const Movies = () => {
  const { shows } = useAppContext();

  console.log("shows data in Movies page:", shows);

  if (!shows || shows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-center text-white">
          No Movies Available
        </h1>
      </div>
    );
  }

  return (
    <div className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]">
      <BlurCircle top="150px" left="0px" />
      <BlurCircle bottom="50px" right="50px" />
      <h1 className="text-lg font-medium my-4 text-white">Now Showing</h1>
      <div className="flex flex-wrap max-sm:justify-center gap-8">
        {shows.map((show) => (
          <MovieCard movie={show.movie || show} key={show._id} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
