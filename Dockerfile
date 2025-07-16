FROM node:16

#Set working directory
WORKDIR /var/src/

#Copy package.json file
COPY ./src/package.json .

#Install node packages
RUN npm install && npm install -g nodemon@2.0.16 && npm i is-stream 

#Copy all files 
COPY ./src .

#Expose the application port
EXPOSE 4000

#Start the application
CMD [ "node", "app.js" ]
