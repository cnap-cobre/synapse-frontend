FROM node:8

RUN useradd --user-group --create-home --shell /bin/false app
ENV HOME=/home/app

COPY package.json package-lock.json $HOME/frontend/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/frontend
RUN chown -R app:app $HOME/frontend/
RUN npm install
RUN npm cache clean --force
