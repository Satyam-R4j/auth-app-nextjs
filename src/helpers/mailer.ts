import nodemailer from "nodemailer";
import User from "@/models/userModel";

import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToke = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToke,
                verifyTokenExpiry: Date.now() + 3600000,
            });
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToke,
                verifyTokenExpiry: Date.now() + 3600000,
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToke,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            });
        }
        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "298e40af4bb228",
                pass: "0e4aa35299ea55",
            },
        });

        const mailOptions = {
            from: "satyamraj418@gmail.com",
            to: email,
            subject:
                emailType === "VERIFY"
                    ? "Verify your email"
                    : "Reset your password",
            html: `<p>Click <a href="${
                process.env.DOMAIN
            }/verifyemail?token=${hashedToke}">here</a> to ${
                emailType === "VERIFY"
                    ? "verify your email"
                    : "reset your password"
            }or copy and paste the link below in your browser.<br> ${process.env.DOMAIN}/verifyemail?token=${hashedToke}</p>`,
        };

        const mailresponse = await transport.sendMail(mailOptions);

        return mailresponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
