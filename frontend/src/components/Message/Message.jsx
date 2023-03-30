import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import "../Message/Message.scss";

const Message = () => {
  const { variant } = useParams();
  const location = useLocation();
  const [message, setMessage] = useState("");
  console.log(location);
  useEffect(() => {
    if (location?.state?.message) {
      setMessage(location?.state?.message);
    }
  }, [location]);

  return (
    <section className="mainMessage">
      <Alert variant={variant || "info"}>
        <div className="alertMessage">{message}</div>
      </Alert>
    </section>
  );
};

// Message.defaultProps = {
//   variant: "info",
// };

export default Message;
