package com.lemur;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

import javax.persistence.EntityManagerFactory;

import static com.lemur.AppConfigConstants.CONTROLLERS_SCAN_REGEX;
import static com.lemur.AppConfigConstants.ROOT_PACkAGE;

@EnableAutoConfiguration
@SpringBootApplication
@ComponentScan(basePackages = ROOT_PACkAGE,
        excludeFilters = @ComponentScan.Filter(type = FilterType.REGEX, pattern = CONTROLLERS_SCAN_REGEX)
)
public class LemurBootApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(LemurBootApplication.class, args);
    }

    @Bean(name = "transactionManager")
    public PlatformTransactionManager transactionManager(EntityManagerFactory entityManagerFactory,
                                                         DriverManagerDataSource dataSource) {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(entityManagerFactory);
        transactionManager.setDataSource(dataSource);
        return transactionManager;
    }
}