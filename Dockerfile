FROM node:9

COPY . .

EXPOSE 8080

CMD ["node", "server.js"]

