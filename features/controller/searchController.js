import { search } from "../repository/searchRepository.js";

export const searchCont = async (req, res, next) => {
  try {
    const searchItem =
      req.params && req.params.searchItem ? req.params.searchItem : "";

    const { status, message } = await search(searchItem);
    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};
