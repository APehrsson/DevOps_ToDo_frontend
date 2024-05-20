FROM node:slim
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["sh", "-c", "npm run build && npm start"]
