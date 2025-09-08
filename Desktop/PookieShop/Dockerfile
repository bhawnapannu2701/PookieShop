# ---------- Build stage ----------
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn -q -DskipTests clean package

# ---------- Run stage ----------
FROM eclipse-temurin:17-jre
WORKDIR /app
ENV PORT=8080
EXPOSE 8080
COPY --from=build /app/target/*.jar /app/app.jar
ENTRYPOINT ["java","-Dserver.port=${PORT}","-jar","/app/app.jar"]
