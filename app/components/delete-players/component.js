import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    deletePlayers(players) {
      this.sendAction('deletePlayers', players);
    },
  }
});
