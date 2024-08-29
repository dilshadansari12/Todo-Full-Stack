package com.Todo.Todo.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Todo {

    @Id
    private Integer id;
    private boolean isCompleted;
    private String Task;

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTask() {
        return Task;
    }

    public void setTask(String task) {
        Task = task;
    }

}
