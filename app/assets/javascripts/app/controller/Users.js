Ext.define('AM.controller.Users', {
  extend: 'Ext.app.Controller',

  stores: ['Users'],
  models: ['User'],

  views: [
    'user.List',
    'user.Form'// ,
    // 	'Cardpanel',  
    // 	'user.DepartmentManager',
    // 	'user.EmployeeManager'
  ],

  refs: [
		{
    	ref: 'list',
    	selector: 'userlist'
  	}// ,
  	// 		{
  	// 			ref	: 'cardPanel',
  	// 			selector	: 'cardpanel'
  	// 		}
	],

  init: function() {
		console.log("INit the users controller");
    this.control({
      'userlist': {
        itemdblclick: this.editUser,
        selectionchange: this.selectionChange
      },
      'userform button[action=save]': {
        click: this.updateUser
      },
      'userlist button[action=addUser]': {
        click: this.addUser
      },
      'userlist button[action=editUser]': {
        click: this.editUser
      },
      'userlist button[action=deleteUser]': {
        click: this.deleteUser
      }// ,
      // 
      // 	  	'cardpanel button[action=changetoolbar]' : {
      // 				click		: this.changeToolbar 
      // 			}
		
    });
  },

	// changeToolbar		: function(btn , event, eOpts){
	//  
	// 	var buttons = this.getCardPanel().query('button[action=changetoolbar]');
	// 	Ext.each( buttons, function( new_btn ) {
	// 		if( new_btn.itemType !== btn.itemType  && new_btn.pressed == true ){
	// 			new_btn.toggle();
	// 		} 
	// 	});
	// 	 
	// 	// console.log("The button's itemType (xtype) reference: " + btn.itemType ) ;
	// 	// current Active Item index 
	// 	var cardPanel = this.getCardPanel(); 
	// 	
	// 	var cardLayout = cardPanel.getLayout(); 
	// 	var currentActiveItem = cardLayout.activeItem;
	// 	var currentActiveItemIndex = cardPanel.items.indexOf(currentActiveItem);
	// 	// console.log("current active item index: " + currentActiveItemIndex );
	// 	
	// 	// new Active Item Index
	// 	var xtype    = btn.itemType;
	// 	// console.log("SEARCHING FOR xtype: " + xtype );
	//     var newActiveItem   = cardPanel.query(xtype)[0]; 
	// 	var newActiveItemIndex = cardPanel.items.indexOf(newActiveItem);
	// 	// console.log("new active item index: " + newActiveItemIndex );
	// 	
	// 	// if no such item == index == -1 
	// 	if( newActiveItemIndex !== currentActiveItemIndex ) {
	// 		// console.log("Gonna switch card from " +currentActiveItemIndex + " TO " +  newActiveItemIndex);
	// 		
	// 		cardLayout.setActiveItem( newActiveItemIndex );
	// 		
	// 		// if( newActiveItem.cleanSlate ) {
	// 		// 	newActiveItem.cleanSlate(); 
	// 		// }
	// 	}else{
	// 		btn.pressed = true ; 
	// 	}
	// 	
	// 	// this.getCardPanel().getLayout().setActiveItem(0); 
	// },

  addUser: function() {
		console.log("Gonna add user");
    var view = Ext.widget('userform');
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
			var newObject = new AM.model.User( values ) ;
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
      var store = this.getUsersStore();
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
