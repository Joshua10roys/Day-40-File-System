import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';

const app = express();
dotenv.config();

const port = process.env.PORT

// date
var date = new Date().toString().split(' ');
var dateFormated = date[2] + '-' + date[1] + '-' + date[3];
//time
var time = new Date().toLocaleTimeString().split(' ');
var timeFormated = time[0].split(':').join('-') + '-' + time[1];
//content
var content = new Date().toString();

// api home
app.get('/', (req, res) => {
    res.send("Task File System")
})

// api endpoint to create file
app.get('/create_file', (req, res) => {

    fs.writeFile(`./files/${dateFormated}-${timeFormated}.txt`, content, (error) => {
        if (error) {
            res.status(500).send("file not created")
        } else {
            res.status(200).send("File has been created")
        }
    })
})

// api end point to get all files name
app.get('/get_files', (req, res) => {

    fs.readdir('./files', (error, files) => {
        if (error) { res.status(500).send("something went wrongplease try again") }
        else { res.status(200).send(files) }
    })
})

// api end point to read file content by file name
app.get('/get_content/:file_name', (req, res) => {

    const file_name = req.params.file_name

    fs.readFile(`./files/${file_name}`, (error, data) => {
        if (error) { res.status(500).send("File does not exist, Please check the file name entered") }
        else { res.status(200).send(data.toString()) }
    })
})

app.listen(port, () => console.log(`app listening on port ${port}`));