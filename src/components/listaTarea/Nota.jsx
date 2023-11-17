import React from "react";
import { ListGroup, Button } from "react-bootstrap";

export default function Nota({ id, titulo, descripcion, delete: deleteNote, notaProceso, notaTerminada}) {
  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center"
    style={ {maxHeight: "10%", overflow: "-moz-hidden-unscrollable"}}>
      <div>
        <strong>{titulo}</strong><br></br>
       <> {descripcion} </>
      </div>
      <div>
      <Button variant="danger" onClick={() => deleteNote(id)}>
        Eliminar
      </Button>
      <Button variant="info" onClick={() => notaProceso(id)}>
        Nota en proceso
      </Button>
      <Button variant="success" onClick={() => notaTerminada(id)}>
        Nota Terminada
      </Button>
      </div>
    </ListGroup.Item>
  );
}
