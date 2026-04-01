import { addCat, findCatById, listAllCats } from "../models/cat-model.js";

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

const postCat = async (req, res) => {
  console.log("post cat", req.file);
  req.body.filename = req.file.filename;
  const result = await addCat(req.body);
  if (result.cat_id) {
    res.status(201);
    res.json({ message: "New cat added.", result });
  } else {
    res.sendStatus(400);
  }
};

const putCat = async (req, res) => {
  // not implemented in this example, this is homework
  //res.sendStatus(200);
  res.json({ message: "Cat item updated." });
};

const deleteCat = async (req, res) => {
  // not implemented in this example, this is homework
  //res.sendStatus(200);
  res.json({ message: "Cat item deleted." });
};

export { getCat, getCatById, postCat, putCat, deleteCat };
