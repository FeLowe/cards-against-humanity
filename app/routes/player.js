import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return Ember.RSVP.hash({
      questions: this.store.findAll('question'),
      allAnswers: this.store.findAll('answer'),
      players: this.store.findAll('player'),
      player: this.store.findRecord('player', params.player_id)
    });
  },

});
