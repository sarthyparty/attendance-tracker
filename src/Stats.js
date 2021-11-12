import React from "react"
import 'bootstrap/dist/css/bootstrap.css';
import {Spinner} from "react-bootstrap";

class Stats extends React.Component {
    render(props) {
      return <div class = "stats">
        <div class = "stats">
            <h1>This part is still being developed.</h1>
            <br/><br/>
            <Spinner animation="grow" variant="danger" /><Spinner animation="grow" variant="danger" />
            <br/><br/><br/>
            <h1>It should be done by next week.</h1>
          </div>
      </div>
      ;
    }
}

export default Stats;