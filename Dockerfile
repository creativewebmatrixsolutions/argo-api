FROM node:12

#can be 'development' or 'production'
ENV NODE_ENV=development

# #your app port
ENV PORT=8080

#your mongo connection options
ENV MONGODB_URI=""
ENV MONGODB_DB_MAIN=""
ENV MONGODB_ATLAS_OPTION=""
ENV SECRET=""

#your github strategy configuration
ENV GITHUB_CLIENT_ID=""
ENV GITHUB_CLIENT_SECRET=""
ENV GITHUB_CALLBACK_URL=""

#your gitlab strategy configuration
ENV GITLAB_CLIENT_ID=""
ENV GITLAB_CLIENT_SECRET=""
ENV GITLAB_CALLBACK_URL=""

# Create app directory
WORKDIR /app

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /app

EXPOSE 8080
CMD [ "npm", "run" , "dev"]
