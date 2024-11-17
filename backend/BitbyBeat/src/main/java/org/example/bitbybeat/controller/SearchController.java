package org.example.bitbybeat.controller;

import org.example.bitbybeat.model.Diary;
import org.example.bitbybeat.repository.DiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/search")
@CrossOrigin(origins = "http://localhost:3000")
public class SearchController {
    private final DiaryRepository diaryRepository;

    @Autowired
    public SearchController(DiaryRepository diaryRepository) {
        this.diaryRepository = diaryRepository;
    }

    // 모든 태그 조회
    @GetMapping("/tag")
    public ResponseEntity<List<String>> getAllTags() {
        try {
            // 모든 Diary에서 tags 컬럼을 가져와 중복 제거 후 return
            List<String> allTags = diaryRepository.findAllTags();
            return ResponseEntity.ok(allTags);
        }
        catch(Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 특정 태그와 userId에 맞는 게시물 조회
    @GetMapping("/posts-tag/{userId}")
    public ResponseEntity<List<Diary>> getAllPostsByTag(@PathVariable Long userId, @RequestParam String tag) {
        try {
            List<Diary> posts = diaryRepository.findByUserIdAndTagsContaining(userId, tag);
            return ResponseEntity.ok(posts);
        }
        catch(Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
