package app;

import java.util.List;
import java.util.Random;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import model.Country;
import model.User;

@RestController
public class Controller {
	
	final private SessionFactory sessionFactory;
	
	public Controller(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @RequestMapping(value = "/hello", produces = "application/json")
    public String hello() throws JSONException {
        return new JSONObject().put("hello", "world").toString();
    }
    
    @RequestMapping(value = "/compute", produces = "application/json")
    public String compute() throws JSONException {
        long x = 0, y = 1, z, max;
        
        Random r = new Random();
        max = 10000 + r.nextInt(500);
        
        for (int i = 0; i <= max; i++) {
        	z = x + y;
		    x = y;
		    y = z;
		}
        
        return new JSONObject().put("status", "done").toString();
    }
    
    public boolean isPrime(long n) {
        boolean result = true;
    
        if (n <= 1) {
            result = false;
        }
        else {
            // We only need to check up to the sqrt of the number.
            for (long i=2; i*i<=n; i++) {
                if (n % i == 0) {
                // This number is evenly divisible by i, so it is not prime.
                result = false;
                break;
                }
            }
        }
    
        return result;
    }

    /**
    * @param {number} n
    * @return {number}
    */
    public long countPrimes(long n) {
        long result = 0;
    
        for (long i=0; i<n; i++) {
            if (isPrime(i)) {
                result++;
            }
        }
    
        return result;
    }
    
    @RequestMapping(value = "/prime", produces = "application/json")
    public String prime() throws JSONException {
        Long i = countPrimes(10000000);
        return new JSONObject().put("status", "done").put("result", i.toString()).toString();
    }
    
    @RequestMapping(value = "/countries", produces = "application/json")
    @Transactional
    public List<Country> countries() throws JSONException {
    	List<Country> data = (List<Country>) sessionFactory.getCurrentSession()
    			.createCriteria(Country.class)
    			.list();
    	return data;
    }
    
    @RequestMapping(value = "/users", produces = "application/json")
    @Transactional
    public List<User> users() throws JSONException {
    	List<User> data;
            data = (List<User>) sessionFactory.getCurrentSession()
                    //.createSQLQuery("SELECT id,firstName,lastName FROM benchmark.User  join (UserCountryMapping) on (UserCountryMapping.userId=User.id and UserCountryMapping.countryId=:countryID)").setParameter("countryID", 17)
                    .createCriteria(User.class)
                    .createAlias("countries", "countriesAlias")
                    .add(Restrictions.eq("countriesAlias.id", 17))
                    .list();
                
                
    	return data.subList(0, 100);
    }
}
