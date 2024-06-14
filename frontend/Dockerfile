FROM ubuntu:latest

RUN apt update && apt upgrade -y && apt install -y npm
WORKDIR /root/tagnotes_react
CMD npm install && npm run build && npm run start
