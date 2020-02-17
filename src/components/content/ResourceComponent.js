import React from 'react';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {connect} from 'react-redux';
import initResources from '../../redux/actions/initResources';
import {InputText} from 'primereact/inputtext';
import {ProgressSpinner} from 'primereact/progressspinner';
import getResourceListing from '../../redux/selectors/resource'

class ResourceComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          resources: []
        };
        this.props.dispatch(initResources())
    }

    render() {
        let cols = [
            {field: 'ldap', header: 'LDAP'},
            {field: 'name', header: 'Name'},
            {field: 'id', header: 'Id'},
            {field: 'role', header: 'Role'}
        ];
        var header = <div style={{'textAlign':'left'}}>
                        <i className="pi pi-search" style={{margin:'4px 4px 0 0'}}></i>
                        <InputText type="search" onInput={(e) => this.setState({globalFilter: e.target.value})} placeholder="Global Search" size="50"/>
                    </div>;
    
        let dynamicColumns = cols.map((col,i) => {
            return <Column key={col.field} field={col.field} header={col.header} sortable={true} filter={true} />;
        });
        return (
            <div>
                {
                    this.props.isLoading? <ProgressSpinner/> : 
                    <DataTable value={this.props.resourceList} paginator={true} rows={10} header={header} globalFilter={this.state.globalFilter} emptyMessage="No records found">
                        {dynamicColumns}
                    </DataTable>
                }
            </div>
        );
    }
}

export default connect(state => getResourceListing(state))(ResourceComponent);
