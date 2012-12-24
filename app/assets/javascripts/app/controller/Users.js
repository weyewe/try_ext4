Ext.define('AM.controller.Users', {
  extend: 'Ext.app.Controller',

  stores: ['Users'],
  models: ['User'],

  views: [
    'user.List',
    'user.Form'
  ],

  refs: [{
    ref: 'list',
    selector: 'userlist'
  }],

  init: function() {
    this.control({
      'userlist': {
        itemdblclick: this.editUser,
        selectionchange: this.selectionChange
      },
      'userform button[action=save]': {
        click: this.updateUser
      },
      'button[action=addUser]': {
        click: this.addUser
      },
      'button[action=editUser]': {
        click: this.editUser
      },
      'button[action=deleteUser]': {
        click: this.deleteUser
      }
    });
  },

  addUser: function() {
    var view = Ext.widget('userform');
    view.show();
  },

  editUser: function() {
		console.log("event listener editUser");
    var record = this.getList().getSelectedUser();
		if( record ) {
			console.log("The name is " + record.get("first_name"));
		}
    var view = Ext.widget('userform');
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

    var store = this.getUsersStore();
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
		record.beginEdit(); 
		if( record ){
			// if there is record present in the form, this must be an update
			record.set( values );
			// just by setting the values, the gridPanel is changed!!! FUCK!
			
			if( record.isValid() ) {
				// record.save(); 
				record.endEdit(); 
				store.sync(); 
				
				win.close(); 
			}else{
				
				var errors = record.validate(); 
				form.getForm().markInvalid(errors);
				console.log("The record isn ot valid. NO UPDATE");
				record.cancelEdit();
			}
			
		}
		
		
				// 
				// if(record){
				// 	var r = Ext.create("AM.model.User", values) ;
				// 	
				// 	
				// 	if( errors.isValid() ){
				// 		record.set(values) ; // update the content of record 
				// 	}
				// 	
				// 	// this record is managed by store.
				// 	// store.sync() will synchronize the changes in the client to the server 
				// 	store.sync();
				// 	win.close();
				// 	Ext.MessageBox.alert("Create User Success", "User #{record.first_name} is created");
				// 	
				// 	return; 
				// }else{
				// 	// there is no record in the form
				// 	// banzai.. most likely, it is new shite creation 
				// 	
				// 	store.add(values);
				// 	store.sync({
				// 		success : function(){
				// 			console.log("Successfully saving the store");
				// 		},
				// 		failure	: function(){
				// 			console.log(" fail to create new record");
				// 		}
				// 	});
				// }

			//     if (record) { // perform update
			//       var r = Ext.create('AM.model.User', values);
			// 
			//       var errors = r.validate();
			//       if (errors.isValid()) {
			//         record.set(values);
			// 
			//         store.sync();
			//         win.close();
			//       } else {
			//         console.log(errors);
			//         form.getForm().markInvalid(errors);
			//       }
			//     } else { // perform create
			// //       store.add(values);
			// // 
			// //       store.sync({
			// // 	success: function(){
			// // 		console.log("I am successful");
			// // 	}, 
			// // 	failure: function(){
			// // 		console.log("i am not successful");
			// // 	}
			// // 	
			// // });
			// 
			// var r = Ext.create('AM.model.User', values);
			// var errors = r.validate();
			// 
			// if( errors.isValid()){
			// 	console.log("in the creating. checking is valid == true ");
			// 	Ext.MessageBox.alert("IsValid", "Gonna save to the server");
			// }else{
			// 	Ext.MessageBox.alert("NOT Valid", "NOT Gonna save to the server. Not gonna append");
			// 	console.log(" in the creating. checking is valid == false ");
			// 	form.getForm().markInvalid(errors);
			// }
			//       // win.close();
			//     }

  },

  deleteUser: function() {
    var record = this.getList().getSelectedUser();

    if (record) {
      var store = this.getUsersStore();
      store.remove(record);
      store.sync();
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
