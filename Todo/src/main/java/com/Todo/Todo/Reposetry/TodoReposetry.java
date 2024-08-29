package com.Todo.Todo.Reposetry;

import com.Todo.Todo.Entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoReposetry extends JpaRepository<Todo, Integer> {
}
