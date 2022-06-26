"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("firebase/app"));
require("firebase/auth");
const firebaseConfig = {
    apiKey: 'AIzaSyBE82llw-3Ban68ZpfbXNWkfxHjI-pR3ms',
    authDomain: 'databuddy-12bd6.firebaseapp.com',
    projectId: 'databuddy-12bd6',
    storageBucket: 'databuddy-12bd6.appspot.com',
    messagingSenderId: '710393014466',
    appId: '1:710393014466:web:0168400f0d1e105cf9335b',
};
// Initialize Firebase
app_1.default.initializeApp(firebaseConfig);
exports.default = app_1.default;
//# sourceMappingURL=firebase.js.map