import React from 'react';
import NonAdminResource from './NonAdminResourceComponent'
import AdminResource from './AdminResourceComponent'
import ComponentView from './AdminResourceComponent'

//import Resource from './ResourceComponent'
import MappingMaintenance from './MappingMaintenanceComponent'


class ContentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {"admin": true };
    }
    render() {
        return (
            <div>
                {this.props.selectedItem === 'Mapping Maintenance'? <MappingMaintenance/>: 
                this.props.selectedItem === 'Admin Maintenance' ? <ComponentView/> : <NonAdminResource/>}
            </div>
        );
    }
}
export default ContentComponent
