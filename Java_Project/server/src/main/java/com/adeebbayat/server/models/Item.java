package com.adeebbayat.server.models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="items")
public class Item {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message="Name is required!")
    @Size(min=3,max=128,message="Name must be at least 3 characters")
    private String name;

    @NotBlank(message="Description is required")
    @Size(min=3,max=128,message="Description must be at least 3 characters")
    private String description;

    @NotNull(message="Price is required")
    @Positive(message="Price must be greater than $0")
    private Double price;

    @ManyToMany(fetch=FetchType.LAZY)
    @JoinTable(
        name="orders_items",
        joinColumns = @JoinColumn(name="item_id"),
        inverseJoinColumns = @JoinColumn(name="order_id")
    )
    private List<Order> orders;


    public Item() {
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

    public Double getPrice() {
        return this.price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public List<Order> getOrders() {
        return this.orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

}
