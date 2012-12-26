Ext.define('AM.controller.Employees', {
  extend: 'Ext.app.Controller',

  stores: ['Employees'],
  models: ['Employee'],

  views: [
    'employee.List',
    'employee.Form'// ,
    // 	'Cardpanel',  
    // 	'user.DepartmentManager',
    // 	'user.EmployeeManager'
  ],

  	refs: [
		{
			ref: 'list',
			selector: 'employeelist'
		} 
	],

  init: function() {
    this.control({
      'employeelist': {
        itemdblclick: this.editUser,
        selectionchange: this.selectionChange
      },
      'employeeform button[action=save]': {
        click: this.updateUser
      },
      'employeelist button[action=addUser]': {
        click: this.addUser
      },
      'employeelist button[action=editUser]': {
        click: this.editUser
      },
      'employeelist button[action=deleteUser]': {
        click: this.deleteUser
      }// ,
      // 
      // 	  	'cardpanel button[action=changetoolbar]' : {
      // 				click		: this.changeToolbar 
      // 			}
		
    });
  },
 

  addUser: function() {
		console.log("Gonna add user");
    var view = Ext.widget('employeeform');
// what is Ext.widget? 
// is that creating a new instance window? 
// Convenient shorthand to create a widget by its xtype or a config object. S

// If a component instance is passed, it is simply returned. => so, if it is existing, will just be returned
    view.show();
  },

  editUser: function() {
		// console.log("event listener editUser");
    var record = this.getList().getSelectedUser();
		if( record ) {
			console.log("The name is " + record.get("name"));
		}
    var view = Ext.widget('employeeform');
		if( view ) {
			console.log("The view is not nil");
		}
    view.down('form').loadRecord(record);
// view.show();
  },

  updateUser: function(button) {
		console.log("YEaaah baby, we are in the update user");
    var win = button.up('window');
    var form = win.down('form');

	var store = this.getStore( 'Employees' );
	
    // var store = this.getEmployeesStore();
    var record = form.getRecord();
    var values = form.getValues();

	 	//  loadRecord( model ) => FORM => getRecord() => give back the model
		// it means: if it is a new form, getRecord() will produce nil 
		// if an edit/update form, getRecord() will not be nil 
		
		//form.getValues is simply the form's field content 
		// format : name : value 
		
		// how can we check whether a model is valid?
		
		// form.isValid() will only check the form's validation. not the model's validation
		// form validation	: allowBlank?
		
		// var newObject = new AM.model.User( {} );
		// var errors = newObject.validate(); => will be validated against model's validation 
		// newObject.isValid() => run through the newObject.validate().. then, will use the errors.isValid()
		// newObject.join(AM.model.User);
		// newObject.save  => use the proxy @ model.. hit the server
		// how can we propagate the changes to the grid?
		// store.sync() 
		
		// TASK: separate between CREATE or UPDATE
		
		if( record ){
			record.beginEdit(); 
			// if there is record present in the form, this must be an update
			record.set( values );
			// just by setting the values, the gridPanel is changed!!! FUCK!
			
			if( record.isValid() ) {
				// record.save(); 
				record.endEdit(); 
				store.sync(); 
				
				win.close(); 
			}else{ 
				// record is not valid 
				var errors = record.validate(); 
				form.getForm().markInvalid(errors);
				console.log("The record isn ot valid. NO UPDATE");
				record.cancelEdit();
			}
		}else{
			//  no record at all  => gonna create the new one 
			console.log("NO USER. GONNA CREATE");
			
			Ext.create( 'AM.model.Employee'  ,  values );
			// var newObject = new AM.model.Employee( values ) ;
			if( newObject.isValid() ){
				console.log("The new object is valid");
				store.add( newObject);
				console.log("GONNNAA CALL THE SYNC"); 
				
				store.sync();
				this.getList().query('pagingtoolbar')[0].doRefresh();
			 
				win.close();
				
			}else{
				console.log("The new object is not valid ");
			}
			
			var errors = newObject.validate();
			form.getForm().markInvalid(errors);
		} 
  },

  deleteUser: function() {
    var record = this.getList().getSelectedUser();

    if (record) {
      var store = this.getEmployeesStore();
      store.remove(record);
      store.sync();
// to do refresh programmatically
		this.getList().query('pagingtoolbar')[0].doRefresh();
    }

  },

  selectionChange: function(selectionModel, selections) {
    var grid = this.getList();

    if (selections.length > 0) {
      grid.enableRecordButtons();
    } else {
      grid.disableRecordButtons();
    }
  }

});
