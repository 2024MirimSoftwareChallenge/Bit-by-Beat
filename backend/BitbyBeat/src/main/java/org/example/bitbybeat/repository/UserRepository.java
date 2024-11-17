package org.example.bitbybeat.repository;

import org.example.bitbybeat.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // 이메일 중복 체크 메서드 정의
    boolean existsByEmail(String email);

    // 사용자 이메일로 사용자 찾기
    Optional<User> findByEmail(String email);
}
