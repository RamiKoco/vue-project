import pool from "../databaseConfig.js";

export const getTest = async () => {
  const [rows] = await pool.query("SELECT * FROM test");
  return rows;
};

export const getPassenger = async (name = "", type = "") => {
  const [rows] = await pool.query(
    `SELECT * FROM passenger WHERE name LIKE '%${name}%' and type LIKE '${type}%'`
  );
  return rows;
};

export const addPassenger = async (name, lastname, phone, type) => {
  const result = await pool.query(
    `INSERT INTO passenger (name,lastname,phone,type) VALUES ('${name}','${lastname}','${phone}','${type}')`
  );
  return result;
};

export const updatePassenger = async (name, lastname, phone, type, id) => {
  const result = await pool.query(
    `UPDATE passenger SET name ='${name}', lastname = '${lastname}', phone = '${phone}' ,type = '${type}' WHERE id = ${id}`
  );
  return result;
};

export const deletePassenger = async (id) => {
  const result = await pool.query(`DELETE FROM passenger WHERE id = ${id}`);
  return result;
};

export const getOnePassenger = async (id) => {
  const [rows] = await pool.query(`SELECT * FROM passenger WHERE id = ${id}`);
  return rows;
};
