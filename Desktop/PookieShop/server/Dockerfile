# ---------- Build stage ----------
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
# Build fat JAR (tests skip)
RUN mvn -q -DskipTests clean package

# ---------- Run stage ----------
FROM eclipse-temurin:17-jre
WORKDIR /app
# Render provides PORT env; keep fallback 8080
ENV PORT=8080
EXPOSE 8080
COPY --from=build /app/target/*.jar /app/app.jar
# Double-safety: app.yml also reads ${PORT}, and we set -Dserver.port too
CMD ["java","-Dserver.port=${PORT}","-jar","/app/app.jar"]
