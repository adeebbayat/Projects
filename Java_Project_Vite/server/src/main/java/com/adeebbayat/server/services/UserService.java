package com.adeebbayat.server.services;

import java.util.List;
import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import com.adeebbayat.server.models.LoginUser;
import com.adeebbayat.server.models.User;
import com.adeebbayat.server.repositories.UserRepository;


@Service
public class UserService {
    
    private final UserRepository userRepository;




    public User register(User newUser, BindingResult result) {
    
    	// TO-DO - Reject values or register if no errors:
        
        // Reject if email is taken (present in database)
        if(userRepository.findByEmail(newUser.getEmail()).isPresent()){
            result.rejectValue("email","Email","Already Registered");
        }
        // Reject if password doesn't match confirmation
        if(!newUser.getPassword().equals(newUser.getConfirm())){
            System.out.println(newUser.getPassword() + " and " + newUser.getConfirm());
            result.rejectValue("password", "Password","Passwords do not match");
        }
        // Return null if result has errors
        if(result.hasErrors()){
            return null;
        }
        // Hash and set password, save user to database
        String hashed = BCrypt.hashpw(newUser.getPassword(), BCrypt.gensalt());
        newUser.setPassword(hashed);
        return userRepository.save(newUser);
    }
    // This method will be called from the controller
    // whenever a user submits a login form.
    public User login(LoginUser newLoginObject, BindingResult result) {
        // TO-DO - Reject values:
        
    	// Find user in the DB by email
        Optional<User> user = userRepository.findByEmail(newLoginObject.getEmail());
        // Reject if NOT present
        if(!user.isPresent()){
            result.rejectValue("loginemail", "loginEmail","Invalid Credentials");
        }
        // Reject if BCrypt password match fails
        if(!BCrypt.checkpw(newLoginObject.getPassword(), user.get().getPassword())) {
            result.rejectValue("password", "Matches", "Invalid Password!");
        }
        // Return null if result has errors
        if(result.hasErrors()){
            return null;
        }
        // Otherwise, return the user object
        
        return user.get();
        
    }


    // ?
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    // Create User
    public User addUser(User user){
        return userRepository.save(user);
    }

    // Find All
    public List<User> allUsers(){
        return userRepository.findAll();
    }

    // Find One User
    public User findUser(Long id){
        Optional<User> optionalUser = userRepository.findById(id);
        if(optionalUser.isPresent()){
            return optionalUser.get();
        }
        return null;
    }

    // Update User
    public User updateUser(User user){
        return userRepository.save(user);
    }

    // Delete User
    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }
    public Page<User> allUsers(Pageable pageable) {
        return null;
    }


}

