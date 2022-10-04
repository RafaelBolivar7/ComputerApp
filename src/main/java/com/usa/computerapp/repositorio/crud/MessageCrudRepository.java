package com.usa.computerapp.repositorio.crud;

import com.usa.computerapp.modelo.Message;
import org.springframework.data.repository.CrudRepository;

public interface MessageCrudRepository extends CrudRepository<Message, Integer> {
}
