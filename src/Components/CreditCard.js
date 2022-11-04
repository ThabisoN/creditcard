
import React, { Component, useState } from 'react';
import Cards from 'react-credit-cards';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ButtonGroup, Alert, Row, Col } from 'react-bootstrap';
import { variables } from '../Data/Variables';
import {
    AMERICANEXPRESS,
    OTHERCARDS,
    EXPIRYDATE,
    CVC,
    CARDARR,
    CARDICON
} from "./Constants";
import { BottomBox, Inputs, Errors } from './StyleForm'
import MaskedInput from 'react-text-mask';

export class CreditCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: {},
            errors: {},
            cards: [],
            Id: 0,
            Name: "",
            Number: "",
            Expiry: "",
            CVC: "",
            focus: "",
        }
    }

    refreshList() {
        fetch(variables.API_URL + 'cards')
            .then(response => response.json())
            .then(data => {
                this.setState({ cards: data });
            });

    }

    componentDidMount() {
        this.refreshList();
    }

    changeCardName = (e) => {
        this.setState({ Name: e.target.value });
    }
    changeCardNumber = (e) => {
        this.setState({ Number: e.target.value });
    }
    changeEXPDate = (e) => {
        this.setState({ Expiry: e.target.value });
    }
    changeCVC = (e) => {
        this.setState({ CVC: e.target.value });
    }
    changeFocus = (e) => {
        this.setState({ focus: e.target.name });
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Card Number
        if (!fields["Number"]) {
            formIsValid = false;
            errors["Number"] = "Cannot be empty";
        }

        if (typeof fields["Number"] !== "undefined") {
            if (!fields["Amex"].match(/^3[47][0-9]{5,}$/)) {
                formIsValid = false;
                errors["Number"] = "Number are inValid";
            }
            if (!fields["VISA"].match(/^3[47][0-9]{5,}$/)) {
                formIsValid = false;
                errors["Number"] = "Number are inValid";
            }
            if (!fields["MasterCard"].match(/^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/)) {
                formIsValid = false;
                errors["Number"] = "Number are inValid";
            }
            if (!fields["Discover"].match(/^6(?:011|5[0-9]{2})[0-9]{3,}$/)) {
                formIsValid = false;
                errors["Number"] = "Number are inValid";
            }
        }

        //Name
        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }

        if (typeof fields["name"] !== "undefined") {
            if (!fields["name"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["name"] = "Only letters";
            }
        }

        //Expiry Date
        if (!fields["Expiry"]) {
            formIsValid = false;
            errors["Expiry"] = "Cannot be empty";
        }

        if (typeof fields["Expiry"] !== "undefined") {
            if (!fields["Expiry"].match("\d\d/\d\d")) {
                formIsValid = false;
                errors["Expiry"] = "Date only";
            }
        }


        //CVC
        if (!fields["CVC"]) {
            formIsValid = false;
            errors["CVC"] = "Cannot be empty";
        }

        if (typeof fields["CVC"] !== "undefined") {
            if (!fields["CVC"].match("\d{3,4}")) {
                formIsValid = false;
                errors["CVC"] = "Date only";
            }
        }


        this.setState({ errors: errors });
        return formIsValid;
    }

    contactSubmit(e) {
        e.preventDefault();
        if (this.handleValidation()) {
            alert("Form submitted");
        } else {
            alert("Form has errors.")
        }

    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }
    resetClick() {
        this.setState({
            Id: 0,
            Name: "",
            Number: "",
            Expiry: "",
            CVC: "",
            focus: ""
        });
    }
    createClick() {
        fetch(variables.API_URL + 'cards', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: this.state.Name,
                Number: this.state.Number,
                Expiry: this.state.Expiry,
                CVC: this.state.CVC
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
                if (this.handleValidation()) {
                    alert("Form submitted");
                } else {
                    alert("Form has errors.")
                }
            }, (error) => {

            })

    }
    render() {
        return (
            <div>
                <div className='d-flex flex-column align-items-center'>
                    <Row>
                        <Col>
                            <br />
                            <Cards
                                number={this.state.Number}
                                name={this.state.Name}
                                expiry={this.state.Expiry}
                                cvc={this.state.CVC}
                                focused={this.state.focus}

                            />
                        </Col>
                        <Col>
                            <Form className="card-body" style={{ width: '20rem', paddingTop: '2rem' }}>
                                <Inputs>
                                    <Form.Group className="mb-3" controlId="number">
                                        <MaskedInput type="tel"
                                            mask={OTHERCARDS}
                                            name='number'
                                            placeholder='Card Number'
                                            required={true}
                                            value={this.state.Number}
                                            onChange={this.changeCardNumber}
                                            onFocus={this.changeFocus}
                                        />
                                        <span className="error">{this.state.errors["Number"]}</span>
                                    </Form.Group>
                                    </Inputs>
                                    <Inputs>
                                    <Form.Group className="mb-3" controlId="name">
                                        <input type='text'
                                            name='name'
                                            placeholder='Name'
                                            required={true}
                                            value={this.state.Name}
                                            onChange={this.changeCardName}
                                            onFocus={this.changeFocus}
                                        />
                                        <span className="error">{this.state.errors["name"]}</span>
                                    </Form.Group>
                                </Inputs>
                                <Inputs inputSize="small">
                                    <BottomBox>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="ExpD">
                                                    <MaskedInput type='text'
                                                        mask={EXPIRYDATE}
                                                        name='expiry'
                                                        placeholder='MM/YY'
                                                        required={true}
                                                        value={this.state.Expiry}
                                                        onChange={this.changeEXPDate}
                                                        onFocus={this.changeFocus}

                                                    />
                                                    <span className="error">{this.state.errors["Expiry"]}</span>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="cvc">
                                                    <MaskedInput type='tel'
                                                        mask={CVC}
                                                        name='cvc'
                                                        placeholder='CVC'
                                                        required={true}
                                                        value={this.state.CVC}
                                                        onChange={this.changeCVC}
                                                        onFocus={this.changeFocus}

                                                    />
                                                    <span className="error">{this.state.errors["CVC"]}</span>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </BottomBox>
                                </Inputs>
                                <ButtonGroup className="me-2">
                                    <Button variant="primary"
                                        type="submit"
                                        onClick={() => this.createClick()}>
                                        Submit
                                    </Button>
                                </ButtonGroup>
                                <ButtonGroup className="me-2">
                                    <Button
                                        variant="primary"
                                        type="button"
                                        onClick={() => this.resetClick()}>
                                        Clear
                                    </Button>
                                </ButtonGroup>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}


