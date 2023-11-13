package com.adeebbayat.server.models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;


@Entity
@Table(name="payments")
public class Payment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message="Card Number is Required")
    @Size(min=16,max=16,message="Card Number must be 16 digits")
    @Pattern(regexp = "\\d{16}", message="Card Number must contain only digits")
    private Long cardNumber;

    @NotNull(message="Expiration Month is Required")
    @Size(min=2,max=2,message="Expiration Month must be 2 characters")
    private Long expMonth;

    @NotNull(message="Expiration Year is Required")
    @Size(min=2,max=2,message="Expiration Year must be 2 characters")
    private Long expYear;

    @NotNull(message="CVV is Required")
    @Size(min=3,max=3,message="CVV must be 3 characters")
    private Long cvv;

    @OneToMany(mappedBy="payment",fetch = FetchType.LAZY)
    private List<Order> orders;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;


    public Payment() {
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCardNumber() {
        return this.cardNumber;
    }

    public void setCardNumber(Long cardNumber) {
        this.cardNumber = cardNumber;
    }

    public Long getExpMonth() {
        return this.expMonth;
    }

    public void setExpMonth(Long expMonth) {
        this.expMonth = expMonth;
    }

    public Long getExpYear() {
        return this.expYear;
    }

    public void setExpYear(Long expYear) {
        this.expYear = expYear;
    }

    public Long getCvv() {
        return this.cvv;
    }

    public void setCvv(Long cvv) {
        this.cvv = cvv;
    }

    public List<Order> getOrders() {
        return this.orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    


}
