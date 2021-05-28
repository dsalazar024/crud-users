import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      nombre: "",
      usuario: "",
      email: "",
      password: "",
      usuarios: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.registrar = this.registrar.bind(this);
  }

  registrar(e) {
    fetch("/api/registrar", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        M.toast({ html: "Se ha Registrado el Usuario" });
        this.setState({ nombre: "", usuario: "", email: "", password: "" });
      })
      .catch((err) => console.log(err));
    e.preventDefault();
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    fetch("/api/getUsers")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ usuarios });
      });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        <nav className="light-blue darken-4">
          <div className="container">
            <a className="brand-logo" href="/">
              Crud
            </a>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s6">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.registrar}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          name="nombre"
                          onChange={this.handleChange}
                          type="text"
                          placeholder="Nombre"
                          value={this.state.nombre}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          name="usuario"
                          onChange={this.handleChange}
                          type="text"
                          placeholder="Nombre de Usuario"
                          value={this.state.usuario}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          name="email"
                          onChange={this.handleChange}
                          type="text"
                          placeholder="Correo"
                          value={this.state.email}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          name="password"
                          onChange={this.handleChange}
                          type="text"
                          placeholder="Contraseña"
                          value={this.state.password}
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn light-blue darken-4">
                      Registrar
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s6">
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Nombre De Usuario</th>
                    <th>Email </th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
