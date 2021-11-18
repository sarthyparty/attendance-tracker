import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import {Spinner} from "react-bootstrap";

function Loading() {
  return <div class = "loading">
    <Spinner animation="grow"/>
    <Spinner animation="grow"/>
    <Spinner animation="grow"/>
    <Spinner animation="grow"/>
  </div>;
}

export default Loading