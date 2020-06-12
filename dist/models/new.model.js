"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const newSchema = new mongoose_1.Schema({
    created_at: {
        type: String,
    },
    title: {
        type: String,
    },
    url: {
        type: String,
    },
    author: {
        type: String,
    },
    points: {
        type: Number,
    },
    story_text: {
        type: String,
    },
    comment_text: {
        type: String,
    },
    num_comments: {
        type: Number,
    },
    story_id: {
        type: Number,
    },
    story_title: {
        type: String,
    },
    story_url: {
        type: String,
    },
    parent_id: {
        type: Number,
    },
    created_at_i: {
        type: Number,
    },
    _tags: {
        type: Array,
    },
    objectID: {
        type: String,
        unique: true,
    },
    status: {
        type: String,
        default: "ENABLED",
    },
});
exports.New = mongoose_1.model("New", newSchema);
