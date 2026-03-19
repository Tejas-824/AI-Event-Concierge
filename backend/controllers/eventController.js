const EventRequest = require("../models/EventRequest");
const generateEventProposal = require("../utils/generateEventProposal");

const createEventProposal = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        message: "Event description is required",
      });
    }

    if (prompt.trim().length < 10) {
      return res.status(400).json({
        message: "Please enter a more detailed event description",
      });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const aiResponse = await generateEventProposal(prompt.trim());

    const { venueName, location, estimatedCost, whyItFits } = aiResponse;

    if (!venueName || !location || !estimatedCost || !whyItFits) {
      return res.status(500).json({
        message: "AI response missing required fields",
      });
    }

    const savedEvent = await EventRequest.create({
      user: req.user.id,
      userPrompt: prompt.trim(),
      venueName,
      location,
      estimatedCost,
      whyItFits,
    });

    return res.status(201).json({
      message: "Proposal generated successfully",
      proposal: savedEvent,
    });
  } catch (error) {
    console.error("createEventProposal error:", error);
    return res.status(500).json({
      message: error.message || "Failed to generate proposal",
    });
  }
};

const getMyEventHistory = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const history = await EventRequest.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      message: "History fetched successfully",
      history,
    });
  } catch (error) {
    console.error("getMyEventHistory error:", error);
    return res.status(500).json({
      message: error.message || "Failed to fetch history",
    });
  }
};

module.exports = {
  createEventProposal,
  getMyEventHistory,
};