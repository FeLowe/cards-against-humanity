import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    deletePlayers(players) {
      console.log(players);
      this.sendAction('deletePlayers', players);
    },
  }
});
