import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailTepmlates.js";
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

export const sendWelcomeMail = async (email, username) =>{
  const recipients = [
  { email }
];
try {
  
 const response = await mailtrapClient.send({
         from: sender,
         to: recipients,
         subject: "Your are successfully verified",
         html: WELCOME_EMAIL_TEMPLATE.replace('{username}',username),
         category:"Email vertification"
    })

    console.log('Email sent successfully ',response);

} catch (error) {
  
}
}

export const sendPasswordResetEmail = async (email,resetUrl) =>{
    const recipients = [
  { email }
];
try {
  
 const response = await mailtrapClient.send({
         from: sender,
         to: recipients,
         subject: "Reset your Password",
         html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}',resetUrl),
         category:"Forgot Password Email"
    })

    console.log('Email sent successfully ',response);

} catch (error) {
  console.log(error);
  
}
}

export const sendPasswordResetSuccessEmail = async(email) =>{
      const recipients = [{ email }];

      try {
         const response = await mailtrapClient.send({
         from: sender,
         to: recipients,
         subject: "Reset your Password",
         html: PASSWORD_RESET_SUCCESS_TEMPLATE,
         category:"Password Reset Successfull"
    })

    console.log('Email sent successfully ',response);
      } catch (error) {
        console.log(error);
      }

}