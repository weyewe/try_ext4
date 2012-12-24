Ext.define('AM.view.user.Form', {
  extend: 'Ext.window.Window',
  alias : 'widget.userform',

  title : 'Add / Edit User',
  layout: 'fit',
	width	: 500,
  autoShow: true,  // does it need to be called?
// win.show() 
// if autoShow == true.. on instantiation, will automatically be called 
	
  initComponent: function() {
    this.items = [{
      xtype: 'form',
			msgTarget	: 'side',
      items: [{
        xtype: 'hidden',
        name : 'id',
        fieldLabel: 'id'
      }, {
        xtype: 'textfield',
        name : 'first_name',
        fieldLabel: 'First Name'
      }, {
        xtype: 'textfield',
        name : 'last_name',
        fieldLabel: 'Last Name'
      }, {
        xtype: 'textfield',
        name : 'email',
        fieldLabel: 'Email'
      }]
    }];

    this.buttons = [{
      text: 'Save',
      action: 'save'
    }, {
      text: 'Cancel',
      scope: this,
      handler: this.close
    }];

    this.callParent(arguments);
  }
});

