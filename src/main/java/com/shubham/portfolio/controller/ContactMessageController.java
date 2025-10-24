package com.shubham.portfolio.controller;

import com.shubham.portfolio.model.ContactMessage;
import com.shubham.portfolio.service.ContactMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactMessageController {

    @Autowired
    private ContactMessageService messageService;

    // Submit contact form
    @PostMapping("/send")
    public ResponseEntity<Map<String, Object>> sendMessage(@RequestBody ContactMessage message) {
        Map<String, Object> response = new HashMap<>();

        try {
            // Validate input
            if (message.getName() == null || message.getName().trim().isEmpty() ||
                    message.getEmail() == null || message.getEmail().trim().isEmpty() ||
                    message.getSubject() == null || message.getSubject().trim().isEmpty() ||
                    message.getMessage() == null || message.getMessage().trim().isEmpty()) {

                response.put("success", false);
                response.put("message", "All fields are required");
                return ResponseEntity.badRequest().body(response);
            }

            ContactMessage savedMessage = messageService.saveMessage(message);

            response.put("success", true);
            response.put("message", "Thank you! Your message has been sent successfully!");
            response.put("messageId", savedMessage.getId());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error sending message: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // Get all messages (for admin)
    @GetMapping("/messages")
    public ResponseEntity<List<ContactMessage>> getAllMessages() {
        List<ContactMessage> messages = messageService.getAllMessages();
        return ResponseEntity.ok(messages);
    }

    // Get unread messages count
    @GetMapping("/unread/count")
    public ResponseEntity<Map<String, Long>> getUnreadCount() {
        Map<String, Long> response = new HashMap<>();
        response.put("unreadCount", messageService.countUnreadMessages());
        return ResponseEntity.ok(response);
    }

    // Mark message as read
    @PutMapping("/messages/{id}/read")
    public ResponseEntity<Map<String, String>> markAsRead(@PathVariable Long id) {
        Map<String, String> response = new HashMap<>();

        try {
            messageService.markAsRead(id);
            response.put("message", "Message marked as read");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "Error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // Delete message
    @DeleteMapping("/messages/{id}")
    public ResponseEntity<Map<String, String>> deleteMessage(@PathVariable Long id) {
        Map<String, String> response = new HashMap<>();

        try {
            messageService.deleteMessage(id);
            response.put("message", "Message deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "Error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
