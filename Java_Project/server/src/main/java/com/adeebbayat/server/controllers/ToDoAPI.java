package com.adeebbayat.server.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adeebbayat.server.models.LoginUser;
import com.adeebbayat.server.models.ToDo;
import com.adeebbayat.server.models.User;
import com.adeebbayat.server.services.ToDoService;
import com.adeebbayat.server.services.UserService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api")
public class ToDoAPI {
    
    @Autowired
    UserService userService;

    @Autowired
    ToDoService toDoService;

    @GetMapping("/")
    public String helloWorld() {
        return "Hello World!";
    }

    @GetMapping("/todos")
    public List<Object> allToDos(){
        List<ToDo> toDos = toDoService.allToDos();
        List<Long> ids = new ArrayList<>();
        List<String> bodies = new ArrayList<>();
        List<String> titles = new ArrayList<>();
        for (ToDo toDo : toDos) {
            ids.add(toDo.getId());
            bodies.add(toDo.getBody());
            titles.add(toDo.getTitle());
        }
        List<Object> result = new ArrayList<>();
        result.add(ids);
        result.add(bodies);
        result.add(titles);
        return result;
    }

    @PostMapping("/create")
    public List<Object> allNewToDos(@RequestBody ToDo newToDo){
        toDoService.addToDo(newToDo);
        List<ToDo> toDos = toDoService.allToDos();
        List<Long> ids = new ArrayList<>();
        List<String> bodies = new ArrayList<>();
        List<String> titles = new ArrayList<>();
        for (ToDo toDo : toDos) {
            ids.add(toDo.getId());
            bodies.add(toDo.getBody());
            titles.add(toDo.getTitle());
        }
        List<Object> result = new ArrayList<>();
        result.add(ids);
        result.add(bodies);
        result.add(titles);
        return result;
    }

    @DeleteMapping("/delete")
    public List<Object> delete(@RequestBody Map<String, Long> map){
        Long index = map.get("index");
    toDoService.deleteToDo(index);
    System.out.println("ToDo with id " + index + " has been deleted.");
    List<ToDo> toDos = toDoService.allToDos();


        List<Long> ids = new ArrayList<>();
        List<String> bodies = new ArrayList<>();
        List<String> titles = new ArrayList<>();
        for (ToDo toDo : toDos) {
            ids.add(toDo.getId());
            bodies.add(toDo.getBody());
            titles.add(toDo.getTitle());
        }
        List<Object> result = new ArrayList<>();
        result.add(ids);
        result.add(bodies);
        result.add(titles);
        return result;
    }

    @PostMapping("/login")
    public User login(@Valid @ModelAttribute("newLogin") LoginUser newLogin, 
            BindingResult result, Model model, HttpSession session) {
        
                // Add once service is implemented
                User user = userService.login(newLogin, result);
                if(user == null) {
                    model.addAttribute("newUser", new User());
                    return user;
                }
                
                // No errors! 
        // TO-DO Later: Store their ID from the DB in session, 
        // in other words, log them in.
        session.setAttribute("userId", user.getId());
        session.setAttribute("user", user);
    
        return user;
    }

    @PostMapping("/register")
    public String register(@Valid @ModelAttribute("newUser") User newUser,BindingResult result, Model model, HttpSession session){
        User user = userService.register(newUser, result);
        if(result.hasErrors()) {
            // Be sure to send in the empty LoginUser before 
            // re-rendering the page.
            model.addAttribute("newLogin", new LoginUser());
            return "index.jsp";
        }
        
        // No errors! 
        // TO-DO Later: Store their ID from the DB in session, 
        // in other words, log them in.
        session.setAttribute("userId", user.getId());
        session.setAttribute("user", user);
        return "redirect:/classes";
    }
}
