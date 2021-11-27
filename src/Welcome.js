import React from "react";
import Typewriter from "typewriter-effect";

function Welcome() {
  document.title = "Dashboard";
  return (
    <div class="welcome">
      <div class="welcome">
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString(
                "Hello, " + localStorage.getItem("email").split("@")[0]
              )
              .stop()
              .start();
          }}
        />
      </div>
    </div>
  );
}

export default Welcome;
