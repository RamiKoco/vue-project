import pool from "../databaseConfig.js";

export const getDriver = async (name = "") => {
  const [rows] = await pool.query(
    `SELECT * FROM driver WHERE name LIKE '%${name}%'`
  );
  return rows;
};

export const getOneDriver = async (id) => {
  const [rows] = await pool.query(`SELECT * FROM driver WHERE id = ${id}`);
  return rows;
};

export const addDriver = async (
  name,
  lastname,
  phone,
  tc,
  drivinglicenceno,
  address
) => {
  const result = await pool.query(
    `INSERT INTO driver (name,lastname,phone,tc,drivinglicenceno,address) VALUES ('${name}','${lastname}','${phone}','${tc}','${drivinglicenceno}','${address}')`
  );
  return result;
};

export const updateDriver = async (
  name,
  lastname,
  phone,
  tc,
  drivingLicenceNo,
  address,
  id
) => {
  const result = await pool.query(
    `UPDATE driver SET name ='${name}', lastname = '${lastname}', phone = '${phone}' ,tc = '${tc}', drivinglicenceno = '${drivingLicenceNo}', address = '${address}' WHERE id = ${id}`
  );
  return result;
};

export const deleteDriver = async (id) => {
  const result = await pool.query(`DELETE FROM driver WHERE id = ${id}`);
  return result;
};
