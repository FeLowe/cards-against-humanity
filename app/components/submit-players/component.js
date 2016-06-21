import Ember from 'ember';

export default Ember.Component.extend({
  answersDealt: Ember.computed(function() {
    var allAnswers = [];
    var answerHand = [];

    this.get('answers').forEach(function(answer) {
      allAnswers.push(answer);
    });

    // for (var i=0; i < 10; i++) {
    //   var rand = Math.floor(Math.random() * allAnswers.length);
    //   // while (allAnswers[rand].drawn) {
    //   //   rand = Math.floor(Math.random() * allAnswers.length);
    //   // }
    //   if (allAnswers[rand].get('drawn') === false) {
    //     allAnswers[rand].set('drawn', true);
    //     answerHand.push(allAnswers[rand]);
    //   } else {
    //     // --i;
    //     rand = Math.floor(Math.random() * allAnswers.length);
    //   }
    // }
    // while (answerHand.length < 10) {
    //   var rand = Math.floor(Math.random() * allAnswers.length);
    //
    //   if (allAnswers[rand].get('drawn') === false) {
    //     allAnswers[rand].set('drawn', true);
    //     answerHand.push(allAnswers[rand]);
    //   } else {
    //     // --i;
    //     rand = Math.floor(Math.random() * allAnswers.length);
    //   }
    // }

    var i = 0;
    while (i < 10) {
      var rand = Math.floor(Math.random() * allAnswers.length);
      if (allAnswers[rand].get('drawn') === "false") {
        allAnswers[rand].set('drawn', "true");
        console.log(allAnswers[rand].get('drawn'));
        answerHand.push(allAnswers[rand]);
        i++;
      } else {
        rand = Math.floor(Math.random() * allAnswers.length);
      }
    }

    console.log(answerHand);
    return answerHand;
  }),
  actions: {
    
    submitPlayers() {
      var params1 = {
        username: "this.get('username1')",
        userage: "this.get('userage1')",
        userpoints: 0,
      };
      var params2 = {
        username: "this.get('username2')",
        userage: "this.get('userage2')",
        userpoints: 0,
      };
      var params3 = {
        username: "this.get('username3')",
        userage: "this.get('userage3')",
        userpoints: 0,
      };
      var params4 = {
        username: "this.get('username4')",
        userage: "this.get('userage4')",
        userpoints: 0,
      };
      this.sendAction('submitPlayers', params1, params2, params3, params4);
      this.set('username1', '');
      this.set('userage1', '');
      this.set('username2', '');
      this.set('userage2', '');
      this.set('username3', '');
      this.set('userage3', '');
      this.set('username4', '');
      this.set('userage4', '');
      console.log(this.get('answersDealt'));
    },
  }
});
