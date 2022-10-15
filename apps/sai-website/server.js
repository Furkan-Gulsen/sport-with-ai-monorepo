const express = require("express");
const path = require("path");

const app = express();
const nodemailer = require("nodemailer");
const port = 3200;

app.use(express.static("public"));
app.use(express.json());
app.use("/css", express.static(__dirname + "public/css"));
app.use("/img", express.static(__dirname + "public/img"));
app.use("/img", express.static(__dirname + "public/js"));

app.get("", (req, res) => {
  res.send(__dirname + "public/index.html");
});

app.post("", (req, res) => {
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sportwithai@gmail.com",
      pass: "D83Ju1I2O4HfSzIoJZlO",
    },
  });

  const mailOptions = {
    from: req.body.email,
    subject: "Message from " + req.body.email + ":" + req.body.subject,
    to: "sportwithai@gmail.com",
    text: req.body.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("Email sent: " + info.response);
      res.send("success");
    }
  });
});

app.listen(port, () => console.log("server is running..."));
