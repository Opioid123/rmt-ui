import React from 'react';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {DataTable} from 'primereact/datatable';
//import {Button} from 'primereact/button';
//import {Dialog} from 'primereact/dialog';
//import {InputText} from 'primereact/inputtext';

import {Column} from 'primereact/column';
import {connect} from 'react-redux';
import initAdminResources from '../../redux/actions/initAdminResources';
import addResource from '../../redux/actions/addResource';
import addError from '../../redux/actions/addError';
import clearErrors from '../../redux/actions/clearErrors';
import updateResource from '../../redux/actions/updateResource';
import deleteResource from '../../redux/actions/deleteResource';
import selectResource from '../../redux/actions/selectResource';
import selectLdap from '../../redux/actions/selectLdap';
import selectRole from '../../redux/actions/selectLdap';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import {InputText} from 'primereact/inputtext';
import getResourceListing from '../../redux/selectors/resource'
import {ProgressSpinner} from 'primereact/progressspinner';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Autocomplete from '@material-ui/lab/Autocomplete';

import InlineCss from "react-inline-css";

class AdminResourceComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {resource:{ldap:  '', name:'', id:'', role:''}, error:{isError: false, errorMessages:[]}};
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.onResourceSelect = this.onResourceSelect.bind(this);
        //this.updateProperty = this.updateProperty.bind(this);
        this.onLdapChange = this.onLdapChange.bind(this);
        this.addNew = this.addNew.bind(this);
        this.props.dispatch(initAdminResources())
        console.log('suri @@@', this.props)
    }
    
    resource = {};
    errorMessages = [];
    error = false;

    save() {
        this.checkResource(this.props.ldapResource);
        debugger;
        if (this.props.isError || this.error) return;
        
        if(this.state.dialogType === 'add')
            this.props.dispatch(addResource({...this.props.ldapResource, role:'Admin'}));
        else
            this.props.dispatch(updateResource(this.resource));

        this.setState({displayDialog: false})
        //this.setState({resources:this.props.resources, selectedResource:null, resource: null, displayDialog:false});
    }

    delete() {
        this.setState({displayDialog: false});
        this.props.dispatch(deleteResource(this.props.selectedResource));
    }

    onResourceSelect(e){debugger
        this.props.dispatch(clearErrors());
        this.resource = this.props.selectedResource;
        
        this.newResource = false;
        
        this.setState({
            error:{isError: false, errorMessages:[]},
            displayDialog:true,
            dialogType: 'update',
            resource: Object.assign({}, {...e.data, title: 'Maintain User'}) ,
            ...e.data
        });
        this.props.dispatch(selectResource(e.data));
    }

    updateProperty(property, target) {debugger;
         this.resource = this.state.resource;
         if (property === 'admin'){
            this.resource[property] = target.value === 'true'? true: false
            this.props.dispatch(updateResource(this.resource));
         }
         else{
            this.resource[property] = target.value;
            this.props.dispatch(selectRole({...this.props.ldapResource, role: target.value}))
         }
         
         
        //this.setState({resource: this.resource});
        //target.autosfocus();
        //console.log('suri x', resource, property, value)
        //this.props.dispatch(updateResource(resource));
    }

    addNew() {
        this.props.dispatch(clearErrors());
        this.resource = {};
        this.newResource = true;
        this.setState({
            resource: {ldap:'', name: '', id: '', role: '', title: 'Add User'},
            displayDialog: true,
            error:{isError: false, errorMessages:[]},
            dialogType: 'add'
        });
        this.props.dispatch(selectLdap({}));
    }

    checkResource(resource){
        this.error = false;
        this.props.dispatch(clearErrors());
        if (this.checkEmpty(resource.ldap)){
            this.error = true;
            this.props.dispatch(addError('Please enter LDAP'));
        }

        if (this.checkEmpty(resource.name)){
            this.error = true;
            this.props.dispatch(addError('Please enter name'));
        }

        if (this.checkEmpty(resource.id)){
            this.error = true;
            this.props.dispatch(addError('please enter email'));
        }
    }

    checkEmpty(fieldValue){
        return !!fieldValue && fieldValue !== '' ? false : true;
    }

    onLdapChange = (event, values) => {
        // this.setState({
        //   ldap: values
        // }, () => {
        //   // This will output an array of objects
        //   // given by Autocompelte options property.
        //   console.log('suri',this.state.ldap, this.props.resourceList.filter(x => x.ldap === this.state.ldap)[0]);
          
        //   this.setState({
        //     resource: {...this.state.resource, 
        //         ldap: this.props.resourceList.filter(x => x.ldap === this.state.ldap)[0].ldap,
        //         name: this.props.resourceList.filter(x => x.ldap === this.state.ldap)[0].name, 
        //         id: this.props.resourceList.filter(x => x.ldap === this.state.ldap)[0].id, title: 'Add User'},
        //     displayDialog: true,
        //     error:{isError: false, errorMessages:[]}
        // });
        //});
        this.props.dispatch(selectLdap({...this.props.resourceList.filter(x => x.ldap === values)[0], role:''}));
      }

    render() {
        
        const DialogContent = withStyles(theme => ({
            root: {
              padding: theme.spacing(2),
            },
          }))(MuiDialogContent);
          
          const DialogActions = withStyles(theme => ({
            root: {
              margin: 0,
              padding: theme.spacing(1),
            },
          }))(MuiDialogActions);

        //let header = <div className="p-clearfix" >Resource Administration</div>;
        var header = <div style={{'textAlign':'left'}}>
                        <i className="pi pi-search" style={{margin:'4px 4px 0 0'}}></i>
                        <InputText type="search" onInput={(e) => this.setState({globalFilter: e.target.value})} placeholder="Global Search" size="50"/>
                        <Button style={{float:'right', backgroundColor: '#F86402', color: 'white', fontWeight: 'bold'}} variant="contained" onClick={this.addNew} color="primary">Add Resource</Button>
                    </div>;
        
        let dialogFooter = this.state.dialogType === 'add' ? 
        (<div className="ui-dialog-buttonpane p-clearfix">
            <Button style={{backgroundColor: '#F86402', color: 'white', fontWeight: 'bold', marginRight:10}}  variant="contained" onClick={this.save}>Save</Button>
            <Button style={{backgroundColor: '#F86402', color: 'white', fontWeight: 'bold'}} variant="contained" onClick={() => {this.setState({displayDialog: false})}}>Cancel</Button>
        </div>):
        (<div className="ui-dialog-buttonpane p-clearfix">
            <Button style={{backgroundColor: '#F86402', color: 'white', fontWeight: 'bold', marginRight:10}} variant="contained" onClick={this.delete}>Delete</Button>
            <Button style={{backgroundColor: '#F86402', color: 'white', fontWeight: 'bold'}} variant="contained" onClick={() => {this.setState({displayDialog: false})}}>Cancel</Button>
        </div>)

        
        let cols = [
            {field: 'ldap', header: 'LDAP'},
            {field: 'name', header: 'Name'},
            {field: 'id', header: 'Email Id'},
            {field: 'role', header: 'Role'}
        ];
        let dynamicColumns = cols.map((col,i) => {
            return <Column key={col.field} field={col.field} header={col.header} sortable={true} />;
        });
        
        return (
            <InlineCss stylesheet=" & .p-highlight {background-color: #F86402}">
            <div>
                <div>
                    {
                        this.props.isLoading? <ProgressSpinner style={{marginLeft: '45%'}}/> : 
                        <div>
                        <DataTable  value={this.props.resourceList} paginator={true} rows={10}  header={header} 
                            selectionMode="single" selection={this.state.selectedResource} 
                            onSelectionChange={e => {this.setState({selectedResource: e.value});this.setState({displayDialog:true})}}
                            onRowSelect={this.onResourceSelect} globalFilter={this.state.globalFilter} emptyMessage="No records found">
                            {dynamicColumns}
                        </DataTable>
                        </div>
                    }
                </div>
                {/* <Dialog visible={this.state.displayDialog} style={{width: '300px'}} header="Resource Details" modal={true} footer="This is a test" onHide={() => this.setState({displayDialog: false})} */}
                <Dialog open={this.state.displayDialog}>
                    <DialogTitle id="customized-dialog-title">
                        {this.state.resource.title}
                    </DialogTitle>
                    <DialogContent dividers>
                        {
                            this.props.isError? <Alert severity="error">{this.props.errorList.join(', ')}</Alert>: ''
                        }
                        {
                            this.state.dialogType !== 'add' ? <TextField disabled required margin="dense" id="ldap" label="LDAP" defaultValue={this.state.resource.ldap} variant="outlined" fullWidth
                            onChange={(e) => {this.updateProperty('ldap', e.target)}} />:
                            <div style={{ width: 300 }}>
                            <Autocomplete
                                id="autoComplete"
                                freeSolo
                                disableClearable
                                options={this.props.resourceList.map(option => option.ldap)}
                                onChange={this.onLdapChange}
                                defaultValue={this.state.dialogType === 'add'? this.props.ldapResource.ldap: this.state.resource.ldap}
                                renderInput={params => (
                                <TextField {...params}   label="LDAP"  margin="dense" variant="outlined" fullWidth InputProps={{ ...params.InputProps, type: 'search' }} />
                                )}
                            />
                            
                            </div>
                        }
                        <TextField disabled  margin="dense" id="name" label="Name" 
                        defaultValue={this.state.dialogType === 'add'? this.props.ldapResource.name: this.state.resource.name} variant="outlined" fullWidth
                        onChange={(e) => {this.updateProperty('name', e.target)}} />
                        <TextField disabled  margin="dense" id="email" label="Email Id" 
                        defaultValue={this.state.dialogType === 'add'? this.props.ldapResource.id: this.state.resource.id} variant="outlined" fullWidth
                        onChange={(e) => {this.updateProperty('id', e.target)}} />
                        
                    </DialogContent>
                    <DialogActions>
                        {dialogFooter}
                    </DialogActions>
                </Dialog>
            </div>
            </InlineCss>
        );
    }
}
export default connect(state => getResourceListing(state))(AdminResourceComponent);


