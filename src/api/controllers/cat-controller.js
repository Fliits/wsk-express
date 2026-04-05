import {
  addCat,
  findCatById,
  listAllCats,
  modifyCat,
  removeCat,
} from "../models/cat-model.js";

const getCat = async (req, res) => {
  res.json(await listAllCats());
};

const getCatById = async (req, res) => {
  const cat = await findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = async (req, res, next) => {
  if (!req.file) {
    const error = new Error("Image file is required.");
    error.status = 400;
    next(error);
  }
  console.log("post cat", req.file);
  req.body.filename = req.file.filename;
  req.body.owner = res.locals.user.user_id;
  const result = await addCat(req.body);
  if (result.error) {
    return next(new Error(result.error));
  }
  res.sendStatus(201).json({ message: "New cat added.", result });
};

const putCat = async (req, res) => {
  console.log("put cat", req.body);
  const result = await modifyCat(req.body, req.params.id);
  if (result.message === "success") {
    res.json({ message: "Cat item updated." });
  } else {
    res.sendStatus(404);
  }
};

const deleteCat = async (req, res) => {
  const result = await removeCat(req.params.id);
  if (result.message === "success") {
    res.json({ message: "Cat item deleted." });
  } else {
    res.sendStatus(404);
  }
};

export { getCat, getCatById, postCat, putCat, deleteCat };
