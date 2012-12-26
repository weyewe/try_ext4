Ext.define('AM.view.customer.Form', {
	extend		: 'AM.view.util.CrudForm', 
	alias		: 'widget.customerform',
	
	layout: 'fit',
	width	: 500,
  	autoShow: true,   

  	initComponent: function() {
		this.title	= 'Willy special experiment'; 
    	this.items = [
			{
      			xtype: 'form',
				msgTarget	: 'side',
				
      			items: [
					{
        				xtype: 'hidden',
        				name : 'id',
        				fieldLabel: 'id'
      				}, 
					{
        				xtype: 'textfield',
        				name : 'name',
        				fieldLabel: 'Name'
      				} 
				]
    		}
		];
 
    	this.callParent(arguments);
  	}
});

