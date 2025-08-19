import express from "express";
import { addShow, getNowPlayingMovies, getShow, getshows } from "../controllers/showController.js";
import { protectAdmin } from "../middleware/auth.js";

const showRouter = express.Router();

// Use the correct variable name (showRouter)
showRouter.get("/now-playing", protectAdmin, getNowPlayingMovies);
showRouter.post("/add", protectAdmin, addShow);
showRouter.get("/all", getshows);
showRouter.get("/:movieId", getShow);

export default showRouter;
