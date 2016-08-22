package com.lemur.app.webconfig;

import com.lemur.app.user.controller.UserController;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Spring MVC config for the servlet context in the application.
 * The beans of this context are only visible inside the servlet context.
 */
@Configuration
@EnableWebMvc
@ComponentScan(basePackageClasses = {
        UserController.class
})
public class ServletContextConfig extends WebMvcConfigurerAdapter {


    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
    }
}
