const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD, META_MAIL} = process.env;

const nodemailerConfig = {
 host: "smtp.meta.ua",
 port: 465,
 secure: true,
 auth: {
  user: META_MAIL,
  pass: META_PASSWORD,
 },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
    const email = { ...data, from: META_MAIL };
    return transport.sendMail(email);

}
 
module.exports = sendEmail;