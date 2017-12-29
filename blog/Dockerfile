FROM node:alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install App dependencies
COPY package.json /usr/src/app
RUN npm install

# Bundle app resources
COPY . /usr/src/app

RUN npm run build
EXPOSE 3000

CMD [ "npm", "run", "start" ]