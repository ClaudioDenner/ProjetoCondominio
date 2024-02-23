FROM node:20.11.1-alpine3.19
WORKDIR /home/backend
COPY . /home/backend
EXPOSE 3000
RUN npm install
RUN npx prisma generate
RUN npm run build
CMD [ "npm","run","start" ]