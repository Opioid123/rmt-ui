import React from 'react';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {connect} from 'react-redux';
import initMappingData from '../../redux/actions/initMappingData';
import addResource from '../../redux/actions/addResource';
import addError from '../../redux/actions/addError';
import clearErrors from '../../redux/actions/clearErrors';
import updateResource from '../../redux/actions/updateResource';
import deleteResource from '../../redux/actions/deleteResource';
import selectResource from '../../redux/actions/selectResource';
import selectLdap from '../../redux/actions/selectLdap';
import selectRole from '../../redux/actions/selectRole';
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
import Grid from '@material-ui/core/Grid';
import InlineCss from "react-inline-css";
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Divider from '@material-ui/core/Divider';

class MappingMaintenanceComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {resource:{ldap:  '', name:'', id:'', role:''}, error:{isError: false, errorMessages:[]}};
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.onResourceSelect = this.onResourceSelect.bind(this);
        this.onLdapChange = this.onLdapChange.bind(this);
        this.onLdapChange1 = this.onLdapChange1.bind(this);
        this.addNew = this.addNew.bind(this);
        this.handleExpandClick = this.handleExpandClick.bind(this);
        this.props.dispatch(initMappingData())
    }
    
    resource = {};
    errorMessages = [];
    error = false;

    save() {debugger;
        this.checkResource(this.props.ldapResource);
        if (this.props.isError || this.error) return;
        
        if(this.state.dialogType === 'add')
            this.props.dispatch(addResource(this.resource));
        else
            this.props.dispatch(updateResource(this.props.ldapResource));

        this.setState({displayDialog: false})
        //this.setState({resources:this.props.resources, selectedResource:null, resource: null, displayDialog:false});
    }

    delete() {
        this.setState({displayDialog: false});
        this.props.dispatch(deleteResource(this.props.selectedResource));
    }

    handleExpandClick(i){
        let expandState = {}
        this.props.notificationList.forEach((x, index)=>{ if (i !== index) expandState['expand'+ index] = false;})
        
        expandState['expand'+ i] = !this.state['expand' + i]
        expandState['marginTop' + i] = expandState['expand'+ i] ? 20: 0;

        this.setState({...expandState})
    }
    onResourceSelect(e){
        this.props.dispatch(clearErrors());
        this.resource = this.props.selectedResource;
        
        this.newResource = false;
        
        this.setState({
            error:{isError: false, errorMessages:[]},
            displayDialog:true,
            expand: false,
            dialogType: 'update',
            resource: Object.assign({}, {...e.data, title: 'Assign DFM and SOMA'}) ,
            ...e.data
        });
        this.props.dispatch(selectResource({...e.data, title: 'Assign DFM and SOMA'}));
    }

    updateProperty(property, target) {debugger;
         this.resource = this.state.resource;
         if (property === 'admin'){
            this.resource[property] = target.value === 'true'? true: false
            this.props.dispatch(updateResource(this.resource));
         }
         else{
            this.resource[property] = target.value;
            //this.props.dispatch(selectRole({...this.props.ldapResource, role: target.value}))
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
            resource: {ldap:'', name: '', id: '', role: '', title: 'Add Mapping'},
            displayDialog: true,
            error:{isError: false, errorMessages:[]},
            dialogType: 'add'
        });
        this.props.dispatch(selectLdap({}));
    }

    checkResource(resource){
        this.error = false;
        this.props.dispatch(clearErrors());
        
        if (this.checkEmpty(resource.dfmldap)){
            this.error = true;
            this.props.dispatch(addError('Please select dfm ldap'));
        }

        if (this.checkEmpty(resource.somaldap)){
            this.error = true;
            this.props.dispatch(addError('Please enter soma ldap'));
        }
    }

    checkEmpty(fieldValue){
        return !!fieldValue && fieldValue !== '' ? false : true;
    }

    onLdapChange = (event, values) => {
        this.props.dispatch(selectLdap({...this.props.resourceList.filter(x => x.dfmldap === values)[0], role:''}));
      }
    
    onLdapChange1 = (event, values) => {
    this.props.dispatch(selectLdap({...this.props.resourceList.filter(x => x.somaldap === values)[0], role:''}));
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
                        this.props.notificationList.length > 0 ? 
                        (<IconButton style={{float:'right'}} aria-label="show 11 new notifications" 
                            onClick={this.onResourceSelect} color="inherit">
                            <Badge badgeContent={this.props.notificationList.length} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>) : ''
                    </div>;
        
        let collapseFooter = (
            <div className="ui-dialog-buttonpane p-clearfix">
                <Button style={{backgroundColor: '#F86402', color: 'white', fontWeight: 'bold', float:'right', mardinBottom: 30}} onClick={this.save}>Save</Button>
            </div>
            )
        let dialogFooter = (
            <div className="ui-dialog-buttonpane p-clearfix">
                <Button style={{backgroundColor: '#F86402', color: 'white', fontWeight: 'bold', float:'right'}} variant="contained" onClick={() => {this.setState({displayDialog: false})}}>Cancel</Button>
            </div>
            )

        
        let cols = [
            {field: 'deptnbr', header: 'Dept Nbr', frozen:true, width:'50px'},
            {field: 'deptname', header: 'Dept Name',frozen:true, width:'75px'},
            {field: 'subdeptnbr', header: 'SD Nbr', frozen:true, width:'50px'},
            {field: 'subdeptname', header: 'SD Name', frozen:true, width:'75px'},
            {field: 'classnbr', header: 'Class Nbr', frozen:true, width:'75px'},
            {field: 'classname', header: 'Class Name', frozen:true,width:'75px'},
            {field: 'subclassnbr', header: 'SC Nbr', frozen:true, width:'50px'},
            {field: 'subclassname', header: 'SC Name', frozen:true, width:'75px'},
            {field: 'subclasscombonbr', header: 'SCC Nbr', frozen:true, width:'50px'},
            {field: 'bsnsarea', header: 'BSNS Area', frozen:false, width:'200px'},
            {field: 'svp', header: 'SVP', frozen:false, width:'200px'},
            {field: 'gm', header: 'GM', frozen:false, width:'200px'},
            {field: 'dfm', header: 'DFM', frozen:false, width:'200px'},
            {field: 'soma', header: 'SOMA', frozen:false, width:'200px'},
            {field: 'dfmldap', header: 'DFM LDAP', frozen:false, width:'75px'},
            {field: 'somaldap', header: 'SOMA LDAP', frozen:false, width:'75px'},
            {field: 'OLAP', header: 'OLAP', frozen:false, width:'75px'},

        ];
        let dynamicColumns = cols.map((col,i) => {
            return <Column key={col.field} field={col.field} style={{width: col.width}} header={col.header} sortable={true} frozen={col.frozen} />;
        });

        return (
            <InlineCss stylesheet=" & .p-highlight {background-color: #F86402}">
            <div>
                <div>
                    {
                        this.props.isLoading? <ProgressSpinner style={{marginLeft: '45%'}}/> : 
                        <DataTable value={this.props.resourceList} paginator={true} rows={10}  header={header} 
                            selectionMode="single" selection={this.state.selectedResource} 
                             globalFilter={this.state.globalFilter} emptyMessage="No records found"
                            scrollHeight="400" scrollable={true} style={{ width: '1200px'}} 
                            frozenWidth="775px" unfrozenWidth="600px">
                            {dynamicColumns}
                        </DataTable>
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
                            this.props.notificationList.map((notification, i) => {
                                return (<div >
                                    <IconButton style={{color: '#F86402'}}><AssignmentIndIcon /></IconButton>Assign DFM and SOMA for class: <b>{notification.classname}</b> and subclass: <b>{notification.subclassname}</b>
                                    <IconButton onClick={() => {this.handleExpandClick(i)}} aria-expanded={this.state.expand} 
                                    aria-label="show more">
                                    <ExpandMoreIcon />
                                    </IconButton>
                                    <Collapse in={this.state['expand' + i]} timeout="auto" unmountOnExit>
                                    <div style={{marginLeft:50}}>
                                    <div style={{ width: 300 }}>
                                        <Autocomplete
                                            id="autoComplete"
                                            freeSolo
                                            disableClearable
                                            options={this.props.resourceList.map(option => option.dfmldap)}
                                            onChange={this.onLdapChange}
                                            defaultValue={this.props.ldapResource.dfmldap}
                                            renderInput={params => (
                                            <TextField {...params}   label="DFM LDAP"  margin="dense" variant="outlined" fullWidth InputProps={{ ...params.InputProps, type: 'search' }} />
                                            )}
                                        />
                                    </div>
                                        {/* <TextField  margin="dense" id="dfmldap" label="DFM LDAP" 
                                            defaultValue={this.state.resource.dfmldap} variant="outlined" fullWidth 
                                            onChange={(e) => {this.updateProperty('dfmldap', e.target)}} /> */}
                                        <TextField disabled margin="dense" id="dfm" label="DFM" 
                                            defaultValue={this.props.ldapResource.dfm} variant="outlined" fullWidth 
                                         />
                                        {/* <Divider style={{color:'#F86402', marginTop: 25, marginBottom: 25}} /> */}
                                        <div style={{ width: 300 }}>
                                        <Autocomplete
                                            id="autoComplete"
                                            freeSolo
                                            disableClearable
                                            options={this.props.resourceList.map(option => option.somaldap)}
                                            onChange={this.onLdapChange1}
                                            defaultValue={this.props.ldapResource.somaldap}
                                            renderInput={params => (
                                            <TextField {...params}   label="SOMA LDAP"  margin="dense" variant="outlined" fullWidth InputProps={{ ...params.InputProps, type: 'search' }} />
                                            )}
                                        />
                                    </div>
                                        {/* <TextField  margin="dense" id="somaldAp" label="SOMA LDAP" 
                                            defaultValue={this.state.resource.somaldp} variant="outlined" fullWidth 
                                            onChange={(e) => {this.updateProperty('somaldAp', e.target)}} /> */}
                                        <TextField disabled margin="dense" id="soma" label="SOMA" 
                                            defaultValue={this.props.ldapResource.soma} variant="outlined" fullWidth 
                                        />
                                    </div>
                                    {collapseFooter}
                                    </Collapse>
                                    {this.props.notificationList.length > i + 1? <Divider style={{color:'#F86402', marginTop:this.state['marginTop' + i], paddingTop: 5, paddingBottom: 5}} /> :''}
                                </div>
                                )

                            })
                            
                            
                          
                        }
                        {
                        }
                        
                        
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
export default connect(state => getResourceListing(state))(MappingMaintenanceComponent);
