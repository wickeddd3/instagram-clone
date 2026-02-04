FROM node:20
WORKDIR /app

# Define ARGs so Docker can receive them during the build phase
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY

# Set them as ENV so Vite's build process can see them
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY

# Prevent esbuild architecture mismatch
COPY package*.json ./
COPY yarn.lock* ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 5173
CMD ["yarn", "dev"]