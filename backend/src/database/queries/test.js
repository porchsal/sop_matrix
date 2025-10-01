const {getEmployeeBySiteAndPosition} = require('./employee_queries');
const {getTrainingByEmployeeId} = require('./training_queries');
const db = require('../connection');

(async () => { try { // Conéctate a la base de datos 
    await db.connect(); // Datos de prueba 
    const employeeId = [71]; // Reemplaza con IDs de sitios válidos 
     
    // Llamada a la función de prueba 
    const employees = await getTrainingByEmployeeId(employeeId); 

 } catch (error) { console.error('Error during test:', error); 

 } finally { // Cerrar la conexión a la base de datos 
    await db.end();
 }
 })();

