import React, { useState } from 'react'
import { Form, Button, ListGroup, InputGroup } from "react-bootstrap";
import { Container, Row } from 'react-bootstrap';

const Comparador = () => {
    // Estados para los array de productos
    let [productos, setProductos] = useState([]);
    let [productosBaratos, setProductosBaratos] = useState([]);

    // Estado para el producto creado
    let [nuevoProducto, setNuevoProducto] = useState({});

    // Estados para los inputs
    let [nombreProd, setNombreProd] = useState('');
    let [precioProd, setPrecioProd] = useState('');
    let [comercio, setComercio] = useState('');

    // Guardando los valores de los input
    const guardarInputNombre = (e) => {
        setNombreProd(e.target.value);
        console.log(nombreProd);
    }
    const guardarInputPrecio = (e) => {
        setPrecioProd(e.target.value);
        console.log(precioProd);
    }
    const guardarInputComercio = (e) => {
        setComercio(e.target.value);
        console.log(comercio);
    }

    const agregarProducto = () => {
        if (nombreProd && precioProd && comercio) {
            nuevoProducto = {
                id: productos.length,
                nombre: nombreProd,
                precio: precioProd,
                comerio: comercio
            }

            productos.push(nuevoProducto);

            let productoReemplazado = true;

            if (!productosBaratos[nuevoProducto.nombre] || nuevoProducto.precio < productosBaratos[nuevoProducto.nombre].precio) {
                productosBaratos[nuevoProducto.nombre] = nuevoProducto;
                console.log('Se añade o actualiza producto barato');
            }

            if (productoReemplazado === false) {
                productosBaratos.push(nuevoProducto);
            }
            alert("¡Producto agregado exitosamente!");
        } else {
            alert("Por favor, complete todos los campos.");
        }

        console.log(productos, productosBaratos);
    }
    /* 
    let listarProductos = () => {}
    let listarMenorPrecio = () => {} 
    */


    return (
        <Container className="my-8">
            <h1 className='font-bold text-center my-2'>Comparador de Precios</h1>
            <h2 className='font-semibold text-lg text-center mb-8'>Ingresa los nombres, los proveedores y sus precios.</h2>

            <Form>
                <InputGroup>
                    <Form.Control
                        type="text"
                        onChange={guardarInputNombre}
                        placeholder="Nombre del Producto"
                        value={nombreProd}
                    />
                    <Form.Control
                        type="text"
                        onChange={guardarInputPrecio}
                        placeholder="Precio del Producto"
                        value={precioProd}
                    />
                    <Form.Control
                        type="text"
                        onChange={guardarInputComercio}
                        placeholder="Nombre del Comercio"
                        value={comercio}
                    />
                </InputGroup>
                <div className="flex my-8">
                    <button
                        onClick={agregarProducto}
                        type="button"
                        className='
                            transition-all ease-out duration-100 
                            width-100 
                            text-xl text-white font-semibold 
                            mx-auto p-2 px-3 
                            rounded-lg 
                            bg-amber-700 hover:bg-amber-600 active:bg-amber-800 
                            active:ring active:ring-gray-900 
                            shadow-md'>
                        + Agregar Producto
                    </button>
                </div>
                <div className="flex justify-center my-12">

                    <button
                        type="button"
                        className='
                            transition-all ease-out duration-100 
                            width-100 
                            text-l text-white 
                            mx-auto p-2 px-3 
                            rounded-lg 
                            bg-orange-400 hover:bg-orange-300 active:bg-orange-500 
                            active:ring-2 active:ring-gray-900 
                            shadow-md'>
                        ☰ Listar Productos
                    </button>
                    <button
                        type="button"
                        className="
                            transition-all ease-out duration-100 
                            width-100 
                            text-l text-white 
                            mx-auto p-2 px-3 
                            rounded-lg 
                            bg-lime-500 hover:bg-lime-400 active:bg-lime-600 
                            active:ring-2 active:ring-gray-900 
                            shadow-md">
                        ↘ Listar Más Baratos
                    </button>
                </div>
            </Form>
        </Container>
    )
}

export default Comparador
