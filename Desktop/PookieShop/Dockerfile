# ---------- Build stage ----------
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
# Copy only the backend sources from the monorepo
COPY server/pom.xml ./pom.xml
COPY server/src ./src
# Build the fat JAR (skip tests)
RUN mvn -q -DskipTests clean package

# ---------- Run stage ----------
FROM eclipse-temurin:17-jre
WORKDIR /app
# Render provides PORT; keep 8080 for local fallback
ENV PORT=8080
EXPOSE 8080
COPY --from=build /app/target/*.jar /app/app.jar
# Extra safety: force server.port from env
CMD ["java","-Dserver.port=${PORT}","-jar","/app/app.jar"]
