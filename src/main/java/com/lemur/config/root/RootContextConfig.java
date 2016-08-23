package com.lemur.config.root;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

import javax.persistence.EntityManagerFactory;

import static com.lemur.config.root.AppConfigConstants.ROOT_PACkAGE;
import static com.lemur.config.root.AppConfigConstants.CONTROLLERS_SCAN_REGEX;

/**
 * The root context configuration of the application - the beans in this context will be globally visible
 * in all servlet contexts.
 */

@Configuration
@ComponentScan(basePackages = ROOT_PACkAGE,
        excludeFilters = @ComponentScan.Filter(type = FilterType.REGEX, pattern = CONTROLLERS_SCAN_REGEX)
)
public class RootContextConfig {

    @Bean(name = "transactionManager")
    public PlatformTransactionManager transactionManager(EntityManagerFactory entityManagerFactory,
                                                         DriverManagerDataSource dataSource) {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(entityManagerFactory);
        transactionManager.setDataSource(dataSource);
        return transactionManager;
    }

}
