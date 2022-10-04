package com.usa.computerapp.repositorio.crud;

import com.usa.computerapp.modelo.Computer;
import org.springframework.data.repository.CrudRepository;

public interface ComputerCrudRepository extends CrudRepository<Computer, Integer> {
}
