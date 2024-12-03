FROM node:18-alpine

WORKDIR /app
COPY . /app

#nstall dependencies
RUN npm install
RUN npm run build

#Expose port 
EXPOSE 3000

CMD [ "npm", "start" ]
