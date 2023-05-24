const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'edit.html'));
});

// Serve the student codes data
app.get('/studentCodes', (req, res) => {
    try {
        const data = fs.readFileSync('studentCodes.json', 'utf8');
        const studentCodesData = JSON.parse(data);
        res.json(studentCodesData);
    } catch (err) {
        console.error('Error reading studentCodes.json:', err);
        res.status(500).send('Error reading student codes');
    }
});

// Edit a student code
app.put('/editStudentCode/:code', (req, res) => {
    const code = req.params.code;
    const hint = req.body.hint;

    try {
        let studentCodesData = {};

        // Read the existing data from the studentCodes.json file
        const data = fs.readFileSync('studentCodes.json', 'utf8');
        if (data) {
            studentCodesData = JSON.parse(data);
        }

        // Update the hint for the specified student code
        studentCodesData[code] = hint;
        // Write the updated data back to the studentCodes.json file
        fs.writeFileSync('studentCodes.json', JSON.stringify(studentCodesData, null, 2));
        console.log('Student code edited successfully:', code);
        res.send('Student code edited successfully');
    } catch (err) {
        console.error('Error writing studentCodes.json:', err);
        res.status(500).send('Error editing student code');
    }
});

// Delete a student code
app.delete('/deleteStudentCode/:code', (req, res) => {
    const code = req.params.code;

    try {
        let studentCodesData = {};

        // Read the existing data from the studentCodes.json file
        const data = fs.readFileSync('studentCodes.json', 'utf8');
        if (data) {
            studentCodesData = JSON.parse(data);
        }

        // Check if the student code exists
        if (studentCodesData.hasOwnProperty(code)) {
            // Delete the student code from the data
            delete studentCodesData[code];

            // Write the updated data back to the studentCodes.json file
            fs.writeFileSync('studentCodes.json', JSON.stringify(studentCodesData, null, 2));
            console.log('Student code deleted successfully:', code);
            res.send('Student code deleted successfully');
        } else {
            res.status(404).send('Student code not found');
        }
    } catch (err) {
        console.error('Error writing studentCodes.json:', err);
        res.status(500).send('Error deleting student code');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
