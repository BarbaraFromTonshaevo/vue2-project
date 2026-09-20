FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
ENV PORT=7860
EXPOSE 7860
USER node
CMD ["node", "index.js"]
