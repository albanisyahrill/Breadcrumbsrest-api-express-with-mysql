const connection = require("../config/db");

//Callback untuk menampilkan data mahasiswa
const getMahasiswa = (req, res) => {
  connection.query("SELECT * FROM mahasiswa", (errors, results, fields) => {
    if (errors) {
      return res
        .status(500)
        .json({ message: "Failed to get data!", error: errors });
    }

    res.status(200).json({ success: true, data: results });
  });
};

//Callback untuk menampilkan data mahasiswa berdasarkan id di parameter
const getMahasiswaById = (req, res) => {
  //Tanda "?" pada query dibawah berfungsi sebagai variable yang akan diisi oleh variable data
  connection.query(
    "SELECT * FROM mahasiswa WHERE id = ?",
    req.params.id,
    (errors, results, fields) => {
      if (errors) {
        return res
          .status(500)
          .json({ message: "Something went wrong!", error: errors });
      }

      if (results.length) {
        return res.status(200).json({ success: true, data: results });
      } else {
        return res
          .status(404)
          .json({ message: "Data not found", success: false });
      }
    }
  );
};

//Callback untuk menambah data mahasiswa baru
const addMahasiswa = (req, res) => {
  const data = { ...req.body }; //Spread operator pada req.body untuk menyalin seluruh property objek dari body

  connection.query(
    "INSERT INTO mahasiswa SET ?",
    data,
    (errors, results, fields) => {
      if (errors) {
        return res
          .status(500)
          .json({ message: "Something went wrong!", error: errors });
      }

      res
        .status(200)
        .json({ success: true, message: "Insert data succesfully!" });
    }
  );
};

//Callback untuk update data mahasiswa
const updateMahasiswa = (req, res) => {
  const data = { ...req.body };

  connection.query(
    "SELECT * FROM mahasiswa WHERE id = ?",
    req.params.id,
    (errors, results, fields) => {
      if (errors) {
        return res
          .status(500)
          .json({ message: "Something went wrong!", error: errors });
      }

      if (results.length) {
        connection.query(
          "UPDATE mahasiswa SET ? WHERE id = ?",
          [data, req.params.id],
          (errors, results, fields) => {
            if (errors) {
              return res
                .status(500)
                .json({ message: "Update failed!", error: errors });
            }
            console.info(results);
            res
              .status(200)
              .json({ success: true, message: "Data updated success!" });
          }
        );
      } else {
        return res
          .status(404)
          .json({ message: "Data not found!", success: false });
      }
    }
  );
};

//Callback untuk menghapus data mahasiswa
const deleteMahasiswa = (req, res) => {
  connection.query(
    "SELECT * FROM mahasiswa WHERE id = ?",
    req.params.id,
    (errors, results, fields) => {
      if (errors) {
        return res
          .status(500)
          .json({ message: "Something went wrong!", error: errors });
      }

      if (results.length) {
        connection.query(
          "DELETE FROM mahasiswa WHERE id = ?",
          req.params.id,
          (errors, results, fields) => {
            if (errors) {
              return res
                .status(500)
                .json({ message: "Failed to delete data!", success: false });
            }

            res
              .status(200)
              .json({ success: true, message: "Data deleted success!" });
          }
        );
      } else {
        return res
          .status(404)
          .json({ message: "Data not found!", success: false });
      }
    }
  );
};

module.exports = {
  addMahasiswa,
  getMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
  getMahasiswaById,
};
