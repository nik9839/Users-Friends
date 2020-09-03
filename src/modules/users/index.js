import React, { Component } from 'react';
import classes from './styles.module.css';
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Table, Avatar, TableColumnText } from '../../components';
import { getUsers } from '../../requests'

export default class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            totalCount: 0,
            size: 4,
            pages: 0,
            loading: false
        }
    }

    handleUsers = (page, size) => {
        this.setState({ loading: true })
        getUsers(page, size)
            .then(response => {
                this.setState({
                    tableData: response["rows"],
                    totalCount: response["count"],
                    size: size,
                    pages: (Math.ceil(response["count"] / size)),
                    loading: false
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    loadTableData = (page, size) => {
        this.handleUsers(page, size)
    };

    users_table_columns = () => {
        return [
            {
                Header: <span>Avatar</span>,
                accessor: "avatar",
                Cell: row => (<Avatar url={row.value} />),
                maxWidth: 100,
                sortable: false
            },
            {
                Header: <span>First Name</span>,
                accessor: "firstName",
                sortable: false,
                Cell: row => <TableColumnText value={row.value} />
            },
            {
                Header: <span>Last Name</span>,
                accessor: "lastName",
                sortable: false,
                Cell: row => <TableColumnText value={row.value} />
            },
            {
                Header: <span>Friends</span>,
                accessor: "id",
                sortable: false,
                Cell: row => (
                    <React.Fragment>
                        {/* Link to friends route*/}
                        <Link to={"/user/" + row.value + "/friends"}>
                            <Button variant="outline-primary" size="sm" style={{ margin: 5 }}>
                                Friends
                            </Button>
                        </Link>
                        {/* Link to friends of friends route*/}
                        <Link to={"/user/" + row.value + "/friends-of-friends"}>
                            <Button variant="outline-success" size="sm">
                                Friends 0f Friends
                            </Button>
                        </Link>
                    </React.Fragment>
                )
            }
        ]
    }

    render() {
        return (
            <Container fluid style={{ padding: 20 }}>
                <Row>
                    <Col md={12} style={{ fontSize: 32 }}>
                        <div className={classes.Heading}>Users</div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <div className={classes.SubContainer}>
                            <Table
                                tableData={this.state.tableData}
                                loading={this.state.loading}
                                pages={this.state.pages}
                                size={this.state.size}
                                columns={this.users_table_columns()}
                                loadTableData={this.loadTableData}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}