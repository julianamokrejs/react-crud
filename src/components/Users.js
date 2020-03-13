import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, InputGroup, FormControl, Table, Button, Container } from 'react-bootstrap';

const baseUrl = 'https://fontend-test-xgb.herokuapp.com/clientes';

const initialState = {
    user: {
        nome: '',
        cpf: '',
        id: ''
    },
    list: []
}

export class Users extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ user: initialState.user });
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then(resp => {
                const list = this.updateList(resp.data)
                this.setState({ user: initialState.user, list })
            })
    }

    updateList(user, add = true) {
        const list = this.state.list.filter(p => p.id !== user.id)
        if (add) list.unshift(user)
        return list
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm() {
        return (
            <React.Fragment>
                <Row className="mt-4">
                    <Col>
                        <InputGroup className="mt-4 mb-3">
                            <FormControl placeholder="Nome" aria-label="Nome" aria-describedby="basic-addon2" name="nome" value={this.state.user.name} onChange={event => this.updateField(event)} />
                        </InputGroup >
                    </Col>
                    <Col>
                        <InputGroup className="mt-4 mb-3">
                            <FormControl placeholder="CPF" aria-label="Amount" name="cpf" value={this.state.user.cpf} onChange={event => this.updateField(event)} />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="mb-5">
                    <Col>
                        <Button variant="info" className="mr-2" onClick={event => this.save(event)}>Salvar</Button>
                        <Button variant="outline-secondary" onClick={event => this.clear(event)}>Cancelar</Button>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.updateList(user, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <Table className="mt-4 striped bordered hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Produto</th>
                        <th>CPF</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{this.renderRows()}</tbody>
            </Table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.nome}</td>
                    <td>{user.cpf}</td>
                    <td>
                        <Button variant="secondary" className="mr-1" onClick={() => this.load(user)}>Editar</Button>
                        <Button variant="warning" onClick={() => this.remove(user)}>Deletar</Button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Container>
                {this.renderForm()}
                {this.renderTable()}
            </Container>
        )
    }

}

export default Users
