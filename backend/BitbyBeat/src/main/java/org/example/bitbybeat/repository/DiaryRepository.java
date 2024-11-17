package org.example.bitbybeat.repository;

import org.example.bitbybeat.model.Diary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
    Optional<Diary> findByDate(LocalDate date);
    @Query("SELECT d FROM Diary d LEFT JOIN FETCH d.tags WHERE d.date = :date")
    Optional<Diary> findByDateWithTags(@Param("date") LocalDate date);
    List<Diary> findByDateBetween(LocalDate startDate, LocalDate endDate);

}
