FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} microservice-creditEvaluation-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "/microservice-creditEvaluation-0.0.1-SNAPSHOT.jar"]