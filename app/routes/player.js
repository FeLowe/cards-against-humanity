import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('player', params.player_id);
  },
  actions: {
    drawTen(answers) {
      
    },
  },
});
