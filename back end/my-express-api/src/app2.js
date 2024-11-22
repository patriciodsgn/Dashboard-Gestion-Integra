const express = require('express');
const sql = require('mssql');

const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors());
const config = {
    server: 'azsql-sgi-integra.database.windows.net',
    database: 'azsql-sgi-integra-bd',
    authentication: {
        type: 'azure-active-directory-default',
    },
    options: {
        encrypt: true,
        trustServerCertificate: false
    }
};

app.get('/api/tbRegionIntegra', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT * FROM tbRegionIntegra');
        res.json(result.recordset);
        pool.close();
    } catch (err) {
        res.status(500).send('Error al consultar la base de datos');
        console.error(err);
    }
});


app.get('/api/tbRegion', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT * FROM tbRegion');
        res.json(result.recordset);
        pool.close();
    } catch (err) {
        res.status(500).send('Error al consultar la base de datos');
        console.error(err);
    }
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
