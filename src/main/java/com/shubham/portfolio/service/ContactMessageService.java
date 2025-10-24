package com.shubham.portfolio.service;

import com.shubham.portfolio.model.ContactMessage;
import com.shubham.portfolio.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ContactMessageService {

    @Autowired
    private ContactMessageRepository messageRepository;

    // Save a new message
    public ContactMessage saveMessage(ContactMessage message) {
        return messageRepository.save(message);
    }

    // Get all messages (newest first)
    public List<ContactMessage> getAllMessages() {
        return messageRepository.findAllByOrderByCreatedAtDesc();
    }

    // Get unread messages
    public List<ContactMessage> getUnreadMessages() {
        return messageRepository.findByIsReadFalse();
    }

    // Get message by ID
    public Optional<ContactMessage> getMessageById(Long id) {
        return messageRepository.findById(id);
    }

    // Mark message as read
    public void markAsRead(Long id) {
        Optional<ContactMessage> message = messageRepository.findById(id);
        if (message.isPresent()) {
            ContactMessage msg = message.get();
            msg.setIsRead(true);
            messageRepository.save(msg);
        }
    }

    // Delete message
    public void deleteMessage(Long id) {
        messageRepository.deleteById(id);
    }

    // Count unread messages
    public long countUnreadMessages() {
        return messageRepository.countByIsReadFalse();
    }
}
