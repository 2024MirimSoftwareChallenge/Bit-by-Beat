package org.example.bitbybeat.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Song {
    @Id
    private Long id;
    private String title;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
