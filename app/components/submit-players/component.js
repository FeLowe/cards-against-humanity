import Ember from 'ember';

export default Ember.Component.extend({
  isShowingForm: false,
    actions: {

    showForm() {
      this.set('isShowingForm', true);
    },
    
  actions: {
    submitPlayers() {
      var params1 = {
        username: this.get('username1'),
        userage: this.get('userage1'),
        userpoints: 0,
      };
      var params2 = {
        username: "this.get('username2')",
        userage: "this.get('userage2')",
        userpoints: 0,
      };
      var params3 = {
        username: "this.get('username3')",
        userage: "this.get('userage3')",
        userpoints: 0,
      };
      var params4 = {
        username: "this.get('username4')",
        userage: "this.get('userage4')",
        userpoints: 0,
      };

      this.set('isShowingForm', false),
      this.sendAction('submitPlayers', params1, params2, params3, params4, this.get('answers'), this.get('questions'));
      this.set('username1', '');
      this.set('userage1', '');
      this.set('username2', '');
      this.set('userage2', '');
      this.set('username3', '');
      this.set('userage3', '');
      this.set('username4', '');
      this.set('userage4', '');
    },
  }
});
