import React, { useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class Alunos extends React.Component {
  constructor(props) {
    super(props);
    // Inicialização do estado do componente
    this.state = {
      alunos: [], // Array vazio para armazenar os alunos
      nome: "", // Nome do aluno sendo adicionado ou editado
      email: "", // Email do aluno sendo adicionado ou editado
      editando: false, // Indica se o formulário está no modo de edição ou adição
      alunoEditandoId: null, // ID do aluno sendo editado
      showModal: false, // Controla a exibição do modal
    };
  }

  componentDidMount() {
    // Chamado após o componente ser montado no DOM
    // Verifica se há dados de alunos no localStorage e atualiza o estado
    const alunosData = localStorage.getItem("alunos");

    if (alunosData) {
      this.setState({ alunos: JSON.parse(alunosData) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Chamado sempre que o estado do componente é atualizado
    // Salva os dados de alunos no localStorage
    if (prevState.alunos !== this.state.alunos) {
      localStorage.setItem("alunos", JSON.stringify(this.state.alunos));
    }
  }

  handleChange = (event) => {
    // Manipula o evento de mudança em campos de entrada e atualiza o estado correspondente
    this.setState({ [event.target.name]: event.target.value });
  };

  handleShow = () => {
    this.setState({ showModal: true });
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  adicionarAluno = () => {
    // Função para adicionar ou editar um aluno
    const { nome, email, editando, alunoEditandoId } = this.state;

    if (nome && email) {
      // Verifica se o nome e o email não estão vazios
      if (this.validarEmail(email)) {
        // Verifica se o email é válido
        const novoAluno = {
          id: Date.now(), // Gera um ID único baseado no timestamp
          nome: nome,
          email: email,
        };

        let alunosAtualizados = [...this.state.alunos];
        if (editando) {
          // Se estiver no modo de edição, substitui o aluno existente com o novo aluno
          const alunoEditandoIndex = alunosAtualizados.findIndex(
            (aluno) => aluno.id === alunoEditandoId
          );
          alunosAtualizados[alunoEditandoIndex] = novoAluno;
        } else {
          // Caso contrário, adiciona o novo aluno ao array de alunos
          alunosAtualizados.push(novoAluno);
        }

        // Atualiza o estado, limpando os campos e o modo de edição
        this.setState({
          alunos: alunosAtualizados,
          nome: "",
          email: "",
          editando: false,
          alunoEditandoId: null,
        });
      } else {
        // Exibe um alerta caso o email não seja válido
        alert(
          "O email fornecido não é válido. Por favor, insira um email válido."
        );
      }
    }
  };

  editarAluno = (id) => {
    // Função para entrar no modo de edição de um aluno
    const alunoEditando = this.state.alunos.find((aluno) => aluno.id === id);
    if (alunoEditando) {
      // Se o aluno existe, atualiza o estado com o nome, email e informações de edição
      this.setState({
        nome: alunoEditando.nome,
        email: alunoEditando.email,
        editando: true,
        alunoEditandoId: id,
      });

      // Abre o modal
      this.handleShow();
    }
  };

  excluirAluno = (id) => {
    // Função para excluir um aluno
    const novosAlunos = this.state.alunos.filter((aluno) => aluno.id !== id);

    // Atualiza o estado
    this.setState({ alunos: novosAlunos });
  };

  validarEmail = (email) => {
    // Função para validar o formato de um email usando expressão regular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  render() {
    const { nome, email, alunos, editando, showModal } = this.state;

    return (
      <>
        <br></br>
        <Button variant="primary" onClick={this.handleShow}>
          Adicionar período
        </Button>

        <Modal show={showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{editando ? "Editar Aluno" : "Cadastrar"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="nome">
              <Form.Label>Período</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={nome}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email do Coordenador</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Fechar
            </Button>
            <Button variant="primary" onClick={this.adicionarAluno}>
              {editando ? "Editar" : "Adicionar"}
            </Button>
          </Modal.Footer>
        </Modal>

        <Table striped bordered hover>
          <thead>
            <br></br>
            <tr>
              <th>Período</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno.id}>
                <td>{aluno.nome}</td>
                <td>{aluno.email}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => this.editarAluno(aluno.id)}
                  >
                    Editar
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => this.excluirAluno(aluno.id)}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  }
}

export default Alunos;
