package org.example.bitbybeat.service;

import org.example.bitbybeat.model.User;
import org.example.bitbybeat.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void saveUser(User user) {
        // 중복 이메일 체크
        if(!userRepository.existsByEmail(user.getEmail()))
            userRepository.save(user);      // db에 user 객체 저장
    }

    // 이메일로 사용자 이름 업데이트
    public boolean updateUsername(String email, String name) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if(userOptional.isPresent()) {
            User user = userOptional.get();
            user.setName(name);
            userRepository.save(user);          // 변경된 name 저장
            return true;
        }
        return false;       // 이메일에 해당하는 사용자가 없을 때 false
    }
}
