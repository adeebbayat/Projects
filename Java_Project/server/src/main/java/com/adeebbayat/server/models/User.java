package com.adeebbayat.server.models;

import jakarta.persistence.Transient;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message="First Name is required!")
    @Size(min=3,max=128,message="First Name must be greater than 3 characters!")
    private String firstName;

    @NotBlank(message="Last Name is required!")
    @Size(min=3,max=128,message="Last Name must be greater than 3 characters!")
    private String lastName;

    @NotBlank(message="Email is required!")
    @Email(message="Please enter valid email!")
    private String email;

    @NotBlank(message="Password is required!")
    @Size(min=8,max=128,message="Password must be at least 8 characters!")
    private String password;

    @Transient
    @NotBlank(message="Confirm Password is required!")
    @Size(min=8, max = 128, message="Confirm Password must be at least 8 characters!")
    private String confirm;

    @OneToMany(mappedBy="user",fetch = FetchType.LAZY)
    private List<Order> orders;

    @OneToMany(mappedBy="user",fetch = FetchType.LAZY)
    private List<Payment> payments;


    public User() {
    }


    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirm() {
        return this.confirm;
    }

    public void setConfirm(String confirm) {
        this.confirm = confirm;
    }

    public List<Order> getOrders() {
        return this.orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    public List<Payment> getPayments() {
        return this.payments;
    }

    public void setPayments(List<Payment> payments) {
        this.payments = payments;
    }

}
