const nodemailer = require("nodemailer")
const path = require("path")
const hbs = require("nodemailer-express-handlebars")

const {host, port, user, pass} = require("../config/mail.json")

const transport = nodemailer.createTransport({
  host,
  port,
  auth: {
    user,
    pass
  }
});

const handlebarOptions = {
  viewEngine: {
    extName: '.html',
    partialsDir: path.resolve("./src/resources/mail/partials") ,
  },
  viewPath: path.resolve("./src/resources/mail/") ,
  extName: '.html',
};

transport.use("compile", handlebarOptions)

module.exports = transport