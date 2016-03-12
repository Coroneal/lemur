# Lemur Sample App #

A sample logging project to demonstrate how a web app can be built using a Spring MVC / AngularJs stack.

### Installation dependencies ###

The following dependencies are necessary: 

 - Java 8
 - Node 0.12 or higher
 - bower
 - maven 3

### Installing frontend dependencies ###

After cloning the repository, the following command installs the Javascript dependencies:

    bower install

### Building and starting the server ###

To build the backend and start the server, run the following command on the root folder of the repository:

    mvn clean install tomcat7:run-war -Dspring.profiles.active=test

The spring test profile will activate an in-memory database. After the server starts, the application is accessible at the following URL:

    http://localhost:8080/

To see a user with existing data (16 meals, 8 days from 1st of January 2015 to the 8th), login with the following credentials:

    username: test123 / password: Password2

#### Backend Security ####

The Spring Security module was used to secure the REST backend (these [guidelines](https://www.owasp.org/index.php/REST_Security_Cheat_Sheet) are in general applied). The application can be made to run in HTTPS-only mode via a server parameter, meaning no pages will be served if the user tries to access it via HTTP.

The Spring Security Form Login mode was used, with fallback to HTTP-Basic Authentication for non-browser based HTTP clients. Protection is in-place against CSRF ([cross-site request forgery](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_%28CSRF%29)). 

Frontend validations are for user convenience only, and where also made on the backend. The use of Angular gives good protection against common problems like [cross-site scripting or HTML injection](https://docs.angularjs.org/misc/faq). The queries on the backend are made using either named queries or the criteria API, which gives good protection against SQL injection.

The password policy is of at least 6 characters with minimum one lower case, one upper case and one numeric. The passwords are not stored in the database in plain text but in a digested form, using the Spring Security [Bcrypt](http://docs.spring.io/autorepo/docs/spring-security/3.2.0.RELEASE/apidocs/org/springframework/security/crypto/bcrypt/BCryptPasswordEncoder.html) password encoder (transparently includes a salt).

### How to run the project against a PostgreSQL database ###

This command starts the application with a local postgresql database:

    mvn clean install tomcat7:run-war -Dspring.profiles.active=development

### How to run the project in HTTPS-only mode ###

The application can be started in HTTPS only mode by using the flag httpsOnly=true. This works in both modes, this is an example of how to start the application in test mode and HTTPS only:

    mvn clean install tomcat7:run-war -Dspring.profiles.active=test -DhttpsOnly=true

The project can be accessed via this URL:

    https://localhost:8443/
    
A warning message is displayed because the test certificate is not accepted by the browser, by accepting the certificate the login page is then displayed.
# lemur
