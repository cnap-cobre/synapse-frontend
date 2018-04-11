FROM node:8.11.1

RUN mkdir /frontend
WORKDIR /frontend
ADD . /frontend/
RUN npm install
