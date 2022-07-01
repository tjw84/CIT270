FROM node

# tells the container to start in this directory
WORKDIR /app

# copying this file to avoid conflict with the mode_modules directory
COPY . package.json ./

RUN npm install

COPY . ./

CMD npm start
