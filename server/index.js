const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fomoore_portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const Project = require('./models/Project');

// Basic Route
app.get('/', (req, res) => {
    res.send('FOMOORE API Running');
});

// Get Projects
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Seed Projects (Dev only)
app.post('/api/seed', async (req, res) => {
    try {
        await Project.deleteMany({});
        const sampleProjects = [
            {
                title: "SKINSUIT",
                description: "Full-stack product development. Engineered a scalable MERN stack web app with custom REST APIs and integrated Shopify. Immersive 3D interface using Three.js.",
                technologies: ["MERN", "Three.js", "Shopify API", "Figma"]
            },
            {
                title: "ROBOTIC ART PROJECT",
                description: "Experimental video artwork manipulating data streams using custom Go-based libraries. Explored data moshing and glitch aesthetics.",
                technologies: ["Go", "Video Processing", "Glitch Art"]
            },
            {
                title: "ML RESEARCH PIPELINES",
                description: "Developed end-to-end ML systems, including custom predictive models and RAG pipelines. Fine-tuned LLMs for creative applications.",
                technologies: ["Python", "PyTorch", "LLMs", "Docker"]
            },
            {
                title: "CEN SPACE INSTALLATIONS",
                description: "Interactive digital and physical installations merging aesthetics with functional design. Physical computing with Arduino/Raspberry Pi.",
                technologies: ["React", "Arduino", "Physical Computing"]
            },
        ];
        await Project.insertMany(sampleProjects);
        res.json({ message: "Database seeded" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
