const { Router } = require("express");
const {
  addMahasiswa,
  getMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
  getMahasiswaById,
} = require("../controller/controller");

const router = Router();

router.get("/", getMahasiswa);
router.post("/", addMahasiswa);
router.get("/:id", getMahasiswaById);
router.put("/:id", updateMahasiswa);
router.delete("/:id", deleteMahasiswa);

module.exports = router;
