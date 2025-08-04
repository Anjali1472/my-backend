const { Notification } = require('../models');

exports.getNotifications = async (req, res) => {
  const notes = await Notification.findAll({ where: { UserId: req.user.id } });
  res.json(notes);
};
