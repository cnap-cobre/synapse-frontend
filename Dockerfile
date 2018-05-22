# base image
FROM node:8

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache react-scripts globally
RUN npm install react-scripts@1.1.1 -g --silent \
    && npm cache clean --force --silent

# set working directory
WORKDIR /usr/src/app
RUN mkdir /usr/src/app/stats
RUN mkdir /usr/src/app/dist
RUN chown -R node:node /usr/src/app && chmod -R 755 /usr/src/app

# Don't run stuff as root
USER node

# install app dependencies
RUN npm -v
COPY package.json /usr/src/app/package.json
RUN npm install \
    && npm cache clean --force --silent

# start app
CMD ["npm", "start"]
