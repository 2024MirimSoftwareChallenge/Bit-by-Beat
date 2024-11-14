package org.example.bitbybeat.repository;

import org.example.bitbybeat.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SongRepository extends JpaRepository<Song, Long> {
}
