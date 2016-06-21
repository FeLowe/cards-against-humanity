import Ember from 'ember';

export default Ember.Component.extend({
  // model(params) {
  //   return this.store.findRecord('player', params.player_id);
  // },
  // model() {
  //   return Ember.RSVP.hash({
  //     questions: this.store.findAll('question'),
  //     answers: this.store.findAll('answer'),
  //     players: this.store.findAll('player'),
  //   });
  // },
  selectedAnswer: Ember.computed('answers.[]', function() {
    //  var listOfSelectedAnswers = [];
    //  this.get('answers').forEach(function(cardcontent) {
    //    console.log(cardcontent);
    //    if (cardcontent.get('selected') === "true"){
    //      listOfSelectedAnswers.push(cardcontent);
    //    }
    //  });
    //  console.log(listOfSelectedAnswers);
    //   return listOfSelectedAnswers;
    return this.get('answers').findBy('selected', "true");
    }),
});
