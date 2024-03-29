FROM openjdk:17-jdk-alpine
EXPOSE 8080
COPY ./build/libs/*.jar daumnal-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "daumnal-0.0.1-SNAPSHOT.jar"]