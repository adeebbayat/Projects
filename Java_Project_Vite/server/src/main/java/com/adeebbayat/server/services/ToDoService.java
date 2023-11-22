package com.adeebbayat.server.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.adeebbayat.server.models.ToDo;
import com.adeebbayat.server.repositories.ToDoRepository;

@Service
public class ToDoService {
     
        private final ToDoRepository toDoRepository;


        public ToDoService(ToDoRepository toDoRepository){
            this.toDoRepository = toDoRepository;
        }

        // Create ToDo
        public ToDo addToDo(ToDo toDo){
            return toDoRepository.save(toDo);
        }

        // Find All
        public List<ToDo> allToDos(){
            return toDoRepository.findAll();
        }

        // Find One ToDo
        public ToDo findToDo(Long id){
            Optional<ToDo> optionalToDo = toDoRepository.findById(id);
            if(optionalToDo.isPresent()){
                return optionalToDo.get();
            }
            return null;
        }

        // Update ToDo
        public ToDo updateToDo(ToDo toDo){
            return toDoRepository.save(toDo);
        }

        // Delete ToDo
        public void deleteToDo(Long id){
            toDoRepository.deleteById(id);
        }
    }
