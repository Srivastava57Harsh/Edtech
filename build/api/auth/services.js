"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtp = void 0;
const auth_1 = require("firebase/auth");
const sendOtp = async (phone, appVerifier) => {
    const phoneNumber = '+91' + phone;
    console.log(phoneNumber);
    try {
        //   const appVerifier = window.recaptchaVerifier;
        const auth = (0, auth_1.getAuth)();
        (0, auth_1.signInWithPhoneNumber)(auth, phoneNumber, appVerifier).then(confirmationResult => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            //   window.confirmationResult = confirmationResult;
            console.log('OTP has been sent');
            // ...
        });
    }
    catch (error) {
        // Error; SMS not sent
        console.log('SMS not sent');
        console.log(error);
    }
};
exports.sendOtp = sendOtp;
//# sourceMappingURL=services.js.map