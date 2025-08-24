import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTepmlates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVertificationEmail = async (email,vertificationToken) => {
const recipients = [
  { email }
];

try {
    const response = await mailtrapClient.send({
         from: sender,
         to: recipients,
         subject: "Please verify your email !",
         html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}',vertificationToken),
         category:"Email vertification"
    })

    console.log('Email sent successfully ',response);
    
} catch (error) {
    console.error('Error sending notification ' , error)
    throw new Error('Error sending vertification mail')
}

}