package com.lemur.config.profile;

import com.lemur.config.data.TestDataInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.instrument.classloading.InstrumentationLoadTimeWeaver;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.util.HashMap;
import java.util.Map;

/**
 * Development specific configuration - creates a localhost postgresql datasource,
 * sets hibernate on create drop mode and inserts some test data on the database.
 * Set -Dspring.profiles.active=development to activate this config.
 */
@Configuration
@Profile("development")
@EnableTransactionManagement
public class DevelopmentConfiguration {

    @Bean(initMethod = "init")
    public TestDataInitializer initTestData() {
        return new TestDataInitializer();
    }

    @Bean(name = "datasource")
    public DriverManagerDataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("org.postgresql.Driver");
        dataSource.setUrl("jdbc:postgresql://xgRny321MMpbEwiu55_0QQHcCG@ec2-54-235-102-190.compute-1.amazonaws.com:5432/d6hvc206kp78sr?loglevel=0");
        dataSource.setUsername("czlzuoqzzdnavl");
        dataSource.setPassword("xgRny321MMpbEwiu55_0QQHcCG");
        return dataSource;
    }
//    @Bean(name = "datasource")
//    public DriverManagerDataSource dataSource() {
//        DriverManagerDataSource dataSource = new DriverManagerDataSource();
//        dataSource.setDriverClassName("org.postgresql.Driver");
//        dataSource.setUrl("jdbc:postgresql://localhost:5432/lemur?loglevel=0");
//        dataSource.setUsername("postgres");
//        dataSource.setPassword("postadmin");
//        return dataSource;
//    }

    @Bean(name = "entityManagerFactory")
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(DriverManagerDataSource dataSource) {

        LocalContainerEntityManagerFactoryBean entityManagerFactoryBean = new LocalContainerEntityManagerFactoryBean();
        entityManagerFactoryBean.setDataSource(dataSource);
        entityManagerFactoryBean.setPackagesToScan(new String[]{"com.lemur.app.user.model", "com.lemur.app.common.model"});
        entityManagerFactoryBean.setLoadTimeWeaver(new InstrumentationLoadTimeWeaver());
        entityManagerFactoryBean.setJpaVendorAdapter(new HibernateJpaVendorAdapter());

        Map<String, Object> jpaProperties = new HashMap<String, Object>();
        jpaProperties.put("hibernate.hbm2ddl.auto", "create");
        jpaProperties.put("hibernate.show_sql", "true");
        jpaProperties.put("hibernate.format_sql", "true");
        jpaProperties.put("hibernate.use_sql_comments", "true");
        jpaProperties.put("hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect");
        entityManagerFactoryBean.setJpaPropertyMap(jpaProperties);

        return entityManagerFactoryBean;
    }

}
