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

### Unique Feature
- Restricts multiple device login (like OTT platforms) to avoid the loss of data 
 
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
* MongoDB deployed at https://cloud.mongodb.com/. Its a serverless instance deployed to AWS. 
* Deployed on vercel/railway. 
* DB name: databuddy
