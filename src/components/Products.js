import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, InputGroup, FormControl, Table, Button, Container } from 'react-bootstrap';

const baseUrl = 'https://fontend-test-xgb.herokuapp.com/produtos';

const initialState = {
    product: {
        nome: '',
        preco: '',
        id: ''
    },
    list: []
}

export class Products extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ product: initialState.product });
    }

    save() {
        const product = this.state.product
        const method = product.id ? 'put' : 'post'
        const url = product.id ? `${baseUrl}/${product.id}` : baseUrl
        axios[method](url, product)
            .then(resp => {
                const list = this.updateList(resp.data)
                this.setState({ product: initialState.product, list })
            })
    }

    updateList(product, add = true) {
        const list = this.state.list.filter(p => p.id !== product.id)
        if (add) list.unshift(product)
        return list
    }

    updateField(event) {
        const product = { ...this.state.product }
        product[event.target.name] = event.target.value
        this.setState({ product })
    }

    renderForm() {
        return (
            <React.Fragment>
                <Row className="mt-4">
                    <Col>
                        <InputGroup className="mt-4 mb-3">
                            <FormControl placeholder="Nome" aria-label="Nome" aria-describedby="basic-addon2" name="nome" value={this.state.product.name} onChange={event => this.updateField(event)} />
                        </InputGroup >
                    </Col>
                    <Col>
                        <InputGroup className="mt-4 mb-3">
                            <FormControl placeholder="Preço" aria-label="Amount" name="preco" value={this.state.product.price} onChange={event => this.updateField(event)} />
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

    load(product) {
        this.setState({ product })
    }

    remove(product) {
        axios.delete(`${baseUrl}/${product.id}`).then(resp => {
            const list = this.updateList(product, false)
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
                        <th>Preço</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{this.renderRows()}</tbody>
            </Table>
        )
    }

    renderRows() {
        return this.state.list.map(product => {
            return (
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.nome}</td>
                    <td>{product.preco}</td>
                    <td>
                        <Button variant="secondary" className="mr-1" onClick={() => this.load(product)}>Editar</Button>
                        <Button variant="warning" onClick={() => this.remove(product)}>Deletar</Button>
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

export default Products
