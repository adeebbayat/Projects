package com.adeebbayat.server.models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="restaurants")
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message="Name is required!")
    @Size(min=3,max=128,message="Name must be at least 3 characters")
    private String name;

    @NotBlank(message="Description is required")
    @Size(min=3,max=128,message="Description must be at least 3 characters")
    private String description;

    @NotBlank(message="Address is required")
    @Size(min=3,max=128,message="Address must be at least 3 characters")
    private String address;

    @OneToMany(mappedBy="restaurant",fetch = FetchType.LAZY)
    private List<Order> orders;

    @OneToMany(mappedBy="restaurant",fetch = FetchType.LAZY)
    private List<Item> items;

    public Restaurant() {
    }

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

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<Order> getOrders() {
        return this.orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    public List<Item> getItems() {
        return this.items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }
    
}
