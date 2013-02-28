Ext.define('AM.controller.Customers', {
  extend: 'Ext.app.Controller',

  stores: ['Customers'],
  models: ['Customer'],

  views: [
    'customer.List',
    'customer.Form'// ,
    // 	'Cardpanel',  
    // 	'user.DepartmentManager',
    // 	'user.EmployeeManager'
  ],

  	refs: [
		{
			ref: 'list',
			selector: 'customerlist'
		} 
	],

  init: function() {
		console.log("INit the users controller");
    this.control({
      'customerlist': {
        itemdblclick: this.editUser,
        selectionchange: this.selectionChange
      },
      'customerform button[action=save]': {
        click: this.updateUser
      },
      'customerlist button[action=addUser]': {
        click: this.addUser
      },
      'customerlist button[action=editUser]': {
        click: this.editUser
      },
      'customerlist button[action=deleteUser]': {
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
    var view = Ext.widget('customerform');
// what is Ext.widget? 
// is that creating a new instance window? 
// Convenient shorthand to create a widget by its xtype or a config object. S

// If a component instance is passed, it is simply returned. => so, if it is existing, will just be returned
    view.show();
  },

  editUser: function() {
		console.log("event listener editUser");
    var record = this.getList().getSelectedUser();
		if( record ) {
			console.log("The name is " + record.get("name"));
		}
    var view = Ext.widget('customerform');
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

    var store = this.getCustomersStore();
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
			record.set( values );
			 
			record.save({
				success : function(record){
					console.log("UPDATE is successful");
					//  since the grid is backed by store, if store changes, it will be updated
					store.load();
					win.close();
				},
				failure : function(record,op ){
					console.log("UPDATE is a failure");
					var message  = op.request.scope.reader.jsonData["message"];
					var errors = message['errors'];
					form.getForm().markInvalid(errors);
				}
			});
				
			 
		}else{
			//  no record at all  => gonna create the new one 
			console.log("NO USER. GONNA CREATE");
			var me  = this; 
			var newObject = new AM.model.Customer( values ) ;
			
			// learnt from here
			// http://www.sencha.com/forum/showthread.php?137580-ExtJS-4-Sync-and-success-failure-processing
			newObject.save({
				success: function(record){
					console.log("This is successful");
					//  since the grid is backed by store, if store changes, it will be updated
					store.load();
					win.close();
				},
				failure: function( record, op){
					console.log("This is a failure");
					var message  = op.request.scope.reader.jsonData["message"];
					var errors = message['errors'];
					form.getForm().markInvalid(errors);
				}
			});
		} 
  },

  deleteUser: function() {
    var record = this.getList().getSelectedUser();

    if (record) {
      var store = this.getCustomersStore();
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
