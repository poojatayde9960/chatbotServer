const router = require("express").Router()
const { chatBotReply } = require("../controllers/chat.controller");


// POST /api/chat
router
    .post("/chats", chatBotReply)

module.exports = router
// POST /api/chat

