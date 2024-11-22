const express = require('express');
const sql = require('mssql');
const app = express();
const PORT = 3000;

const config = {
   server: 'azsql-sgi-integra.database.windows.net',
   database: 'azsql-sgi-integra-bd',
   authentication: {
       type: 'default',
       options: {
           userName: 'sistemagestionintegral@integra.cl',
           password: 'K33.Z3Uz88'
       }
   },
   options: {
       encrypt: true,
       trustServerCertificate: false
   }
};

let pool;

async function connectDB() {
   try {
       pool = await sql.connect(config);
       console.log('Conectado a Azure SQL Database');
   } catch (err) {
       console.error('Error de conexión:', err);
   }
}

app.get('/api/tbRegion', async (req, res) => {
   try {
       const result = await pool.request()
           .query('SELECT * FROM tbRegion');
       res.json(result.recordset);
   } catch (err) {
       console.error('Error en consulta:', err);
       res.status(500).send(err);
   }
});

connectDB();

app.listen(PORT, () => {
   console.log(`Servidor corriendo en http://localhost:${PORT}`);
});