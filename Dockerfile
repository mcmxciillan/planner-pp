# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /planner-fe

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Start the react app
CMD ["npm", "start"]

# Use an official Python runtime as the base image
FROM python:3.9

# Set the working directory in the container
WORKDIR /planner-api

# Copy the requirements.txt file to the container
COPY requirements.txt .

# Install the dependencies
RUN pip install -r requirements.txt

# Copy the rest of the application code to the container
COPY . .

# Start the Flask app
CMD ["flask", "run"]

# Expose port 5000 for the Flask app
EXPOSE 5000

# Use the official MongoDB image as the base image for the database container
FROM mongo:4

# Set the working directory in the container
WORKDIR /data

# Start the MongoDB service
CMD ["mongod"]

# Expose port 27017 for the MongoDB service
EXPOSE 27017