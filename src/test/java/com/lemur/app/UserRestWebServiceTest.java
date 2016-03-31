package com.lemur.app;

//@RunWith(SpringJUnit4ClassRunner.class)
//@WebAppConfiguration
//@ActiveProfiles("test")
//@ContextConfiguration(classes = {TestConfiguration.class, RootContextConfig.class, ServletContextConfig.class})
public class UserRestWebServiceTest {

//    private MockMvc mockMvc;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private WebApplicationContext wac;
//
//    @Before
//    public void init() {
//        mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
//    }

    //    @Test
    //    public void testUpdateMaxCalories() throws Exception {
    //        mockMvc.perform(put("/user")
    //                .contentType(MediaType.APPLICATION_JSON)
    //                .content("200")
    //                .accept(MediaType.APPLICATION_JSON)
    //                .principal(new PrincipalImpl(UserServiceTest.USERNAME)))
    //                .andDo(print())
    //                .andExpect(status().isOk());
    //
    //        //        User user = userRepository.findUserByUsername(UserServiceTest.USERNAME);
    //        User user = new User("test456", new BCryptPasswordEncoder().encode("Password3"), "test@gmail.com", 2000L);
    //        assertTrue("max calories not updated" + user.getMaxCaloriesPerDay(), user.getMaxCaloriesPerDay() == 200);
    //    }
    //
    //    @Test
    //    public void testCreateUser() throws Exception {
    //        mockMvc.perform(post("/user")
    //                .contentType(MediaType.APPLICATION_JSON)
    //                .content("{\"username\": \"testing123\", \"plainTextPassword\": \"Password5\", \"email\": \"test@gmail.com\"}")
    //                .accept(MediaType.APPLICATION_JSON)
    //                .principal(new PrincipalImpl(UserServiceTest.USERNAME)))
    //                .andDo(print())
    //                .andExpect(status().isOk());
    //
    //        User user = new User("test456", new BCryptPasswordEncoder().encode("Password3"), "test@gmail.com", 2000L);
    //        assertTrue("email not correct: " + user.getEmail(), "test@gmail.com".equals(user.getEmail()));
    //    }

}
