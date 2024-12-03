FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} microservice-user-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "/microservice-user-0.0.1-SNAPSHOT.jar"]