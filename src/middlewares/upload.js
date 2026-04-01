import sharp from "sharp";

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  //const thumbnailPath = "./dog.jpg";
  let extension = "jpg";
  if (req.file.mimetype === "image/png") {
    extension = "png";
  }
  await sharp(req.file.path)
    .resize(160, 160)
    .toFile(`${req.file.path}_thumb.${extension}`, (err, info) => {
      /*if (err) {
        console.error("Error creating thumbnail:", err);
      } else {
        console.log("Thumbnail created successfully:", info);
      }*/
    });
  next();
};

export { createThumbnail };
