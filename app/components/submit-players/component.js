import Ember from 'ember';

export default Ember.Component.extend({
  isShowingForm: false,
    actions: {

    showForm() {
      this.set('isShowingForm', true);
    },
    submitPlayers() {
      // var params1 = {
      //   username: this.get('username0'),
      //   userpoints: 0,
      // };
      // var params2 = {
      //   username: "this.get('username1')",
      //   userpoints: 0,
      // };
      // var params3 = {
      //   username: "this.get('username2')",
      //   userpoints: 0,
      // };
      // var params4 = {
      //   username: "this.get('username3')",
      //   userpoints: 0,
      // };
      var playerArray = this.get('players').toArray();
      for(var i = 0; i < 4; i++) {
        var newPlayer = playerArray[i];
        console.log(newPlayer);
        var userName = 'username' + i;
        newPlayer.set('username', this.get(userName));
        newPlayer.save();
      }
      this.set('isShowingForm', false);
      // this.sendAction('submitPlayers', params1, params2, params3, params4, this.get('answers'), this.get('questions'));
      // this.set('username1', '');
      // this.set('username2', '');
      // this.set('username3', '');
      // this.set('username4', '');
    },
  },
});
