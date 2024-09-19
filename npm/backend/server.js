const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 1115;

const cors = require('cors');
app.use(cors());


// Middleware para analisar o corpo da requisição em JSON
app.use(bodyParser.json());

// Rota para receber os dados do front-end e salvar em um arquivo
app.post('/api/save-response', (req, res) => {
    console.log('Recebendo dados do front-end:', req.body); 
    const data = req.body; // Dados recebidos do front-end
    const folderPath = path.join(__dirname, 'respostas'); // Caminho da pasta "respostas" no backend

    // Verifica se a pasta "respostas" existe, senão, cria a pasta
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }

    // Gera um nome de arquivo único usando a data e hora
    const filename = `resposta-${new Date().toISOString()}.json`;
    const filePath = path.join(folderPath, filename);

    // Salva o arquivo na pasta "respostas"
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Erro ao salvar o arquivo:', err);
            return res.status(500).send('Erro ao salvar o arquivo');
        }
        res.send('Arquivo salvo com sucesso');
    });
});


// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
