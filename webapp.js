// IMPORTiNG
const express = require("express");
const webapp = express();

const path = require("path");
const { urlencoded } = require("body-parser");
const port = 8000;

// EXPRESS
webapp.use(express.static("staticFiles"));
// webapp.use(express.urlencoded());
webapp.use(express.urlencoded(/*{ extended: true }*/));

// PUG
webapp.set("view engine", "pug");
webapp.set("views", path.join(__dirname, "views"));

// END POINTS
webapp.get("/", (req, res) => {
  res.status(200).render("home.pug");
});

// Contact form content storing
const fs = require("fs");
let no = 0;

webapp.post("/", (req, res) => {
  let obj = req.body;
  no++;
  append(no, obj);
});

function append(no, obj) {
  let toappend = `{
        Submission no: ${no},
        First Name: ${obj.firstname},
        Last Name: ${obj.lastname},
        E-mail: ${obj.mail},
        Subject: ${obj.subject},
        Message: ${obj.Message}
    }`;
  console.log("This is toappend string", toappend);
  fs.appendFile("contactFormDetails.txt", toappend, (err) => {
    if (err) {
      console.log("There is some error in storing details!");
    } else {
      console.log("Details added successfully!");
    }
  });
}

webapp.get("/about", (req, res) => {
  res.status(200).render("about.pug");
});

webapp.get("/services", (req, res) => {
  res.status(200).render("service.pug");
});

webapp.get("/projects", (req, res) => {
  res.status(200).render("projects.pug");
});

webapp.get("/clients", (req, res) => {
  res.status(200).render("clients.pug");
});

// LISTENING
webapp.listen(port, () => {
  console.log(`My webapp is started on localhost:${port}`);
});
