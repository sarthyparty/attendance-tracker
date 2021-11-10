import React from "react"
import Typewriter from "typewriter-effect";
import {user} from "./Utils.js";

class Welcome extends React.Component {
    render(props) {
      return <div class = "welcome">
        <div class = "welcome">
            <Typewriter
            onInit={(typewriter) => {
              typewriter
              .typeString("Hello, " + user)
              .stop()
              .start();}}
            />
          </div>
      </div>
      ;
    }
}

export default Welcome;