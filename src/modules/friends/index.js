import React, { Component } from 'react';
import classes from './styles.module.css';
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap'
import { Table, Avatar, TableColumnText } from '../../components';
import BackArrow from '../../assets/left-arrow.png'
import { getUser, getFriends, getFriendsOfFriends } from '../../requests'

export default class Friends extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            totalCount: 0,
            size: 4,
            pages: 0,
            loading: false,
            user: null
        }
    }

    handleUser = (userId) => {
        getUser(userId)
            .then((response) => {
                this.setState({
                    user: response
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    handleFriends = (userId, page, size) => {
        getFriends(userId, page, size)
            .then((response) => {
                this.setState({
                    tableData: response["rows"],
                    totalCount: response["count"],
                    size: size,
                    pages: (Math.ceil(response["count"] / size)),
                    loading: false
                })
            })
            .catch((error) => {
                console.log(error)
            });
        this.setState({ loading: true })
    }

    handleFriendsOfFriends = (userId, page, size) => {
        getFriendsOfFriends(userId, page, size)
            .then((response) => {
                this.setState({
                    tableData: response["rows"],
                    totalCount: response["count"],
                    size: size,
                    pages: (Math.ceil(response["count"] / size)),
                    loading: false
                })
            })
            .catch((error) => {
                console.log(error)
            });
        this.setState({ loading: true })
    }

    componentDidMount() {
        this.handleUser(this.props.match.params.userId)
    }

    loadTableData = (page, size) => {
        let userId = this.props.match.params.userId
        let type = this.props.match.params.type
        if (type === "friends") {
            this.handleFriends(userId, page, size)
        }
        else {
            this.handleFriendsOfFriends(userId, page, size)
        }
    };

    users_table_columns = () => {
        return [
            {
                Header: <span>Picture</span>,
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
            }
        ]
    }

    getSectionHeading = () => {
        let heading = ""
        let type = this.props.match.params.type
        switch (type) {
            case "friends":
                heading = "Friends"
                break;
            case "friends-of-friends":
                heading = " Friends of Friends"
                break;
            default:
                heading = "Friends"
                break;
        }
        return <div className={classes.Heading}>User {heading}</div>
    }

    getUserBlock = () => {
        let name = ""
        if (this.state.user) {
            name = this.state.user["firstName"] + " " + this.state.user["lastName"]
        }
        return <div className={classes.SubHeading}>User Selected :  {name}</div>
    }

    render() {
        return (
            <Container fluid style={{ padding: 20 }}>
                <Row>
                    <Col md={12}>
                        <div className={classes.SubHeader}>
                            <div className={classes.BackBtn}>
                                <Link to={"/users"}><img src={BackArrow}/></Link>
                            </div>
                            <div>
                                <div style={{ fontSize: 25, divor: "#242934" }}>
                                    {/* Get User Selected Name*/}
                                    {this.getUserBlock()}
                                </div>
                                <div style={{ fontSize: 20, color: "#242934" }}>
                                    {/* Get section Type - Friends | Friends Of Friends*/}
                                    {this.getSectionHeading()}
                                </div>
                            </div>
                        </div>
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