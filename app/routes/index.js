import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('player');
  },
  actions: {
    submitPlayers(params1, params2, params3, params4) {
      var player1 = this.store.createRecord('player', params1);
      var player2 = this.store.createRecord('player', params2);
      var player3 = this.store.createRecord('player', params3);
      var player4 = this.store.createRecord('player', params4);
      player1.save();
      player2.save();
      player3.save();
      player4.save();
      this.transitionTo('index');
      // $('#submitPlayers').hide();
      // $('#destroyPlayers').show();
    },
    // deletePlayers('players') {
    //   player.forEeach(function(player){
    //     player.destroyRecord();
    //   });
    // },
  },
});
