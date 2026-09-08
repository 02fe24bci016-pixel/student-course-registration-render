# Student Course Registration System

A simple Student Course Registration System built using Node.js and Express. It is ready to deploy on Render.

## 1. Run locally

Install Node.js, then open a terminal in this folder:

```bash
npm install
npm start
```

Open:

http://localhost:3000

## 2. Deploy on Render

1. Create a GitHub repository.
2. Upload all files from this project to the repository.
3. Sign in to Render.
4. Create a new **Web Service**.
5. Connect the GitHub repository.
6. Use these settings:
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
7. Click **Deploy Web Service**.
8. Render provides a public HTTPS URL.

## 3. IaaS, PaaS and SaaS explanation

### IaaS
Infrastructure as a Service provides virtual machines, storage and networking. Example: AWS EC2, Microsoft Azure Virtual Machines.

For this project, an IaaS deployment would mean manually creating a server/VM, installing Node.js, uploading the application and configuring the server.

### PaaS
Platform as a Service provides the application runtime and deployment platform. Render Web Service is used as the PaaS layer in this project.

The developer supplies the Node.js application, `package.json`, build command and start command. Render manages the server infrastructure and application process.

### SaaS
Software as a Service is the final application delivered to end users through a web browser.

After deploying this project to Render, students/users access the registration system through the public Render URL. Thus, the deployed Student Course Registration System can be considered the SaaS application consumed by users.

## Architecture

Student Browser
      |
      v
Render Web Service (PaaS)
      |
      v
Node.js + Express Application
      |
      v
Course Registration API

## Important note

This demo stores registrations in server memory. If the Render service restarts, registrations are reset.

For a real production system, connect a persistent database such as PostgreSQL and store students, courses and registrations in database tables.
