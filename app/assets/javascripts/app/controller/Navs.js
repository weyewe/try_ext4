Ext.define('AM.controller.Navs', {
  extend: 'Ext.app.Controller',

	views 		: [
		'Cardpanel',  
		'user.DepartmentManager',
		'user.EmployeeManager'
	],
	
	refs: [ 
		{
			ref	: 'cardPanel',
			selector	: 'cardpanel'
		}
	],
	
	init			: function(){
		console.log("init the NAVS controller");
		this.control({
			'cardpanel button[action=changetoolbar]' : {
				click		: this.changeToolbar 
			}
		});
		
	},
	
	
	changeToolbar		: function(btn , event, eOpts){
	 
		var buttons = this.getCardPanel().query('button[action=changetoolbar]');
		Ext.each( buttons, function( new_btn ) {
			if( new_btn.itemType !== btn.itemType  && new_btn.pressed == true ){
				new_btn.toggle();
			} 
		});
		 
		// console.log("The button's itemType (xtype) reference: " + btn.itemType ) ;
		// current Active Item index 
		var cardPanel = this.getCardPanel(); 
		
		var cardLayout = cardPanel.getLayout(); 
		var currentActiveItem = cardLayout.activeItem;
		var currentActiveItemIndex = cardPanel.items.indexOf(currentActiveItem);
		// console.log("current active item index: " + currentActiveItemIndex );
		
		// new Active Item Index
		var xtype    = btn.itemType;
		// console.log("SEARCHING FOR xtype: " + xtype );
    var newActiveItem   = cardPanel.query(xtype)[0]; 
		var newActiveItemIndex = cardPanel.items.indexOf(newActiveItem);
		// console.log("new active item index: " + newActiveItemIndex );
		
		// if no such item == index == -1 
		if( newActiveItemIndex !== currentActiveItemIndex ) {
			// console.log("Gonna switch card from " +currentActiveItemIndex + " TO " +  newActiveItemIndex);
			
			cardLayout.setActiveItem( newActiveItemIndex );
			
			// if( newActiveItem.cleanSlate ) {
			// 	newActiveItem.cleanSlate(); 
			// }
		}else{
			btn.pressed = true ; 
		}
		
		// this.getCardPanel().getLayout().setActiveItem(0); 
	}
});


/*

	Let's treat user as customer..  customer has many sales orders
	sales order has many sales items
	
	we have a database of customers. What we need now is database of 
	sales orders and sales items 
	
	table in the server doesn't necesarilly to be similar to the table @client 
	
*/