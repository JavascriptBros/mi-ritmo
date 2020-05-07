const crudControllers = require("../../utils/crud");
const Song = require("../models/song");

module.exports = crudControllers(Song);
