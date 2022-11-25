package ru.maxawergy.API_Car.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.maxawergy.API_Car.entity.Car;

public interface CarRepository extends JpaRepository<Car, Long> {
    Car findCarById(Long id);
}