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
    var win = button.up('window');
    var form = win.down('form');

    var store = this.getUsersStore();
    var record = form.getRecord();
    var values = form.getValues();

    if (record) { // perform update
      var r = Ext.create('AM.model.User', values);

      var errors = r.validate();
      if (errors.isValid()) {
        record.set(values);

        store.sync();
        win.close();
      } else {
        console.log(errors);
        form.getForm().markInvalid(errors);
      }
    } else { // perform create
      store.add(values);

      store.sync();
			// store.sort('id', 'DESC'); 
      win.close();
    }

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
