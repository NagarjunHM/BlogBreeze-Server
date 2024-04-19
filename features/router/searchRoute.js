import express from "express";
import { searchCont } from "../controller/searchController.js";

const searchRouter = express.Router();

searchRouter.get("/:searchItem", searchCont);

export default searchRouter;
