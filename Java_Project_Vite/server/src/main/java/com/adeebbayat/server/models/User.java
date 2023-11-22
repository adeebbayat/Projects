package com.adeebbayat.server.models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message="Name is required!")
    @Size(min=1,max=128,message="Name must be greater than 1 character")
    private String name;

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
    private List<ToDo> toDos;


    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
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

    public List<ToDo> getToDos() {
        return this.toDos;
    }

    public void setToDos(List<ToDo> toDos) {
        this.toDos = toDos;
    }



}