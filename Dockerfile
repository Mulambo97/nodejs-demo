FROM node
LABEL authors="Odon Mulambo"

# update dependencies and install curl
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create app directory

WORKDIR /app

#This will copy everything from the source path

COPY . .

# update each dependency in package.json to latest --v

RUN npm install -g npm-check-updates \
    ncu -u \
    npm install \
    npm install express \
    npm install babel-cli \
    npm install babel-preset \
    npm install babel-preset-env

# for production
RUN npm ci --only=production

#Bundle app source
COPY . /app
EXPOSE 3000
CMD ["babel-node", "app.js"]
