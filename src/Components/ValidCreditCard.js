import React, { Component } from 'react';
import { variables } from '../Data/Variables';

export class ValidCreditCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cards: [],
            Id: 0,
            Name: "",
            Number: "",
            Expiry: "",
            CVC: "",
            focus: ""
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

    addClick() {
        this.setState({
            Id: 0,
            Name: "",
            Number: "",
            Expiry: "",
            CVC: "",
            focus: ""
        });
    }

    editClick(cd) {
        this.setState({
            Id: cd.Id,
            Name: cd.Name,
            Number: cd.Number,
            Expiry: cd.Expiry,
            CVC: cd.cvc
        });
    }

    updateClick() {
        fetch(variables.API_URL + 'cards', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Id: this.state.Id,
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
            }, (error) => {
                alert('Failed');
            })
    }

    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch(variables.API_URL + 'cards/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.refreshList();
                }, (error) => {
                    alert('Failed');
                })
        }
    }
    render() {
        const {
            cards,
        } = this.state;

        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                Card ID
                            </th>
                            <th>
                                Card Name
                            </th>
                            <th>
                                Card Number
                            </th>
                            <th>
                                Expiry Date
                            </th>
                            <th>
                                CVC
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cards.map(cd =>
                            <tr key={cd.Id}>
                                <td>{cd.Id}</td>
                                <td>{cd.Name}</td>
                                <td>{cd.Number}</td>
                                <td>{cd.Expiry}</td>
                                <td>{cd.CVC}</td>
                                <td>
                                    <button type="button" className='btn btn-light mr-1'
                                        onClick={() => this.deleteClick(cd.Id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>)}
                    </tbody>
                </table>
            </div>

        )
    }
}