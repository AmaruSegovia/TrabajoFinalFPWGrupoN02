import React, { useState } from "react";
import { Form, Button, ListGroup, InputGroup } from "react-bootstrap";
import Nota from "./Nota";
import { Container, Row } from 'react-bootstrap';

export default function ListaNotas() {
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
      const descripcionExistente = notes.some((nota) => nota.descripcion === descripcion);

      if (!descripcionExistente) {
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
      } else {
        alert("La Nota ya existe");
      }
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
    </Container>
  );
}