const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose=require('mongoose')
const path=require('path')
const cors=require('cors')
const cookieparser=require('cookie-parser')
const expressSession=require('express-session')
const { connectToDB } = require('./database/connection')
const User = require('./models/userModel');
const upload = require('./config/multer-config');


connectToDB()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret:"MANIT"
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));


app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        } else {
            const newUser = new User({ name, email, password });
            await newUser.save();
        }
        res.status(200).json({ message: 'Signup successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(200).json(user); // Return the whole user data
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/upload-files', upload.array('images', 10), async (req, res) => {
    try {
        const userData = JSON.parse(req.body.user); // Parse user data from the request body
        const user = await User.findById(userData._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Add each image buffer to the user's arts array
        req.files.forEach(file => {
            user.arts.push(file.buffer);
        });

        await user.save(); // Save the user with the updated arts array
        res.status(200).json({ message: 'Files uploaded and saved successfully' });
        console.log("Upload successful");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
