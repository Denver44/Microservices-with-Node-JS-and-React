# Use the official Node.js Alpine image as the base image
FROM node:alpine

# Set the working directory in the Docker image to /app
WORKDIR /app

# Copy the package.json file from your host to the present location (.) in your image
COPY package.json ./

# Run the npm install command in your image filesystem
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem
COPY ./ ./

# Configure the Docker image to execute the "npm start" command by default when it starts up
CMD ["npm", "start"]