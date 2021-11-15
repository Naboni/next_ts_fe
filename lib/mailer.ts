const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yonimerkebu111@gmail.com",
    pass: "kikidouloveme",
  },
});


function mailer(message: string, subject: string) {
  return new Promise((resolve, reject) => {
    let mailOptions = {
      from: "Betopia Digital",
      to: "se.yonatan.merkebu@gmail.com",
      subject: subject,
      html: `<h2>Betopia Digital</h2>
                  <br>
              <p>${message}</p>`,
    };

    transporter.sendMail(mailOptions, function (err: any, data: any) {
      if (err) {
        reject({ success: false, message: err });
      } else {
        resolve({ success: true, message: "Email sent successfully" });
      }
    });
  });
}

export { mailer };
