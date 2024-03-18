const mail = require("nodemailer");

const transporter = mail.createTransport({

    service:"gmail",
    auth:{

        user:"piyushdhote190@gmail.com",
        pass:"vjsbyedailpnflbp"
    }
})

module.exports = transporter