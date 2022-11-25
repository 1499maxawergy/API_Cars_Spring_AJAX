package ru.maxawergy.API_Car.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.maxawergy.API_Car.entity.Car;
import ru.maxawergy.API_Car.repository.CarRepository;

import java.util.List;

@RestController
@RequestMapping("/api")
public class APIController {
    @Autowired
    private CarRepository carRepository;

    @GetMapping("")
    public List<Car> getList(){
        return carRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteCar(@PathVariable Long id){
        carRepository.deleteById(id);
    }

    @PostMapping("")
    public Car addCar(@RequestBody Car car){
        return carRepository.save(car);
    }

    @PatchMapping("/{id}")
    public Car updateCar(@PathVariable Long id, @RequestBody Car car){
        Car car1 = carRepository.findCarById(id);
        if (car1 != null)
            return carRepository.save(car);
        else
            return null;
    }
}
