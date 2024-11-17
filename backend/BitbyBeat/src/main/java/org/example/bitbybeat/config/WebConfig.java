package org.example.bitbybeat.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 이미지 파일들이 저장된 로컬 경로
        String uploadDir = "file:C:/MirimSecondProjects/MirimSoftwareChallenge/backend/BitbyBeat/src/main/resources/uploads/images/";
        String musicDir = "file:C:/MirimSecondProjects/MirimSoftwareChallenge/backend/BitbyBeat/src/main/resources/music/";

        // http://localhost:8080/uploads/images/ 경로를 통해 이미지 파일에 접근할 수 있도록 매핑
        registry.addResourceHandler("/uploads/images/**").addResourceLocations(uploadDir);
        registry.addResourceHandler("/music/**").addResourceLocations(musicDir);
    }
}
