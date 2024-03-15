FROM node:20.11.1-alpine3.19
WORKDIR /home/frontend
COPY . /home/frontend
EXPOSE 3001
RUN npm install
RUN npm run build
CMD [ "npm","run","start" ]