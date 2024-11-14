package org.example.bitbybeat.controller;

import org.example.bitbybeat.model.Diary;
import org.example.bitbybeat.model.Song;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.example.bitbybeat.repository.SongRepository;
import org.example.bitbybeat.repository.DiaryRepository;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // React 앱에서 요청 허용
@RequestMapping("/api/diaries")
public class DiaryController {

    private final DiaryRepository diaryRepository;
    private final SongRepository songRepository;

    @Autowired
    public DiaryController(DiaryRepository diaryRepository, SongRepository songRepository) {
        this.diaryRepository = diaryRepository;
        this.songRepository = songRepository;
    }

    @PostMapping("/uploadImage")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        String uploadDir = "C://MirimSecondProjects/MirimSoftwareChallenge/backend/BitbyBeat/src/main/resources/uploads/images/";
        String fileName = file.getOriginalFilename();
        File targetFile = new File(uploadDir + fileName);

        try {
            if (!targetFile.getParentFile().exists()) {
                targetFile.getParentFile().mkdirs();
            }
            file.transferTo(targetFile);
            return ResponseEntity.ok("/uploads/images/" + fileName);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to store image: " + e.getMessage());
        }
    }

    // 주의: 이 부분의 매핑 경로를 "/api/diaries"가 아니라 "/"로 변경
    @PostMapping("/")
    public ResponseEntity<?> createDiary(@RequestBody Map<String, Object> diaryData) {
        try {
            Long songId = ((Number) diaryData.get("song_id")).longValue();
            Song song = songRepository.findById(songId)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid song ID"));

            Diary diary = new Diary();
            diary.setSong(song);
            diary.setUserId(((Number) diaryData.get("user_id")).longValue());
            diary.setContent((String) diaryData.get("content"));
            diary.setTags((List<String>) diaryData.get("tags"));
            diary.setImgPath((String) diaryData.get("img_path"));

            diaryRepository.save(diary);

            return ResponseEntity.ok("Diary saved successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while saving the diary.");
        }
    }
}
