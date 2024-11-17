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

import java.util.Optional;
import java.time.LocalDate;


import java.io.File;
import java.io.IOException;
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
//        String uploadDir = "C://MirimSecondProjects/MirimSoftwareChallenge/backend/BitbyBeat/src/main/resources/uploads/images/";
        String uploadDir = "C:/Project/2학년/2024mirimSoftwareChallenge/backend/BitbyBeat/src/main/resources/uploads/images/";
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

    @PostMapping
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

    @GetMapping("/today")
    public Optional<Diary> getTodayDiary() {
        LocalDate today = LocalDate.now();
        return diaryRepository.findByDateWithTags(today); // 오늘 날짜와 태그가 포함된 일기 반환
    }

    @GetMapping("/images")
    public ResponseEntity<List<Map<String, String>>> getImagesForMonth(
            @RequestParam("year") int year,
            @RequestParam("month") int month) {
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

        List<Diary> diaries = diaryRepository.findByDateBetween(startDate, endDate);

        List<Map<String, String>> images = diaries.stream()
                .map(diary -> Map.of(
                        "date", diary.getDate().toString(),
                        "imgPath", diary.getImgPath()
                ))
                .toList();

        return ResponseEntity.ok(images);
    }


}
