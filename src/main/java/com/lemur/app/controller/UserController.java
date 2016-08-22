package com.lemur.app.controller;


import com.lemur.app.dto.SuccessDTO;
import com.lemur.app.dto.user.NewUserDTO;
import com.lemur.app.dto.user.UserInfoDTO;
import com.lemur.app.model.User;
import com.lemur.app.services.UserService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

/**
 * REST service for users.
 */

@Controller
@RequestMapping("/user")
public class UserController {

    private static final Logger LOGGER = Logger.getLogger(UserController.class);

    @Autowired
    UserService userService;

    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(method = RequestMethod.GET)
    public UserInfoDTO getUserInfo(Principal principal) {

        User user = userService.findUserByUsername(principal.getName());
        return user != null ? new UserInfoDTO(user.getUsername(), user.getEmail()) : null;
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(method = RequestMethod.POST)
    public void createUser(@RequestBody NewUserDTO user) {
        userService.createUser(user.getUsername(), user.getEmail(), user.getPlainTextPassword());
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/check", method = RequestMethod.GET)
    public SuccessDTO checkUsername(@RequestParam(value = "username") String username) {
        return new SuccessDTO(userService.checkUsername(username));
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/details", method = RequestMethod.GET)
    public UserInfoDTO userDetails(@RequestParam(value = "username") String username) {
        User user = userService.findUserByUsername(username);
        return user != null ? new UserInfoDTO(user.getUsername(), user.getEmail()) : null;
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> errorHandler(Exception exc) {
        LOGGER.error(exc.getMessage(), exc);
        return new ResponseEntity<>(exc.getMessage(), HttpStatus.BAD_REQUEST);
    }

}
