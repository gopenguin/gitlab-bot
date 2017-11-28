FROM node:9

COPY . .
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]

