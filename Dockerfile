# base image
FROM node:8

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
RUN npm install react-scripts@1.1.1 -g --silent
COPY package.json /usr/src/app/package.json
RUN npm cache clean --force
RUN npm install --silent

# start app
#CMD ["npm", "ls", "--depth=0"]
CMD ["npm", "start"]
