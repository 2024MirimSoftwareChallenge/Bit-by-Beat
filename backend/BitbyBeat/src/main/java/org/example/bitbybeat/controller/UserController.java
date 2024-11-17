package org.example.bitbybeat.controller;

import org.example.bitbybeat.model.User;
import org.example.bitbybeat.repository.UserRepository;
import org.example.bitbybeat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // React 앱에서 요청 허용
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 사용자 이메일, 이름 저장
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        try {
            if (user.getEmail() == null) {
                return new ResponseEntity<>("Email is required", HttpStatus.BAD_REQUEST);
            }
            userService.saveUser(user);
            return new ResponseEntity<>("User created successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error creating user", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 이름 수정
    @PatchMapping()
    public ResponseEntity<String> updateUsername(@RequestBody User user) {
        try {
            if (user.getEmail() == null || user.getName() == null) {
                return new ResponseEntity<>("Email and Name are required", HttpStatus.BAD_REQUEST);
            }

            // 이메일로 사용자 찾기
            boolean isUpdated = userService.updateUsername(user.getEmail(), user.getName());

            if(isUpdated) {
                return new ResponseEntity<>("User name updated successfully", HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>("User name not updated", HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error updating user name", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
