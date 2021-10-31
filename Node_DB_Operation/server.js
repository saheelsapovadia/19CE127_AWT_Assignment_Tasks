const express = require("express");
const bodyparser = require("body-parser");
const exhbs = require("express-handlebars");
const mysql = require("mysql");
const app = express();
const path = require("path");
//Database connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "University",
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected successfully to MySql server");
});

app.engine(
  "hbs",
  exhbs({
    defaultLayout: "main", //main handlebar should be displayed when first my   website will be loaded
    extname: ".hbs", //we can change extension using extname flags..so here  we'll write .hbs extension which we r going to use
  })
);

app.set("view engine", "hbs");
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.urlencoded({ extended: true }));

app.get("/add-course", (req, res) => {
  res.render("addCourse.hbs", { title: "add course" });
});

app.post("/add-course", (req, res) => {
  const dbtable = `CREATE TABLE IF NOT EXISTS courseInfo(
        subjectCode varchar(10) NOT NULL,
        subjectName varchar(50) NOT NULL,
        instituteName varchar(50) NOT NULL,
        departmentName varchar(15) NOT NULL,
        semester varchar(15) NOT NULL,
        PRIMARY KEY (subjectCode))`;

  connection.query(dbtable, (err, result) => {
    if (err) throw err;
    console.log("Table created successfully", result);
  });
  const data = req.body;
  console.log("add course data", req.body);
  const addCourseQuery = `INSERT INTO courseInfo
    (subjectCode,subjectName,instituteName,departmentName,semester)
    VALUES ('${data.subjectcode}','${data.subjectname}','${data.institutename}','${data.departmentname}','${data.semester}')`;
  // ,'CSPIT','Computer Engineering','Fifth')`;

  connection.query(addCourseQuery, (err, result) => {
    if (err) throw err;
    console.log("course added successfully", result);
    res.status(200).redirect("/show-courses");
  });
});
app.get("/show-courses", (req, res) => {
  const getCourses = "SELECT * from courseInfo";

  connection.query(getCourses, (err, result) => {
    if (err) throw err;
    console.log("Data retrieved!", result);
    res.render("showCourses.hbs", { title: "Current Courses", array: result });
  });
});
app.get("/delete", (req, res) => {
  const dbDelete = `delete from courseinfo`;
  connection.query(dbDelete, (err, result) => {
    if (err) throw err;
    console.log("Table rows Deleted successfully", result);
    res.status(200).send({ msg: "success" });
  });
});
app.listen(3000, () => {
  console.log("Server running on 3000");
});
