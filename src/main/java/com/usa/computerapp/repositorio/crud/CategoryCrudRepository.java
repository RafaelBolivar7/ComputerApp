package com.usa.computerapp.repositorio.crud;

import com.usa.computerapp.modelo.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryCrudRepository extends CrudRepository<Category, Integer> {
}
