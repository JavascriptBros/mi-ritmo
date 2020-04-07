const mongoose = require("mongoose");

const getOne = (model) => async (req, res, next) => {
  const id = req.params.id;
  await model
    .findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({ data: doc });
      } else {
        res
          .status(404)
          .json({ message: "A record for the provided ID does not exist" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

const getMany = (model) => async (req, res, next) => {
  await model
    .find()
    .exec()
    .then((docs) => {
      //   const response = {
      //     count: docs.length,
      //     songs: docs.map((doc) => {
      //       return {
      //         title: doc.title,
      //         artist: doc.artist,
      //         _id: doc._id,
      //       };
      //     }),
      //   };
      //   res.status(200).json(response);
      res.status(200).json({ data: docs });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

const createOne = (model) => async (req, res, next) => {
  const newModel = new model({
    ...req.body,
    _id: new mongoose.Types.ObjectId(),
  });

  if (newModel) {
    await newModel
      .save()
      .then((result) => {
        res.status(201).json({
          message: "Creation successful!",
          data: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
};

const updateOne = (model) => async (req, res, next) => {
  const id = req.params.id;
  const userParams = { ...req.body };

  await model
    .findByIdAndUpdate(id, { $set: userParams }, { new: true })
    .exec()
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "Record updated!",
          data: result,
        });
      } else {
        res
          .status(404)
          .json({ message: "A record for the provided ID does not exist" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

const deleteOne = (model) => async (req, res, next) => {
  const id = req.params.id;

  await model
    .findByIdAndDelete(id)
    .exec()
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "Record deleted",
          data: result,
        });
      } else {
        res
          .status(404)
          .json({ message: "A record for the provided ID does not exist" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

const crudControllers = (model) => ({
  getOne: getOne(model),
  getMany: getMany(model),
  createOne: createOne(model),
  updateOne: updateOne(model),
  deleteOne: deleteOne(model),
});

module.exports = crudControllers;
