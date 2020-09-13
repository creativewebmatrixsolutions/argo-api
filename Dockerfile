# FROM node:7
# WORKDIR /app
# COPY package.json /app
# RUN npm install
# COPY . /app
# CMD node index.js
# EXPOSE 8081

FROM node:12

#can be 'development' or 'production'
ENV NODE_ENV=development

# #your app port
ENV PORT=8080

#your mongo connection options
ENV MONGODB_URI=mongodb+srv://maurya00:maurya00@argoappcluster.s68du.mongodb.net/
ENV MONGODB_DB_MAIN=argo
ENV MONGODB_ATLAS_OPTION=retryWrites=true&w=majority
ENV SECRET=e58fd49f530b4457c627

#your github strategy configuration
ENV GITHUB_CLIENT_ID=e58fd49f530b4457c627
ENV GITHUB_CLIENT_SECRET=4b85926ba06405b323f163d234c12996841ff614
ENV GITHUB_CALLBACK_URL=http://localhost:8080/auth/github/callback

#your gitlab strategy configuration
ENV GITLAB_CLIENT_ID=9631980d536058cd864a53b7422b9d287737ccd07a7c0870062c8050a4e1df92
ENV GITLAB_CLIENT_SECRET=6babbd824049793c5e78e9525a33f8445a02539cc3687c590ad3262f111c929e
ENV GITLAB_CALLBACK_URL=http://localhost:8080/auth/gitlab/callback

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json /app

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "run" , "dev"]
