package com.usa.computerapp.repositorio.crud;

import com.usa.computerapp.modelo.Reservation;
import org.springframework.data.repository.CrudRepository;

public interface ReservationCrudRepository extends CrudRepository<Reservation, Integer> {
}
