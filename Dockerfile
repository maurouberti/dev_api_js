FROM node:13-alpine
WORKDIR /node-app
CMD ["node", "dist/server.js"]

# Produção (não funcionou)
#RUN ["mkdir", "/node-app"]
#ADD ["./api", "/node-app"]
#RUN npm install
#RUN ./node_modules/.bin/babel ./src -d ./dist
#CMD ["node", "dist/server.js"]

# Desenvolvimento
#CMD ["nodemon", "./src/server.js", "--exec, "babel-node"]