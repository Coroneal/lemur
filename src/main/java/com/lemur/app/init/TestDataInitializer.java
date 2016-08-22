package com.lemur.app.init;

import com.lemur.app.model.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManagerFactory;

/**
 * This is a initializing bean that inserts some test data in the database. It is only active in
 * the development profile, to see the data login with user123 / PAssword2
 */
@Component
public class TestDataInitializer {

    @Autowired
    private EntityManagerFactory entityManagerFactory;

    private static  BCryptPasswordEncoder bCrypt = new BCryptPasswordEncoder();

    public void init() throws Exception {

        SessionFactory sessionFactory = entityManagerFactory.unwrap(SessionFactory.class);

        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();

        session.persist(new User("test123", bCrypt.encode("Password1"), "test@email.com"));
        session.persist(new User("slawek", bCrypt.encode("Password1"), "test@email.com"));

//        session.persist(new Meal(user, new Date(115, 0, 1), new Time(12, 0, 0), "1 - Mitraillette", 2000L));
//        session.persist(new Meal(user, new Date(115, 0, 1), new Time(19, 0, 0), "1 - Eggplant Parmesan", 1000L));
//        session.persist(new Meal(user, new Date(115, 0, 2), new Time(12, 0, 0), "2 -  Chickpea with roasted cauliflower", 2000L));
//        session.persist(new Meal(user, new Date(115, 0, 2), new Time(19, 0, 0), "2 - Chicken Stew with Turnips & Mushrooms", 1000L));
//        session.persist(new Meal(user, new Date(115, 0, 3), new Time(12, 0, 0), "3 - Rosemary Lentils & Greens on Toasted Bread", 2000L));
//        session.persist(new Meal(user, new Date(115, 0, 3), new Time(19, 0, 0), "3 - Salmon Cakes with Olives, Lemon & Dill", 1000L));
//        session.persist(new Meal(user, new Date(115, 0, 4), new Time(12, 0, 0), "4 - Cowboy Beef & Bean Chili", 2000L));
//        session.persist(new Meal(user, new Date(115, 0, 4), new Time(19, 0, 0), "4 -  Duck Chiles Rellenos", 1000L));
//        session.persist(new Meal(user, new Date(115, 0, 5), new Time(12, 0, 0), "5 - Brussels Sprout & Potato Hash", 2000L));
//        session.persist(new Meal(user, new Date(115, 0, 5), new Time(19, 0, 0), "5 -  Creamy Green Chile Chicken Soup", 1000L));
//        session.persist(new Meal(user, new Date(115, 0, 6), new Time(12, 0, 0), "6 -  Duck Chiles Rellenos", 2000L));
//        session.persist(new Meal(user, new Date(115, 0, 6), new Time(19, 0, 0), "6 -  Apricot-Chile Glazed Salmon", 1000L));
//        session.persist(new Meal(user, new Date(115, 0, 7), new Time(12, 0, 0), "7 -  Creamy Mustard Chicken", 2000L));
//        session.persist(new Meal(user, new Date(115, 0, 7), new Time(19, 0, 0), "7 -   Grape Chutney", 1000L));
//        session.persist(new Meal(user, new Date(115, 0, 8), new Time(12, 0, 0), "8 -  Broccoli Rabe", 2000L));
//        session.persist(new Meal(user, new Date(115, 0, 8), new Time(19, 0, 0), "8 -  Moules Frites", 1000L));
//
//        session.persist(new Weather(new Date(115, 0, 1), "rainy", 12));
//        session.persist(new Weather(new Date(115, 0, 2), "sunny", 22));
//        session.persist(new Weather(new Date(115, 0, 3), "rainy", 21));

        transaction.commit();
    }
}
