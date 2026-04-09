// src/payment.controller.js
import paypal from '@paypal/checkout-server-sdk';
import { client } from '../api/paypal.js';
import db from '../config/db.js';

export const createOrder = async (req, res) => {
    const { nombre, precio_original, monto_pagar, id_producto } = req.body;

    // Validación de entrada
    if (!monto_pagar || !precio_original) {
        console.error("⚠️ Datos incompletos recibidos:", req.body);
        return res.status(400).json({ msg: "Faltan parámetros de precio" });
    }

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");

    // Calculamos la diferencia para que el total de PayPal coincida con el input manual
    const pOriginal = parseFloat(precio_original);
    const pPagado = parseFloat(monto_pagar);
    const diferencia = pPagado - pOriginal;

    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'MXN',
                value: monto_pagar.toString(),
                breakdown: {
                    item_total: {
                        currency_code: 'MXN',
                        value: monto_pagar.toString()
                    }
                }
            },
            description: `Compra de ${nombre} en omniHub`,
            items: [
                {
                    name: nombre,
                    unit_amount: {
                        currency_code: 'MXN',
                        value: precio_original.toString()
                    },
                    quantity: "1"
                },
                {
                    name: "Ajuste manual de simulación",
                    unit_amount: {
                        currency_code: 'MXN',
                        value: diferencia.toFixed(2).toString()
                    },
                    quantity: "1"
                }
            ],
            custom_id: id_producto.toString()
        }]
    });

    try {
        const order = await client.execute(request);
        res.status(201).json({
            id: order.result.id,
            links: order.result.links
        });
    } catch (error) {
        console.error("Error creando orden en PayPal:", error);
        res.status(500).json({ message: "Error al procesar con PayPal" });
    }
};

export const captureOrder = async (req, res) => {
    const { orderID } = req.params;
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    try {
        const capture = await client.execute(request);
        
        if (capture.result.status === 'COMPLETED') {
            const id_producto = capture.result.purchase_units[0].payments.captures[0].custom_id;

            if (id_producto) {
                try {
                    await db.query('CALL sp_update_stock(?)', [id_producto]);
                    console.log(`✅ Stock actualizado para el producto ID: ${id_producto}`);
                } catch (dbError) {
                    console.error("❌ Error en MySQL al actualizar stock:", dbError.message);
                }
            } else {
                console.warn("⚠️ No se encontró custom_id en la respuesta de PayPal.");
            }
        }

        res.json(capture.result);
    } catch (error) {
        console.error("Error en captura o base de datos:", error);
        res.status(500).json({ error: error.message });
    }
};