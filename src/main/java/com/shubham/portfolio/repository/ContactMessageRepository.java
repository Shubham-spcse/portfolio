package com.shubham.portfolio.repository;

import com.shubham.portfolio.model.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {

    // Find all unread messages
    List<ContactMessage> findByIsReadFalse();

    // Find all messages ordered by creation date (newest first)
    List<ContactMessage> findAllByOrderByCreatedAtDesc();

    // Count unread messages
    long countByIsReadFalse();
}
