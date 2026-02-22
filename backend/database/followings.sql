CREATE TABLE followings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    follower_id INT NOT NULL,   -- the user who follows
    followed_id INT NOT NULL,   -- the user being followed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (follower_id) REFERENCES users(id),
    FOREIGN KEY (followed_id) REFERENCES users(id),
    UNIQUE (follower_id, followed_id),
    CHECK (follower_id <> followed_id)
);
