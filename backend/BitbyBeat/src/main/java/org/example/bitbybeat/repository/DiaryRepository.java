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

    // 모든 태그 목록을 중복 제거 후 조회
    @Query("SELECT distinct t FROM Diary d join d.tags t") List<String> findAllTags();

    // userId와 태그에 맞는 post 조회
    List<Diary> findByUserIdAndTagsContaining(Long userId, String tags);
}
