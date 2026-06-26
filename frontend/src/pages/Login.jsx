import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/login.css";

import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";
import { BASE_URL } from "./../utils/config.js";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });
  const [userData, setUserData] = useState(null);

  const [errorMsg, setErrorMsg] = useState("");
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log(credentials);
    fetch(`${BASE_URL}/auth/login`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        console.log(data.data._doc);
        setUserData(data.data._doc);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.data._doc));
        // window.open("/", "_self");
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg(err?.response?.data.message);
        setTimeout(() => {
          setErrorMsg("");
        }, 5000);
      });
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      id="email"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <p className="text-danger">{errorMsg}</p>
                  <Link to='/Home'
                    type="submit"
                    className="btn secondary__btn auth__btn"
                  >
                    Login
                  </Link>
                </Form>
                <p>
                  Don't have an account ?<Link to="/register">Create</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
