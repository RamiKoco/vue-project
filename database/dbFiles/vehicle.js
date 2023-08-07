import pool from "../databaseConfig.js";

export const getVehicle = async (plate = "") => {
  const [rows] = await pool.query(
    `SELECT * FROM vehicle WHERE plate LIKE '%${plate}%'`
  );
  return rows;
};

export const getOneVehicle = async (id) => {
  const [rows] = await pool.query(`SELECT * FROM vehicle WHERE id = ${id}`);
  return rows;
};

export const addVehicle = async (model, plate) => {
  const result = await pool.query(
    `INSERT INTO vehicle (model,plate) VALUES ('${model}','${plate}')`
  );
  return result;
};

export const updateVehicle = async (model, plate, id) => {
  const result = await pool.query(
    `UPDATE vehicle SET model ='${model}', plate = '${plate}' WHERE id = ${id}`
  );
  return result;
};

export const deleteVehicle = async (id) => {
  const result = await pool.query(`DELETE FROM vehicle WHERE id = ${id}`);
  return result;
};
