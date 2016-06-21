import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return Ember.RSVP.hash({
      player: this.store.findRecord('player', params.player_id),
      questions: this.store.findAll('question'),
      answers: this.store.findAll('answer'),
    });
  },
});
