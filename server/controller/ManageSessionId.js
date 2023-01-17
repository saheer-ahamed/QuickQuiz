exports.getSessionId = (req, res) => {
    try {
        const userSessionId = req.sessionId

        res.status(200).json(userSessionId)
    } catch (error) {
        res.status(500).json(error)
    }
}