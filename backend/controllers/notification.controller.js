import connectDB from "../config/db.js";

export const getAllNotifications = async (req, res) => {
  try {
    const user = req.user;

    const getNotifSql = `
      SELECT
        u.id AS user_id,
        u.email,
        u.profile_picture,
        n.id AS notif_id,
        n.notif_type,
        n.created_at
      FROM notifications AS n
      INNER JOIN users AS u ON n.sender_id = u.id
      WHERE n.owner_id = ? AND n.is_read = FALSE
      ORDER BY n.created_at DESC
    `;
    const [results] = await connectDB.query(getNotifSql, [user.id]);

    const notifications = results.map((n) => ({
      user: {
        id: n.user_id,
        profile_picture: n.profile_picture,
        email: n.email,
      },
      notification: {
        id: n.notif_id,
        notif_type: n.notif_type,
        created_at: n.created_at,
      },
    }));

    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const readAllNotif = async (req, res) => {
  try {
    const user = req.user;
    const updateNotifSql = `UPDATE notifications
                            SET is_read = TRUE
                            WHERE owner_id = ?`;
    await connectDB.query(updateNotifSql, [user.id]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
