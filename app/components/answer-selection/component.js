import Ember from 'ember';

export default Ember.Component.extend({

  selectedStatus: "No selection yet",
  allSelected: false,
  voted: false,
  selectedAnswers: [],

  actions: {
    selectCard(cardSelected) {
      var selectedCount = 0;
      var selectedArray = [];
      this.set('selectedStatus', cardSelected);
      this.get('allAnswers').forEach((answer)=> {
        if (answer.get('selected') === true) {
          selectedCount++;
          selectedArray.push(answer);
          this.set('selectedAnswers', selectedArray);
        }
        //change to players.length later for different player amounts
        if (selectedCount === 4) {
          this.set('allSelected', true);
        }
      });
    },
    vote(votedAnswer) {
      votedAnswer.get('votedBy').addObject(this.get('player'));
      votedAnswer.save();
      $('.voteButtons').hide();
      var totalVotes = 0;
      var winnerVotes = 0;
      // var winners = [];


      // console.log(this.get('selectedAnswers').toArray());
      //
      // var answerChoices = this.get('selectedAnswers');
      //
      // this.get('selectedAnswers').forEach(function(answer) {
      //   totalVotes += answer.get('votedBy').toArray().length;
      // });
      // if (totalVotes >= 4) {
      //   console.log("hello");
      //   console.log(answerChoices);
      //   this.get('allAnswers').forEach((answer) => {
      //     if(answer.get('votedBy').toArray().length >= winnerVotes) {
      //       if (answer.get('votedBy').toArray().length === winnerVotes){
      //         winners.push(answer.get('player'));
      //       } else {
      //         winners.set('winners', []);
      //         winners.get('winners').addObjects(answer.get('player'));
      //         winnerVotes = answer.get('votedBy').toArray().length;
      //       }
      //     }
      //   });
      // }



      var currentGame = this.get('game');
      // console.log(this.get('selectedAnswers').toArray());
      //
      // this.get('selectedAnswers').then((answerChoices) => {
      //   answerChoices.forEach((answer) => {
      //     totalVotes += answer.get('votedBy').toArray().length;
      //   });
      //   if (totalVotes >= currentGame.get('players').toArray().length) {
      //     console.log("hello");
      //     console.log(answerChoices);
      //     answerChoices.forEach((answer) => {
      //       if(answer.get('votedBy').toArray().length >= winnerVotes) {
      //         if (answer.get('votedBy').toArray().length === winnerVotes){
      //           currentGame.push(answer.get('player'));
      //         } else {
      //           currentGame.set('winners', []);
      //           currentGame.get('winners').addObjects(answer.get('player'));
      //           winnerVotes = answer.get('votedBy').toArray().length;
      //         }
      //       }
      //     });
      //   };
      // });

      var answerChoices = this.get('selectedAnswers');

      this.get('selectedAnswers').forEach((answer) => {
        totalVotes += answer.get('votedBy.length');
        // console.log(answer.get('votedBy.length'));
      });
      // console.log(totalVotes);
      if (totalVotes >= currentGame.get('players.length')) {

        // answerChoices.forEach(function(answer) {
        //   console.log(answer.get('cardcontent'));
        // });
        // console.log(answerChoices.length);
        answerChoices.forEach((answer) => {
          console.log(answer.get('votedBy.length'));
          if(answer.get('votedBy.length') >= winnerVotes) {
            if (answer.get('votedBy.length') === winnerVotes){
              // currentGame.push(answer.get('player'));
            } else {
              currentGame.set('winners', []);
              // debugger;
              // currentGame.get('winners').addObject(currentGame.get('players.lastObject'));
              var playerWinner = answer.get('player');
              console.log(playerWinner.content.id);
              winnerVotes = answer.get('votedBy.length');
              console.log(currentGame.get('winners'));
              // currentGame.get('winners').addObject(playerWinner.content.id);
              currentGame.get('winners').then((winners) => {
                console.log("hello");
                answer.get('player').then((player) => {
                  console.log("goodbye");
                  winners.addObject(player);
                  currentGame.save();
                });
              });
              // currentGame.save();
              // console.log("winners length: ", currentGame.get('winners.length'));
            }
          }

        });
      }



    }
  }
});
