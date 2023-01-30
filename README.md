<div align="center">
<h1 style="margin: 0">DataBuddy</h1>
</div>

<p align="center">
Edtech Platform for students
</p>

<p align="center">
    <img src="https://img.shields.io/badge/version-1.0.0-yellowgreen" alt="version 1.0.0"/>
    <img src="https://img.shields.io/badge/author-Harsh-blue" alt="author Harsh"/>
</p>

## Usage 

This project is an alpha version of a high standard technical education providing platform, this was experimentally created to help students and specially those teachers who feel the lack of independent platforms to provide education about software learning, coding, languages and more.
This prototype provides two different and separate portals for both the student and teacher, teacher can use the admin portal to add, edit and maintain courses where as student is allowed to use the main website to access the contents. 

## Purpose 
Main purpose for the creation of such platform was for small scale organizations who might have the right potential to spread knowledge but lack with the methods!
Such Organizations can bootstrap the same thereby contributing a minor role in the ecosystem of open source.

## Functionalities 💻

- Provides full authentication for user and admin using serverless APIs
- Provides two different handling portals for the organization
- Supports OTP validation (currently not in use //commented) 🟢
- Showcases the numerous courses added by admin but in protected manner (courses are locked until bought) 🔴
- Admin can add limitless number of course with appropriate github repositories and youtube videos
- Self Integrated Razorpay payment portal for payments (including webhook)

### Unique Feature
- Restricts multiple device login (like OTT platforms) to avoid the loss of data 
 
### Built With

This project is handcrafted purely from scratch and is built with the below listed frameworks:

* ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
* ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
* ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
* ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
* ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
* ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
* ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
* ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
 
## Installation 🔧

#### Install dependencies and build the server

```
$ yarn && yarn build
```

#### Setup Environment

```
$ .env // setup env with reference to .env.example
```

#### Start the development server

```
$ yarn dev
```

#### Start the client (frontend)

```
$ cd ./client
$ yarn dev
```

## Production
* MongoDB deployed at https://cloud.mongodb.com/. 
* Its a serverless instance deployed to railway.app && vercel. 
* DB name: databuddy

### Contributers
| <p align="center">![Harsh Srivastava](https://github.com/Srivastava57Harsh.png?size=128)<br>[Harsh Srivastava](https://github.com/Srivastava57Harsh)</p> | <p align="center">![Mohd Zaid](https://github.com/dev-zaid.png?size=128)<br>[Mohd Zaid](https://github.com/dev-zaid)</p> |
| -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
