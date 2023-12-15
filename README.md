# Your NestJS Application

This repository contains a NestJS application that can be run locally.

## Prerequisites

Before you begin, ensure that you have the following installed:

- Node.js and npm: [Install Node.js](https://nodejs.org/)
- Ansible: [Install Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-nestjs-app.git
    cd your-nestjs-app
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Decrypt the `.env` file using Ansible:**

    ```bash
    ansible-vault decrypt .env 
    ```

    Replace `your_vault_password` with your actual Ansible Vault password.

4. **Run the application:**

    ```bash
    npm run start
    ```

    This will start your NestJS application.

5. **Access the application:**

    Open your web browser and go to [http://localhost:4000](http://localhost:4000) to access the running NestJS application.

6. **Access Swagger UI:**

    Once your NestJS application is running, you can explore the API documentation using Swagger UI. Open your web browser and go to:

    [http://localhost:4000/docs](http://localhost:4000/docs)

    This URL provides access to the Swagger UI interface, allowing you to interactively explore and test your API endpoints.

## Stopping the Application

To stop the running NestJS application, you can use `Ctrl + C` in the terminal where the application is running.
