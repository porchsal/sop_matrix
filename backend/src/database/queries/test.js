const {getEmployeeBySiteAndPosition} = require('./employee_queries');
const db = require('../connection');

(async () => { try { // Conéctate a la base de datos 
    await db.connect(); // Datos de prueba 
    const testSiteIds = [1, 2]; // Reemplaza con IDs de sitios válidos 
    const testPositionIds = [1, 2, 3, 4]; // Reemplaza con IDs de posiciones válidas 
    // Llamada a la función de prueba 
    const employees = await getEmployeeBySiteAndPosition(testSiteIds, testPositionIds); 
    // Mostrar resultados 
    console.log('Employees fetched:', employees);
 } catch (error) { console.error('Error during test:', error); 

 } finally { // Cerrar la conexión a la base de datos 
    await db.end();
 }
 })();