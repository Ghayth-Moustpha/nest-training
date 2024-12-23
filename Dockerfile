# Dockerfile

# Step 1: Use a Node.js base image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install --production

# Step 4: Copy the rest of the application files
COPY . .

# Step 5: Build the NestJS app (if needed)
RUN npm run build

# Step 6: Expose the port your NestJS app runs on (e.g., 3000)
EXPOSE 3000

# Step 7: Start the application
CMD ["npm", "run", "start:prod"]
