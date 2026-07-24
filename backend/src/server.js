const express = require('express');
const cors = require('cors');
const env = require('./config/env');
const adminRoutes = require('./routes/adminRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', adminRoutes);
app.use('/', chatRoutes);

app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
});
