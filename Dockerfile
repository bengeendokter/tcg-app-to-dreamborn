FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files
COPY ["package.json", "pnpm-lock.yaml*", "./"]

# Install dependencies with pnpm
RUN pnpm install --prod --silent

COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["pnpm", "start:server"]
