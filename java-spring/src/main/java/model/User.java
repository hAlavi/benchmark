package model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "User")
public class User {
	
    @Id
    private int id;
	
    @Column(name ="firstName", nullable = false)
    private String firstName;
	
    @Column(name ="lastName", nullable = false)
    private String lastName;
	

	
	@ManyToMany(fetch = FetchType.EAGER)
        @JoinTable(name = "UserCountryMapping", 
         joinColumns = @JoinColumn(name = "userId",referencedColumnName ="id"),
         inverseJoinColumns = @JoinColumn(name = "countryId",referencedColumnName ="id"))
	Set<Country> countries = new HashSet<Country>(0);
    
	public int getId() {
		return id;
	}
	
	public String getFirstName() {
		return firstName;
	}
	
	public String getLastName() {
		return lastName;
	}
	
	public Set<Country> getCountries() {
		return countries;
	}
}
