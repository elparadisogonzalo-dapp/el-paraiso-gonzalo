FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/package.json
COPY prisma prisma
RUN pnpm install --no-frozen-lockfile
COPY apps/api apps/api
RUN pnpm --filter @epg/api prisma:generate && pnpm --filter @epg/api build
FROM node:22-alpine
ENV NODE_ENV=production
WORKDIR /app
RUN addgroup -S app && adduser -S app -G app
COPY --from=build /app/apps/api/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/api/node_modules ./apps/api/node_modules
USER app
EXPOSE 4000
CMD ["node","dist/main.js"]
