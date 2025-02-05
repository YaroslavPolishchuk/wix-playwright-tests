FROM mcr.microsoft.com/playwright:v1.42.0

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npx playwright install --with-deps

CMD npm start