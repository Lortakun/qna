const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());

const questions = {
    '1': {'title': 'What is love?', 'description': 'Baby don\'t hurt me! No more!', 'id': 1},
    '2': {'title': 'Nani?', 'description': 'Omae wa mou shindeirou', 'id': 2},
    '3': {'title': 'Nanda korewa?', 'description': '', 'id': 3},
    '4': {'title': 'Does he look like a bitch?', 'description': 'What does Marcellus Wallace look like?', 'id': 4},
    '5': {'title': 'English Motherfucker!', 'description': 'Do you speak it?', 'id': 5},
    '6': {'title': 'What is love?', 'description': 'Baby don\'t hurt me! No more!', 'id': 6},


    '11': {'title': 'What is love?', 'description': 'Baby don\'t hurt me! No more!', 'id': 11},
    '12': {'title': 'Nani?', 'description': 'Omae wa mou shindeirou', 'id': 12},
    '13': {'title': 'Nanda korewa?', 'description': '', 'id': 13},
    '14': {'title': 'Does he look like a bitch?', 'description': 'What does Marcellus Wallace look like?', 'id': 14},
    '15': {'title': 'English Motherfucker!', 'description': 'Do you speak it?', 'id': 15},
    '16': {'title': 'What is love?', 'description': 'Baby don\'t hurt me! No more!', 'id': 16},


    '21': {'title': 'What is love?', 'description': 'Baby don\'t hurt me! No more!', 'id': 21},
    '22': {'title': 'Nani?', 'description': 'Omae wa mou shindeirou', 'id': 22},
    '23': {'title': 'Nanda korewa?', 'description': '', 'id': 23},
    '24': {'title': 'Does he look like a bitch?', 'description': 'What does Marcellus Wallace look like?', 'id': 24},
    '25': {'title': 'English Motherfucker!', 'description': 'Do you speak it?', 'id': 25},
    '26': {'title': 'What is love?', 'description': 'Baby don\'t hurt me! No more!', 'id': 26},


    '31': {'title': 'What is love?', 'description': 'Baby don\'t hurt me! No more!', 'id': 31},
    '32': {'title': 'Nani?', 'description': 'Omae wa mou shindeirou', 'id': 32},
    '33': {'title': 'Nanda korewa?', 'description': '', 'id': 33},
    '34': {'title': 'Does he look like a bitch?', 'description': 'What does Marcellus Wallace look like?', 'id': 34},
    '35': {'title': 'English Motherfucker!', 'description': 'Do you speak it?', 'id': 35},
    '36': {'title': 'What is love?', 'description': 'Baby don\'t hurt me! No more!', 'id': 36},
};
let next_id = 37;


app.get('/api/questions/:id', (request, response) => {
    const id = request.params.id | 0;
    if (id <= 0) {
        response.sendStatus(400); // bad request
    } else if (!(id in questions)) {
        response.sendStatus(404); // not found
    } else {
        const question = questions[request.params.id];
        response.json(question);
    }
});

app.get('/api/questions', (request, response) => {
    const limit = (request.query.limit | 0) || 10;
    const offset = (request.query.offset || 0) | 0;

    const data = Object.values(questions);
    data.sort((a, b) => b.id - a.id);
    response.json(data.slice(offset, offset + limit));
});

app.post('/api/questions', (request, response) => {
    const question = {
        id: next_id++,
        title: '' + request.body.title,
        description: '' + request.body.description,
    };
    questions[question.id] = question;

    response.status(201);
    response.setHeader('Location', `/api/questions/${question.id}`);
    response.json(question);
});

const server = app.listen(3000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.info(`Example app listening at 'http://${host}:${port}'`);
});

