package com.Todo.Todo.RestController;

import com.Todo.Todo.Entity.Todo;
import com.Todo.Todo.Service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1")
@CrossOrigin
public class TodoRestController {

    @Autowired
    private TodoService todoService;

    @GetMapping("/task")
    public ResponseEntity<?> getAllTodo(){
        try {
            return new ResponseEntity<>(todoService.findAllTodo(), HttpStatus.OK);
        }catch (Exception e){
            String msg = "something is wrong" + " " + e.getMessage();
            return new ResponseEntity<>(msg , HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/task")
    public ResponseEntity<?> PostTodo(@RequestBody Todo todo){
        try {
            todoService.addTodo(todo);
            return new ResponseEntity<>( "Todo Added successfully ",HttpStatus.OK);
        }catch (Exception e){
            String msg = "something is wrong" + " " + e.getMessage();
            return new ResponseEntity<>(msg , HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/task")
    public ResponseEntity<?> updateTodo(@RequestBody Todo todo){
        try {
            todoService.updateTodo(todo);
            return new ResponseEntity<>("User Added Successfully ", HttpStatus.OK);
        }catch (Exception e){
            String msg = "something is happen while adding  a todo" + " " + e.getMessage();
            return new ResponseEntity<>(msg,HttpStatus.OK);
        }
    }

    @DeleteMapping("/task/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id){
        try {
            todoService.deleteTodo(id);
            return new ResponseEntity<>("deleted task successfully", HttpStatus.OK);
        }catch (Exception e){
            String msg = "something is wrong" + " while deleting " + " " +  id + " " + e.getMessage();
            return new ResponseEntity<>(msg , HttpStatus.BAD_REQUEST);
        }
    }


}
