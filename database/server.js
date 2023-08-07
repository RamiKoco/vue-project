import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import {
  getTest,
  addPassenger,
  getPassenger,
  deletePassenger,
  getOnePassenger,
  updatePassenger,
} from "./dbFiles/passenger.js";
import {
  getDriver,
  getOneDriver,
  addDriver,
  updateDriver,
  deleteDriver,
} from "./dbFiles/driver.js";
import {
  getVehicle,
  getOneVehicle,
  addVehicle,
  updateVehicle,
  deleteVehicle,
} from "./dbFiles/vehicle.js";
import {
  getTransfer,
  getOneTransfer,
  addTransfer,
  updateTransfer,
} from "./dbFiles/transfer.js";

var corsOptions = {
  origin: "http://localhost:8081",
};

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// <-- Passenger -->

app.get("/passenger", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const name = req.query.name;
  const type = req.query.type;
  const passenger = await getPassenger(name, type);
  res.status(200).send(passenger);
  return;
});

app.get("/passenger/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const id = req.params.id;
  const [passenger] = await getOnePassenger(id);
  res.status(200).send(passenger);
  return;
});

app.post("/passenger", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { name, lastname, phone, type } = req.body;
  const passenger = await addPassenger(name, lastname, phone, type);
  res.status(201).send(passenger);
  return;
});

app.put("/passenger", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { name, lastname, phone, type, id } = req.body;
  const passenger = await updatePassenger(name, lastname, phone, type, id);
  res.status(201).send(passenger);
  return;
});

app.delete("/passenger", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const id = req.query.id;
  const passenger = await deletePassenger(id);
  res.status(201).send(passenger);
  return;
});

// <-- -->

// <-- Driver -->
app.get("/driver", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const name = req.query.name;
  const driver = await getDriver(name);
  res.status(200).send(driver);
  return;
});

app.get("/driver/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const id = req.params.id;
  const [driver] = await getOneDriver(id);
  res.status(200).send(driver);
  return;
});

app.post("/driver", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { name, lastname, phone, tc, drivingLicenceNo, address } = req.body;
  const driver = await addDriver(
    name,
    lastname,
    phone,
    tc,
    drivingLicenceNo,
    address
  );
  res.status(201).send(driver);
  return;
});

app.put("/driver", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { name, lastname, phone, tc, drivingLicenceNo, address, id } = req.body;
  const driver = await updateDriver(
    name,
    lastname,
    phone,
    tc,
    drivingLicenceNo,
    address,
    id
  );
  res.status(201).send(driver);
  return;
});

app.delete("/driver", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const id = req.query.id;
  const driver = await deleteDriver(id);
  res.status(201).send(driver);
  return;
});
// <-- -->

// <-- Vehicle -->
app.get("/vehicle", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const plate = req.query.plate;
  const vehicle = await getVehicle(plate);
  res.status(200).send(vehicle);
  return;
});

app.get("/vehicle/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const id = req.params.id;
  const [vehicle] = await getOneVehicle(id);
  res.status(200).send(vehicle);
  return;
});

app.post("/vehicle", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { model, plate } = req.body;
  const vehicle = await addVehicle(model, plate);
  res.status(201).send(vehicle);
  return;
});

app.put("/vehicle", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { model, plate, id } = req.body;
  const vehicle = await updateVehicle(model, plate, id);
  res.status(201).send(vehicle);
  return;
});

app.delete("/vehicle", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const id = req.query.id;
  const vehicle = await deleteVehicle(id);
  res.status(201).send(vehicle);
  return;
});

// <-- -->

// <-- Transfer -->
app.get("/transfer", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const driverName = req.query.driverName;
  const vehiclePlate = req.query.vehiclePlate;
  const passengerName = req.query.passengerName;
  const increaseDecrease = req.query.increaseDecrease;

  const transfer = await getTransfer(driverName,vehiclePlate,passengerName,increaseDecrease);
  res.status(200).send(transfer);
  return;
});

app.get("/transfer/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const id = req.params.id;
  const [transfer] = await getOneTransfer(id);
  res.status(200).send(transfer);
  return;
});

app.post("/transfer", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const {
    date,
    driver_id,
    passenger_id,
    end_point,
    expedition_time,
    starting_point,
    vehicle_id,
  } = req.body;
  const transfer = await addTransfer(
    date,
    driver_id,
    passenger_id,
    end_point,
    expedition_time,
    starting_point,
    vehicle_id
  );
  res.status(201).send(transfer);
  return;
});

app.put("/transfer", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const {
    date,
    driver_id,
    passenger_id,
    end_point,
    expedition_time,
    starting_point,
    vehicle_id,
    id,
  } = req.body;
  const transfer = await updateTransfer(
    date,
    driver_id,
    passenger_id,
    end_point,
    expedition_time,
    starting_point,
    vehicle_id,
    id
  );
  res.status(201).send(transfer);
  return;
});

// <-- -->

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.send(500).send("server broken!");
});

app.listen(8080);
