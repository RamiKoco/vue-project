import pool from "../databaseConfig.js";

export const getTransfer = async (driverName = "",vehiclePlate = '',passengerName = '',increaseDecrease = 'ASC') => {
  const [rows] = await pool.query(
    `SELECT transfers.id ,transfers.date, transfers.expedition_time, transfers.starting_point,
    transfers.end_point, driver.name AS 'driver_name', driver.lastname AS 'driver_lastname', vehicle.plate,vehicle.model,
     passenger.name AS 'passenger_name',passenger.lastname AS 'passenger_lastname' FROM
      (((transfers INNER JOIN driver ON transfers.driver_id = driver.id)
        INNER JOIN vehicle ON transfers.vehicle_id = vehicle.id)
        INNER JOIN passenger ON transfers.passenger_id = passenger.id)
        WHERE driver.name LIKE '%${driverName}%' AND
        vehicle.plate LIKE '%${vehiclePlate}%' 
        AND passenger.name LIKE '%${passengerName}%'
        GROUP BY transfers.date ${increaseDecrease}`
  );
  return rows;
};

export const getOneTransfer = async (id) => {
  const [rows] = await pool.query(`SELECT * FROM transfers WHERE id = ${id}`);
  return rows;
};

export const addTransfer = async (
  date,
  driver_id,
  passenger_id,
  end_point,
  expedition_time,
  starting_point,
  vehicle_id
) => {
  const result = await pool.query(
    `INSERT INTO transfers (date,driver_id,passenger_id,end_point,expedition_time,starting_point,vehicle_id) VALUES ('${date}','${driver_id}','${passenger_id}','${end_point}','${expedition_time}','${starting_point}','${vehicle_id}')`
  );
  return result;
};

export const updateTransfer = async (
  date,
  driver_id,
  passenger_id,
  end_point,
  expedition_time,
  starting_point,
  vehicle_id,
  id
) => {
  const result = await pool.query(
    `UPDATE transfers SET date ='${date}', driver_id = '${driver_id}', passenger_id = '${passenger_id}' ,end_point = '${end_point}', expedition_time = '${expedition_time}', starting_point = '${starting_point}', vehicle_id = '${vehicle_id}' WHERE id = ${id}`
  );
  return result;
};
