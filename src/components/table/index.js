import React from "react"
import ReactTable from "react-table";

import 'react-table/react-table.css'
import './table.css'


export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    fetchData = (state, instance) => {
        let page = state.page;
        let size = state.pageSize;
        this.props.loadTableData(page, size);
    }

    pageChange = (pageIndex) =>{
        this.props.loadTableData(pageIndex, this.props.size);
    }

    render() {
        return (
            < ReactTable
                manual /* Props need to specify server side pagination of data*/
                pages={this.props.pages}
                data={this.props.tableData}
                columns={this.props.columns}
                loading={this.props.loading}
                onFetchData={this.fetchData}
                defaultPageSize={5} /* Update to change Default page size*/
                pageSizeOptions={[5,10]} /* ADD more page size here if needed*/
                sortable={false}
                minRows={5}
                onPageChange={this.pageChange}
                showPageJump ={false} /* PAGE jump disabled, if enable implement pageSizeChange Method*/
            />
        )

    }

}