FROM node:latest

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app

EXPOSE 5050

ENTRYPOINT ["node"]
ENV DB_NAME="user_db"
ENV SECRET1='your-secret-key'
CMD ["node","dist/server.js"]