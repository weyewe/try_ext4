Ext.define('AM.controller.BaseCrud', {
  extend: 'Ext.app.Controller',

/*
	AM.controller.BaseCrud makes live a breeze for you guys that 
	wants to create master data: typical standard CRUD operation 
	
	Steps:
	1. your controller should extends AM.controller.BaseCrud
	2. specify these properties to your controller. Over here, your REST is User... 
	 	stores	: ['Users'],
		models	: ["User"],
		views	: [
			'user.List',
			'user.Form'
		],
		
		refs	: [
			{
				ref	: 'list',
				selector	: 'userlist'
			}
		],
		
		formSelector	: 'userform',
		listSelector	: 'userlist',
		backingStore	: 'Users',
		backingModel	: 'User'
		
	3. create The list 
		It must Extends util.CrudList.js  >> ensure you have the correct alias 
		
		alias		: 'widget.objectlist'
		store		: 'Objects'
		
		
	4. Create the Form
		It must extends util.CrudForm.js >> ensure that you have correct alias 
		
		objectform
		
		set title
		set items ( the fieds ) 
*/
  // 
  // stores: ['Users'],
  // models: ['User'],

	// views: [
	// 	'object.List',
	// 	'object.Form' 
	// ],

	// refs: [
	// 	{
	// 		ref: 'list',
	// 		selector: 'objectlist'
	// 	} 
	// ],
	
	formSelector	: 'objectform',
	listSelector	: 'objectlist',
	backingStore	: 'Objects',
	backingModel	: 'Object',
	


	init: function() {
		this.control({
			this.formSelector	+ ' ' + 'button[action=save]': {
				click: this.updateObject
			},
			
			this.listSelector : {
				itemdblclick: this.editObject,
				selectionchange: this.selectionChange
			},
			this.listSelector	+ ' ' + 'button[action=addObject]': {
				click: this.addObject
			},
			this.listSelector	+ ' ' +  ' button[action=editObject]': {
				click: this.editObject
			},
			this.listSelector	+ ' ' + ' button[action=deleteObject]': {
				click: this.deleteObject
			} 

		});
	},
 

	addObject: function() {
		var view = Ext.widget( this.formSelector  ); 
		view.show();
	},

	editObject: function() {
		var record = this.getList().getSelectedObject(); 
		var view   = Ext.widget(	this.formSelector  ); 
		view.down('form').loadRecord(record);
	},

	updateObject: function(button) {
		var win = button.up('window');
		var form = win.down('form');

		// var store = this.getUsersStore();
		// var store = this.getStore("Objects");
		var store = this.getStore( this.backingStore  );
		var record = form.getRecord();
		var values = form.getValues(); 

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
				record.cancelEdit();
			}
		}else{
			//  no record at all  => gonna create the new one 
			// var newObject = new AM.model.User( values ) ;
			// var newObject = Ext.create('User', {
			//     name : 'Conan',
			//     age  : 24,
			//     phone: '555-555-5555'
			// });
			var newObject = Ext.create( this.backingModel  ,  values );
			if( newObject.isValid() ){
				store.add( newObject);

				store.sync();
				this.getList().query('pagingtoolbar')[0].doRefresh();

				win.close();

			}else{
			}

			var errors = newObject.validate();
			form.getForm().markInvalid(errors);
		} 
	},

	deleteObject: function() {
		var record = this.getList().getSelectedObject();

		if (record) {
			// var store = this.getUsersStore();
			var store = this.getStore( this.backingStore ) ;
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
