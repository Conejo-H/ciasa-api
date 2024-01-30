const db = require('../database/mysql');
const respuesta = require ('../red/respuestas');

function putCancelled(req, res){
	try{
		return db.obtenerDatosDetVenta(req.params.folio).then((detVenta)=>{	
			try{
				if (detVenta[0].estatus !== 'cancelado'){
					res.send({respuesta: 'Estatus actualizado a cancelado'});
					return db.obtenerDatosVenta(req.params.folio).then((venta)=> {
						try{
							//console.log("Detventa" + detVenta);
							//console.log("Venta" + venta);
							db.putCancelled(detVenta);
							db.pasarVentaACancelacion(venta);
							db.eliminarVenta(detVenta);
						}
						catch{
							console.log("No se puede imprimir el texto");
						}
					})				
				}
				else{
					res.send({respuesta: 'No se puede marcar como cancelada una venta cancelada'});
				}
				
			}
			catch{
				res.send({respuesta: 'Folio no encontrado'});
			}
		})
	}
	catch(err){
		res.status(200).send({mensaje: 'Ingrese un folio válido'});	
	}
}

module.exports = {
	putCancelled
}