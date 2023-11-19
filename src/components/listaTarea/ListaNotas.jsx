import React, { useState } from "react";
import { Form, Button, ListGroup, InputGroup } from "react-bootstrap";
import Nota from "./Nota";
import { Container, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ListaNotas() {
  const notify = () => toast("Wow so easy!");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [notes, setNotes] = useState([]);
  const [estadoDeNota, setEstadoDeNota] = useState(1);

  const guardarInput = (e) => {
    setDescripcion(e.target.value);
  };

  const guardarTitulo = (e) => {
    setTitulo(e.target.value);
  };

  const addNote = (e) => {
    if (titulo.trim() !== "" && descripcion.trim() !== "" && estadoDeNota === 1 ) {
        const nuevaNota = {
          id: notes.length,
          titulo: titulo,
          descripcion: descripcion,
          estadoVisible: true,
          estadoDeNota: estadoDeNota,
          fechaCreacion: new Date().toLocaleString(),
        };

        setNotes([...notes, nuevaNota]);
        setTitulo("");
        setDescripcion("");
        
        toast.success('Nota agregada con éxito!', {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          });
    }
    else {
      toast.warn('Por favor complete los campos', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
  };

  const deleteNote = (id) => {
    const nuevaLista = notes.map((nota) =>
      nota.id === id ? { ...nota, estadoDeNota: 0 } : nota
    );
    setNotes(nuevaLista);
  };

  const notaProceso = (id) => {
    const nuevaLista = notes.map((nota) =>
      nota.id === id ? { ...nota, estadoDeNota: 2 } : nota
    );
    setNotes(nuevaLista);
  };

  const notaTerminada = (id) => {
    const nuevaLista = notes.map((nota) =>
      nota.id === id ? { ...nota, estadoDeNota: 3} : nota
    );
    setNotes(nuevaLista);
  };

  // Función para filtrar las notas según el estado
  const filtrarNotas = (estado) => {
    return notes.filter((nota) => nota.estadoDeNota === estado);
  };

  return (
    <Container>
      <Row>
        <>
          <h1 className="m-4">Lista de Notas</h1>

          <Form>
            <InputGroup className="mb-3">
              <Button variant="success" onClick={addNote}>
                Agregar Nota
              </Button>
              <Form.Control
                type="text"
                onChange={guardarTitulo}
                placeholder="Título"
                value={titulo}
              />
              <Form.Control
                type="text"
                onChange={guardarInput}
                placeholder="Descripción"
                value={descripcion}
              />
            </InputGroup>
          </Form>

          <div className="justify-content-center">
            <ListGroup>
              {filtrarNotas(1).map((nota) => (
                <Nota
                  key={nota.id}
                  id={nota.id}
                  titulo={nota.titulo}
                  descripcion={nota.descripcion}
                  estadoDeNota={nota.estadoDeNota}
                  fechaCreacion={nota.fechaCreacion}
                  delete={deleteNote}
                  notaProceso={notaProceso}
                  notaTerminada={notaTerminada}
                />
              ))}
            </ListGroup>
          </div>
          <br />
          <h1 className="m-4">Notas en Proceso</h1>
          <div className="justify-content-center">
            <ListGroup>
              {filtrarNotas(2).map((nota) => (
                <Nota
                  key={nota.id}
                  id={nota.id}
                  titulo={nota.titulo}
                  descripcion={nota.descripcion}
                  estadoDeNota={nota.estadoDeNota}
                  fechaCreacion={nota.fechaCreacion}
                  delete={deleteNote}
                  notaProceso={notaProceso}
                  notaTerminada={notaTerminada}
                />
              ))}
            </ListGroup>
          </div>
          <br />
          <h1 className="m-4">Notas Finalizadas</h1>
          <div className="justify-content-center">
            <ListGroup>
              {filtrarNotas(3).map((nota) => (
                <Nota
                  key={nota.id}
                  id={nota.id}
                  titulo={nota.titulo}
                  descripcion={nota.descripcion}
                  estadoDeNota={nota.estadoDeNota}
                  fechaCreacion={nota.fechaCreacion}
                  delete={deleteNote}
                  notaProceso={notaProceso}
                  notaTerminada={notaTerminada}
                />
              ))}
            </ListGroup>
          </div>
        </>
      </Row>
      <ToastContainer />
    </Container>
  );
}