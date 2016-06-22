import Ember from 'ember';

export default Ember.Component.extend({

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
    // console.log(this.get('answers'));
    // console.log(this.get('answers').findBy('selected', true));
    // var answerArray = this.get('answers').toArray();
    // answerArray.forEach(function(answer) {
    //   console.log(answer);
    //   console.log(answer.get('selected'));
    //   if (answer.selected === true) {
    //     console.log(answer);
    //     return answer;
    //   }
    // })
    // console.log(answerArray);
    // console.log(this.get('answers').filterBy('selected', "true"));
    // return this.get('answers').findBy('selected', "true");

    }),
  selectedStatus: 'No selection yet',
  selectedStatusObserver: function() {
    this.get('answers').then((answers) => {
      console.log(answers.findBy('selected', true));
      this.set('selectedStatus', answers.findBy('selected', true));
    });
  }.observes('selectedStatus.selected').on('init'),
});
