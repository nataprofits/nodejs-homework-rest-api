// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const { META_PASSWORD, META_MAIL} = process.env;

// const nodemailerConfig = {
//  host: "smtp.meta.ua",
//  port: 465,
//  secure: true,
//  auth: {
//   user: META_MAIL,
//   pass: META_PASSWORD,
//  },
// };

// const transport = nodemailer.createTransport(nodemailerConfig);

// const sendEmail = async (data) => {
//     const email = { ...data, from: META_MAIL };
//     return transport.sendMail(email);

// }

// module.exports = sendEmail;

const ElasticEmail = require("@elasticemail/elasticemail-client");
require("dotenv").config();

const { ELASTIC_API_KEY, META_MAIL } = process.env;

const defaultClient = ElasticEmail.ApiClient.instance;

const { apikey } = defaultClient.authentications;
apikey.apiKey = ELASTIC_API_KEY;

const api = new ElasticEmail.EmailsApi();

const sendEmail = async (data) => {
 const email = ElasticEmail.EmailMessageData.constructFromObject({
  Recipients: [new ElasticEmail.EmailRecipient(data.to)],
  Content: {
   Body: [
    ElasticEmail.BodyPart.constructFromObject({
     ContentType: "HTML",
     Content: "<strong>Test email</strong>",
    }),
   ],
   Subject: "Test email",
   From: META_MAIL,
  },
 });

 try {
  const response = await api.emailsPost(email);
  console.log("Email sent successfully:", response);
 } catch (error) {
  console.error("Error sending email:", error);
  throw error;
 }
};

module.exports = sendEmail;
