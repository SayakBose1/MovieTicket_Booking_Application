
import Movie from "../models/Movie.js";
import Show from "../models/Show.js";
import axios from "axios";

// Helper function for TMDB API requests
const tmdbAxios = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    Accept: "application/json",
  },
});

// API to get now playing movies from TMDB API
export const getNowPlayingMovies = async (req, res) => {
  try {
    const { data } = await tmdbAxios.get("/movie/now_playing");
    res.json({ success: true, movies: data.results });
  } catch (error) {
    console.error("Error fetching now playing movies:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to add a new show to the database
export const addShow = async (req, res) => {
  try {
    const { movieId, showsInput, showPrice } = req.body;

    let movie = await Movie.findById(movieId);

    // If movie not in DB, fetch details from TMDB
    if (!movie) {
      const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
        tmdbAxios.get(`/movie/${movieId}`),
        tmdbAxios.get(`/movie/${movieId}/credits`),
      ]);

      const movieApiData = movieDetailsResponse.data;
      const movieCreditsData = movieCreditsResponse.data;

      movie = await Movie.create({
        _id: movieId,
        title: movieApiData.title,
        overview: movieApiData.overview,
        poster_path: movieApiData.poster_path,
        backdrop_path: movieApiData.backdrop_path,
        genres: movieApiData.genres,
        casts: movieCreditsData.cast,
        release_date: movieApiData.release_date,
        original_language: movieApiData.original_language,
        tagline: movieApiData.tagline || "",
        vote_average: movieApiData.vote_average,
        runtime: movieApiData.runtime,
      });
    }

    // Prepare shows to insert
    const showsToCreate = [];
    showsInput.forEach(({ date, time }) => {
      time.forEach((t) => {
        const dateTimeString = `${date}T${t}`;
        showsToCreate.push({
          movie: movieId,
          showDateTime: new Date(dateTimeString),
          showPrice,
          occupiedSeats: {},
        });
      });
    });

    if (showsToCreate.length > 0) {
      await Show.insertMany(showsToCreate);
    }

    res.json({ success: true, message: "Show Added Successfully." });
  } catch (error) {
    console.error("Error adding show:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to get all upcoming shows
export const getshows = async (req, res) => {
  try {
    const shows = await Show.find({ showDateTime: { $gte: new Date() } })
      .populate("movie")
      .sort({ showDateTime: 1 });

    const validShows = shows.filter((show) => show.movie);

    res.json({ success: true, shows: validShows });
  } catch (error) {
    console.error("Error fetching shows:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to get a single movie's shows
export const getShow = async (req, res) => {
  try {
    const { movieId } = req.params;

    const shows = await Show.find({
      movie: movieId,
      showDateTime: { $gte: new Date() },
    });

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    }

    // Group shows by date
    const dateTime = {};
    shows.forEach((show) => {
      const date = show.showDateTime.toISOString().split("T")[0];
      if (!dateTime[date]) dateTime[date] = [];
      dateTime[date].push({ time: show.showDateTime, showId: show._id });
    });

    res.json({ success: true, movie, dateTime });
  } catch (error) {
    console.error("Error fetching show:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
