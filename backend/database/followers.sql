CREATE TABLE followers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recipient_id INT NOT NULL,
    sender_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recipient_id) REFERENCES users(id),
    FOREIGN KEY (sender_id) REFERENCES users(id),
    UNIQUE (recipient_id, sender_id), -- Prevent duplicate follows  
    CHECK (recipient_id <> sender_id) -- Prevent self-following  
);