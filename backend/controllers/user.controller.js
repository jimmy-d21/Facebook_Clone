import connectDB from "../config/db.js";
import bcrypt from "bcryptjs";

/**
 * Follow or Unfollow a user
 */
export const followUnFollow = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    // Check if target user exists
    const [users] = await connectDB.query(`SELECT * FROM users WHERE id = ?`, [
      id,
    ]);
    const receiverUser = users[0];
    if (!receiverUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Prevent self-follow
    if (user.id === receiverUser.id) {
      return res.status(400).json({ error: "You cannot follow yourself" });
    }

    // Check if already following
    const isFollowingSql = `SELECT * FROM followings WHERE follower_id = ? AND followed_id = ?`;
    const [followings] = await connectDB.query(isFollowingSql, [
      user.id,
      receiverUser.id,
    ]);

    if (followings.length === 0) {
      // Follow
      const followSql = `INSERT INTO followings (follower_id, followed_id) VALUES (?, ?)`;
      await connectDB.query(followSql, [user.id, receiverUser.id]);

      // Notification
      const sendNotifSql = `INSERT INTO notifications (sender_id, owner_id, notif_type) VALUES (?, ?, ?)`;
      await connectDB.query(sendNotifSql, [
        user.id,
        receiverUser.id,
        "followed",
      ]);

      return res.status(201).json({ message: "Followed successfully" });
    } else {
      // Unfollow
      const deleteFollowSql = `DELETE FROM followings WHERE follower_id = ? AND followed_id = ?`;
      await connectDB.query(deleteFollowSql, [user.id, receiverUser.id]);

      return res.status(200).json({ message: "Unfollowed successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Get user profile with follower/following counts
 */
export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const [users] = await connectDB.query(
      `SELECT 
        u.*,
        (SELECT COUNT(*) FROM followings f WHERE f.followed_id = u.id) AS followers,
        (SELECT COUNT(*) FROM followings fo WHERE fo.follower_id = u.id) AS followings
      FROM users u
      WHERE u.id = ?`,
      [id],
    );

    const user = users[0];
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove sensitive fields
    const { password, ...safeUser } = user;

    res.status(200).json({
      user: safeUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getSuggestedUsers = async (req, res) => {
  try {
    const user = req.user; // Get the currently logged-in user from request

    // Step 1: Query all the IDs of users that the current user is following
    const [followedRows] = await connectDB.query(
      `
      SELECT followed_id
      FROM followings
      WHERE follower_id = ?`,
      [user.id],
    );

    // Step 2: Extract those IDs into a plain array
    const extractIds = followedRows.map((f) => f.followed_id);

    // Step 3: Build an exclusion list (self + already followed users)
    const excludedIds = [user.id, ...extractIds];

    // Step 4: Query all users who are not in the exclusion list
    // Suggested users = everyone except yourself and people you already follow
    const [suggestedUsers] = await connectDB.query(
      `
      SELECT *
      FROM users
      WHERE id NOT IN (?)
      ORDER BY created_at DESC`,
      [excludedIds],
    );

    // Step 5: Return the suggested users list as JSON
    res.status(200).json(suggestedUsers);
  } catch (error) {
    // Error handling: log the error and return a server error response
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      bio,
      link,
      password,
      newPassword,
      confirmPassword,
    } = req.body;
    const user = req.user;

    // Handle password update
    if (password && newPassword && confirmPassword) {
      const isPassMatch = await bcrypt.compare(password, user.password);
      if (!isPassMatch) {
        return res.status(400).json({ error: "Incorrect current password" });
      }
      if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: "New passwords do not match" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await connectDB.query(`UPDATE users SET password = ? WHERE id = ?`, [
        hashedPassword,
        user.id,
      ]);
    }

    // Update other profile fields
    const updatedFirstname = firstname || user.firstname;
    const updatedLastname = lastname || user.lastname;
    const updatedEmail = email || user.email;
    const updatedBio = bio || user.bio;
    const updatedLink = link || user.link;

    await connectDB.query(
      `UPDATE users 
       SET firstname = ?, lastname = ?, email = ?, bio = ?, link = ?
       WHERE id = ?`,
      [
        updatedFirstname,
        updatedLastname,
        updatedEmail,
        updatedBio,
        updatedLink,
        user.id,
      ],
    );

    // Return updated user object
    const updatedUser = {
      ...user,
      firstname: updatedFirstname,
      lastname: updatedLastname,
      email: updatedEmail,
      bio: updatedBio,
      link: updatedLink,
    };

    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
