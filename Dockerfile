# Use an official Ubuntu image as a base
FROM ubuntu:20.04

# Install necessary dependencies
RUN apt-get update && \
    apt-get install -y software-properties-common && \
    apt-add-repository --yes --update ppa:ansible/ansible && \
    apt-get install -y ansible && \
    apt-get install -y nodejs && \
    apt-get install -y npm && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /usr/src/app

# Copy the Ansible Vault-encrypted file
COPY .env .env.encrypted

ARG ANSIBLE_VAULT_PASSWORD

# Decrypt the .env file using Ansible Vault
RUN ansible-vault decrypt --vault-password-file=/tmp/vault_pass.txt .env.encrypted --output=.env

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port on which the app will run
EXPOSE 4000

# Define the command to run your application
CMD [ "npm", "run", "start" ]
