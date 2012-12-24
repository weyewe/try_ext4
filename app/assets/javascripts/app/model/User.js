Ext.define('AM.model.User', {
  extend: 'Ext.data.Model',
  fields: [
    { name: 'id', type: 'int' },
    { name: 'first_name', type: 'string' },
    { name: 'last_name', type: 'string' },
    { name: 'email', type: 'string' }
  ],
  validations: [
    { type: 'presence', field: 'first_name' },
    { type: 'presence', field: 'last_name' },
    { type: 'presence', field: 'email' }
  ],

  idProperty: 'id' 
	
  
});
