import React, { useState } from 'react';
import { Form, Table, Container, Row, Col,InputGroup } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Comparador = () => {

    //Tostify
    const notify = () => toast();
    
    // Estados para los array de productos
    const [productos, setProductos] = useState([]);
    const [productosBaratos, setProductosBaratos] = useState([]);

    // Estados para los inputs
    const [nombreProd, setNombreProd] = useState('');
    const [precioProd, setPrecioProd] = useState('');
    const [comercio, setComercio] = useState('Comodin');

    // Guardando los valores de los input
    const guardarInputNombre = (e) => setNombreProd(e.target.value);
    const guardarInputPrecio = (e) => setPrecioProd(e.target.value);
    const guardarInputComercio = (e) => setComercio(e.target.value);

    // Función para agregar un nuevo producto
    const agregarProducto = () => {
        if (nombreProd && precioProd && comercio) {
            const nuevoProducto = {
                id: productos.length,
                nombre: nombreProd,
                precio: parseInt(precioProd),
                comercio: comercio,
            };

            // Actualizar el estado de productos
            setProductos([...productos, nuevoProducto]);

            // Actualizar productos baratos
            const productoBaratoExistente = productosBaratos[nuevoProducto.nombre];
            if (!productoBaratoExistente || nuevoProducto.precio < productoBaratoExistente.precio) {
                setProductosBaratos((prevProductosBaratos) => ({
                    ...prevProductosBaratos,
                    [nuevoProducto.nombre]: nuevoProducto,
                }));
            }

            toast.success('¡Producto agregado con éxito!', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                });

        setNombreProd('');
        setPrecioProd('');
        setComercio('');

                
        } else {
            toast.error('Por favor, complete correctamente todos los campos', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                });
        }
    };

    return (
        <Container className="my-8">
            <h1 className="font-bold text-center my-2">Comparador de Precios</h1>
            <h2 className="font-semibold text-lg text-center mb-8">Ingresa los nombres, los proveedores y sus precios.</h2>
            <div>
        <ToastContainer />
      </div>
            <Form>
                <InputGroup>
                    <Form.Control
                        type="text"
                        onChange={guardarInputNombre}
                        placeholder="Nombre del Producto"
                        value={nombreProd}
                    />
                    <Form.Control
                        type="number"
                        onChange={guardarInputPrecio}
                        placeholder="Precio del Producto"
                        value={precioProd}
                    />
                     <Form.Control
                        as="select"
                        onChange={guardarInputComercio}
                        value={comercio}
                    >
                        <option>Comodin</option>
                        <option>Vea</option>
                        <option>Carrefour</option>
                        <option>Yaguar</option>
                        <option>ChangoMas</option>
                        <option>Dia</option>
                    </Form.Control>
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
            </Form>

            {/* Tablas */}
            <Row>
                {/* Tabla de Productos */}
                <Col>
                    <div className="my-8">
                        <h3 className="font-bold text-lg mb-4">Lista de Productos</h3>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Comercio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map((producto) => (
                                    <tr key={producto.id}>
                                        <td>{producto.id}</td>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.precio}</td>
                                        <td>{producto.comercio}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Col>
                {/* Tabla de Productos Más Baratos */}
                <Col>
                    <div className="my-8">
                        <h3 className="font-bold text-lg mb-4">Lista de Productos Más Baratos</h3>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Comercio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.values(productosBaratos).map((producto) => (
                                    <tr key={producto.id}>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.precio}</td>
                                        <td>{producto.comercio}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Comparador;
