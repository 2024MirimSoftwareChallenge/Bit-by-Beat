package org.example.bitbybeat.repository;

import org.example.bitbybeat.model.Diary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
}
