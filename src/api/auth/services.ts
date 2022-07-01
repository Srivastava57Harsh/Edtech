// import firebase from './firebase';
// import { getAuth, signInWithPhoneNumber } from 'firebase/auth';

// const sendOtp = async (phone: number, appVerifier: any) => {
//   const phoneNumber = '+91' + phone;
//   console.log(phoneNumber);
//   try {
//     //   const appVerifier = window.recaptchaVerifier;
//     const auth = getAuth();
//     signInWithPhoneNumber(auth, phoneNumber, appVerifier).then(confirmationResult => {
//       // SMS sent. Prompt user to type the code from the message, then sign the
//       // user in with confirmationResult.confirm(code).
//       //   window.confirmationResult = confirmationResult;
//       console.log('OTP has been sent');
//       // ...
//     });
//   } catch (error) {
//     // Error; SMS not sent
//     console.log('SMS not sent');
//     console.log(error);
//   }
// };

// // const verifyOtp = async (hash: string, phone: number, otp: number) => {
// //   try {
// //     let [hashValue, expires] = hash.split('.');
// //     let now = Date.now();
// //     if (now > parseInt(expires)) {
// //       return { code: 504, message: 'Timeout. Please try again' };
// //     }
// //     let data = `${phone}.${otp}.${expires}`;
// //     let newCalculatedHash = crypto.createHmac('sha256', config.smskey).update(data).digest('hex');
// //     if (newCalculatedHash === hashValue) {
// //       const db = await database();
// //       const user = await db.collection('users').findOne({ phone: phone });
// //       if (!user) return { code: 404, message: 'User not found' };
// //       if (user.isVerified) return { code: 409, message: 'User already verified' };
// //       const users = (await database()).collection('users');
// //       await users.updateOne({ phone: phone }, { $set: { isVerified: true } });
// //       return { code: 200, message: 'User Verified' };
// //     } else {
// //       return {
// //         code: 400,
// //         message: 'Incorrect OTP',
// //       };
// //     }
// //   } catch (err) {
// //     console.log(err);
// //   }
// // };

// export { sendOtp };
