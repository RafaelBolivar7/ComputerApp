package com.usa.computerapp.repositorio.crud;

import com.usa.computerapp.modelo.Reservation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface ReservationCrudRepository extends CrudRepository<Reservation, Integer> {

    @Query("SELECT c.client, count(c.client) FROM Reservation AS c GROUP BY c.client ORDER BY count (c.client) DESC")
    public List<Object[]> countTotalReservationByClient();

    // SELECT * FROM Reservation WHERE starDate AFTER dateOne AND decolutionDate BEFORE dateTwo;
    public List<Reservation> findAllByStartDateAfterAndDevolutionDateBefore(Date dateOne, Date dateTwo);

    //SELECT * FROM Reservation WHERE status= variable;
    public List<Reservation> findAllByStatus(String status);

}
