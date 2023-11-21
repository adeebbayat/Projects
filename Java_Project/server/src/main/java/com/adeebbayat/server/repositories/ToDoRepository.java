package com.adeebbayat.server.repositories;

import java.util.List;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.adeebbayat.server.models.ToDo;



@Repository
public interface ToDoRepository extends CrudRepository<ToDo,Long> {
    List<ToDo> findAll();
} 
