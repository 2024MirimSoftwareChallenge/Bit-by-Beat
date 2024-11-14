package org.example.bitbybeat.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Diary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;  // userId 필드 (외래키 제약 없음)

    @ManyToOne
    @JoinColumn(name = "song_id", nullable = false)
    private Song song; // song 객체로 참조

    private String content;  // content 필드

    @ElementCollection  // 컬렉션을 처리하기 위한 어노테이션
    @CollectionTable(name = "diary_tags", joinColumns = @JoinColumn(name = "diary_id")) // 다이어리와 태그를 연결할 테이블
    @Column(name = "tag")  // 태그의 컬럼 이름
    private List<String> tags; // 태그 목록

    private String imgPath;

    private LocalDateTime date = LocalDateTime.now();

    // songTitle을 추가
    @Transient  // 이 필드는 DB에 저장되지 않음
    private String songTitle;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    // Getter and Setter for userId
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    // Getter and Setter for song
    public Song getSong() {
        return song;
    }

    public void setSong(Song song) {
        this.song = song;
    }

    // Getter and Setter for tag
    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    // Getter and Setter for imgPath
    public String getImgPath() {
        return imgPath;
    }

    public void setImgPath(String imgPath) {
        this.imgPath = imgPath;
    }

    // Getter and Setter for date
    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    // Getter and Setter for songTitle
    public String getSongTitle() {
        return songTitle;
    }

    public void setSongTitle(String songTitle) {
        this.songTitle = songTitle;
    }
}
