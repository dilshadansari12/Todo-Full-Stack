package com.Todo.Todo.Service;

import com.Todo.Todo.Entity.Todo;
import com.Todo.Todo.Reposetry.TodoReposetry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class TodoService {

  @Autowired
  private TodoReposetry todoReposetry;

    public List<Todo> findAllTodo(){
        return todoReposetry.findAll();
    }

    public Todo addTodo(Todo todo){
        return todoReposetry.save(todo);
    }

    public void deleteTodo(Integer id){
        Todo todo = todoReposetry.getById(id);
         todoReposetry.delete(todo);
    }

    public Todo updateTodo(Todo todo){
        return todoReposetry.save(todo);
    }
}
