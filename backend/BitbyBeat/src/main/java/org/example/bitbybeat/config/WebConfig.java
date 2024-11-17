package org.example.bitbybeat.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 경로 허용
                .allowedOrigins("http://localhost:3000") // React 앱에서의 요청만 허용
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 허용할 HTTP 메서드
                .allowedHeaders("*") // 모든 헤더 허용
                .allowCredentials(true); // 인증 정보 허용
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 이미지 파일들이 저장된 로컬 경로
//        String uploadDir = "file:C:/MirimSecondProjects/MirimSoftwareChallenge/backend/BitbyBeat/src/main/resources/uploads/images/";
//        String musicDir = "file:C:/MirimSecondProjects/MirimSoftwareChallenge/backend/BitbyBeat/src/main/resources/music/";

        String uploadDir = "file:C:/Project/2학년/2024mirimSoftwareChallenge/backend/BitbyBeat/src/main/resources/uploads/images/";
        String musicDir = "file:C:/Project/2학년/2024mirimSoftwareChallenge/backend/BitbyBeat/src/main/resources/music/";

        // http://localhost:8080/uploads/images/ 경로를 통해 이미지 파일에 접근할 수 있도록 매핑
        registry.addResourceHandler("/uploads/images/**").addResourceLocations(uploadDir);
        registry.addResourceHandler("/music/**").addResourceLocations(musicDir);
    }
}
