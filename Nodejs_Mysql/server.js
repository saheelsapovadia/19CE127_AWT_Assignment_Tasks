const express = require("express");
require("dotenv").config();
const mysql = require("mysql");

const app = express();

//Create DB connection
//Create Database
//Create Table
//Insert Record

//Display Record => SELECT * from studentInfo

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "University",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected successfully to MySql server");
});

//db-create => create Database

app.get("/db-create", (req, res) => {
  const dbquery = "CREATE DATABASE IF NOT EXISTS University";

  connection.query(dbquery, (err, result) => {
    if (err) throw err;
    console.log("Database created successfully", result);
  });
});

app.get("/db-table", (req, res) => {
  const dbtable = `CREATE TABLE IF NOT EXISTS saheel(
        studentID varchar(10) NOT NULL,
        fname varchar(50) NOT NULL,
        lname varchar(50) NOT NULL,
        mobileNo varchar(15) NOT NULL,
        PRIMARY KEY (studentID))`;

  connection.query(dbtable, (err, result) => {
    if (err) throw err;
    console.log("Table created successfully", result);
  });
});

app.get("/check-table", (req, res) => {
  const dbtable = `desc facultyInfo`;

  connection.query(dbtable, (err, result) => {
    if (err) throw err;
    console.log("Table checked successfully", result);
  });
});

app.get("/db-delete", (req, res) => {
  const dbDelete = `delete from studentInfo`;
  connection.query(dbDelete, (err, result) => {
    if (err) throw err;
    console.log("Table rows Deleted successfully", result);
  });
});
//db-insert => Insert Record into studentInfo Table
// app.get("/create-student",(req,res)=>{
//     const query = `CREATE TABLE IF NOT EXISTS studentInfo(
//         studentID varchar(10) NOT NULL,
//         fname varchar(50) NOT NULL,
//         lname varchar(50) NOT NULL,
//         mobileNo varchar(15) NOT NULL,
//         PRIMARY KEY (studentID))`
// })

app.get("/db-insert", (req, res) => {
  const dbInsert = `INSERT INTO studentInfo
    (studentID,fname,lname,mobileNo)
    VALUES ('111','Saheel','Sapovadia','7036805303'),
    ('112','Ryan','Reynolds','123456789'),
    ('113','Gal','Gadot','987654321')`;

  connection.query(dbInsert, (err, result) => {
    if (err) throw err;
    console.log(`Total affected ROWS: ${result["affectedRows"]}`);
  });
});

app.get("/db-display", (req, res) => {
  const dbFetch = `SELECT * FROM studentInfo`;

  connection.query(dbFetch, (err, result) => {
    if (err) throw err;
    console.log("Data successfully fetched-", result);
    res.json(result);
  });
});

app.listen(process.env.PORT, () => {
  console.log("App running on localhost:", process.env.PORT);
});
