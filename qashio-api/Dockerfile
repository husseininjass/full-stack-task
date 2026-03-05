# Uses Node 22.8.0 as the base environment
FROM node:22.8.0

# Create the working directory inside the container
WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install the base dependencies from package.json
RUN npm install && \
    npm install @nestjs/typeorm typeorm pg class-validator class-transformer
# Copy the rest of your source code
COPY . .

# Install development tools
RUN npm install -g ts-node-dev
RUN npm run build
EXPOSE 3000

# Start NestJS in watch mode
CMD ["npm", "run", "start:dev"]