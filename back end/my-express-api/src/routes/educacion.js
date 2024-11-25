const express = require('express');
const router = express.Router();
const sql = require('mssql');

// Constantes para mensajes
const MESSAGES = {
    DB_ERROR: 'Error al consultar la base de datos',
    NO_DATA: 'No se encontraron datos para los parámetros especificados',
    REQUIRED_YEAR: 'El parámetro año es requerido'
};

// Validador de parámetros reutilizable
function validateParams(ano, codigoRegion) {
    if (!ano) {
        throw new Error(MESSAGES.REQUIRED_YEAR);
    }
    return {
        ano: parseInt(ano, 10),
        codigoRegion: parseInt(codigoRegion, 10) || 0
    };
}

// Función genérica para ejecutar SPs
async function executeSP(spName, params) {
    try {
        console.log(`Ejecutando ${spName} con parámetros:`, params);
        
        const request = new sql.Request();
        const result = await request
            .input('CodigoRegion', sql.Int, params.codigoRegion)
            .input('Ano', sql.Int, params.ano)
            .execute(spName);

        console.log(`${spName} ejecutado exitosamente`);
        return result;
    } catch (error) {
        console.error(`Error ejecutando ${spName}:`, error);
        throw error;
    }
}

// Endpoints
router.get('/necesidades', async (req, res) => {
    try {
        const { ano, codigoRegion } = req.query;
        const params = validateParams(ano, codigoRegion);
        const result = await executeSP('sp_EducacionObtenerNecesidades', params);

        if (!result.recordset || result.recordset.length === 0) {
            return res.status(404).json({
                success: false,
                message: MESSAGES.NO_DATA
            });
        }

        // Calcular totales
        const totales = result.recordset.reduce((acc, curr) => ({
            cantidadTotal: acc.cantidadTotal + curr.Cantidad,
            necesidadesPorCategoria: {
                ...acc.necesidadesPorCategoria,
                [curr.CategoriaNEE]: (acc.necesidadesPorCategoria[curr.CategoriaNEE] || 0) + curr.Cantidad
            }
        }), { cantidadTotal: 0, necesidadesPorCategoria: {} });

        return res.json({
            success: true,
            data: result.recordset,
            summary: totales,
            count: result.recordset.length
        });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            success: false,
            message: MESSAGES.DB_ERROR,
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Los otros endpoints siguen el mismo patrón
router.get('/necesidades/comuna', async (req, res) => {
    try {
        const { ano, codigoRegion } = req.query;
        const params = validateParams(ano, codigoRegion);
        const result = await executeSP('sp_EducacionObtenerNecesidadesPorComuna', params);

        if (!result.recordset || result.recordset.length === 0) {
            return res.status(404).json({
                success: false,
                message: MESSAGES.NO_DATA
            });
        }

        return res.json({
            success: true,
            data: result.recordset,
            count: result.recordset.length
        });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            success: false,
            message: MESSAGES.DB_ERROR,
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

router.get('/porcentajePermanente', async (req, res) => {
    try {
        const { ano, codigoRegion } = req.query;
        const params = validateParams(ano, codigoRegion);
        const result = await executeSP('sp_EducacionObtenerPorcentajePermanente', params);

        if (!result.recordset || result.recordset.length === 0) {
            return res.status(404).json({
                success: false,
                message: MESSAGES.NO_DATA
            });
        }

        return res.json({
            success: true,
            data: result.recordset,
            count: result.recordset.length
        });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            success: false,
            message: MESSAGES.DB_ERROR,
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

module.exports = router;