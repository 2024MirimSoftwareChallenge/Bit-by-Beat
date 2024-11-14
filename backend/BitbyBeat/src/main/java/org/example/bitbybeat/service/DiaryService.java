package org.example.bitbybeat.service;

import org.example.bitbybeat.model.Diary;
import org.example.bitbybeat.model.Song;
import org.example.bitbybeat.repository.DiaryRepository;
import org.example.bitbybeat.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DiaryService {

    private final DiaryRepository diaryRepository;
    private final SongRepository songRepository;

    @Autowired
    public DiaryService(DiaryRepository diaryRepository, SongRepository songRepository) {
        this.diaryRepository = diaryRepository;
        this.songRepository = songRepository;
    }

    public Diary getDiaryWithSongTitle(Long diaryId) {
        Optional<Diary> diaryOptional = diaryRepository.findById(diaryId);
        if (diaryOptional.isPresent()) {
            Diary diary = diaryOptional.get();
            // song_id에 해당하는 song 정보를 가져와서 diary에 songTitle을 추가
            if (diary.getSong() != null) {
                Optional<Song> songOptional = songRepository.findById(diary.getSong().getId());
                songOptional.ifPresent(song -> diary.setSongTitle(song.getTitle()));
            }
            return diary;
        } else {
            return null; // 일기를 찾을 수 없는 경우
        }
    }

    public Diary saveDiary(Diary diary) {
        return diaryRepository.save(diary);
    }
}
