import Ember from 'ember';

export default Ember.Component.extend({
  isShowingForm: false,
    actions: {

    showForm() {
      this.set('isShowingForm', true);
    },
    submitPlayers() {
      var playerArray = this.get('players').toArray();
      var playersPlaying = [];
      for(var i = 0; i < 4; i++) {
        var newPlayer = playerArray[i];
        var userName = 'username' + i;
        newPlayer.set('username', this.get(userName));
        newPlayer.save();
        playersPlaying.push(newPlayer);
      }
      this.set('isShowingForm', false);
      this.sendAction('submitPlayers', playersPlaying, this.get('answers'), this.get('questions'));
      this.set('username1', '');
      this.set('username2', '');
      this.set('username3', '');
      this.set('username4', '');
    },
  },
});
