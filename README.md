# Planner++
Planner++ is an online event planning platform that aims to make the process of planning events easier and more efficient for users. It provides a comprehensive directory of vendors that offer goods and services for events, such as catering, DJ, venue hosting, and decor. Users can search and compare vendors based on location, price, and ratings, and can book and pay for services directly through the platform. Additionally, the platform provides tools for managing and coordinating event tasks, and allows multiple users to collaborate on the planning of an event. The goal of Planner++ is to help businesses connect with potential customers and streamline their payment processes.

## Tech Stack
This repository contains a React app, an Flask server, and a MongoDB database, all set up to run in Docker containers.

## Requirements
+ Docker
+ Docker Compose
+ Python3
+ Node and Yarn

## Getting Started
Clone this repository and navigate into the project:
cd planner-pp

Build the mongodb image and start the mongodb container:
```docker-compose up```
This command will build the images for the MongoDB database using the Dockerfile provided in the repository, and start the container.

Navigate to the 'planner-flask' directory and run 
```pip3 install -r requirements.txt```
to install the python packages needed for the flask API to work.

Once those have finished installing, run 
```flask run```
to run the web server.

In another terminal, navigate to the 'planner-react' directory, and run 
```yarn```
to install all necessary Node modules.

Once those have finished installing, run 
```yarn start```
to run the react app.

The React app will be running on http://localhost:3000 and the Flask server will be running on http://localhost:5000

## Note
Make sure that the ports 3000 and 5000 are available on your host machine, as those are the ports exposed by the React app and Flask server containers respectively.
MongoDB data will persist in the mongodb-data volume defined in the docker-compose.yml file, so if you remove the containers, data will not be deleted