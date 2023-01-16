# Planner++
Planner++ is an online event planning platform that aims to make the process of planning events easier and more efficient for users. It provides a comprehensive directory of vendors that offer goods and services for events, such as catering, DJ, venue hosting, and decor. Users can search and compare vendors based on location, price, and ratings, and can book and pay for services directly through the platform. Additionally, the platform provides tools for managing and coordinating event tasks, and allows multiple users to collaborate on the planning of an event. The goal of Planner++ is to help businesses connect with potential customers and streamline their payment processes.

## Tech Stack
This repository contains a React app, an Express server, and a MongoDB database, all set up to run in Docker containers.

## Requirements
+ Docker
+ Docker Compose

## Getting Started
Clone this repository:
Copy code
git clone https://github.com/yourusername/your-repo.git
Change to the project directory:
Copy code
cd your-repo
Build the images and start the containers:
```docker-compose up```
This command will build the images for the React app, Express server, and MongoDB database using the Dockerfiles provided in the repository, and start the containers.

The React app will be running on http://localhost:3000 and the Express server will be running on http://localhost:5000
Stopping the Containers
You can use CTRL+C to stop the containers.

Alternatively, you can use the following command to stop the running containers:

```docker-compose down```

## Note
Make sure that the ports 3000 and 5000 are available on your host machine, as those are the ports exposed by the React app and Express server containers respectively.
MongoDB data will persist in the mongodb-data volume defined in the docker-compose.yml file, so if you remove the containers, data will not be deleted
You can customize the docker-compose.yml file to suit your needs, for example, if you want to specify custom environment variables for the services or configure other options.
And that's it! You have your React app, Express server, and MongoDB database running in Docker containers