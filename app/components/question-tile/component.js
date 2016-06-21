import Ember from 'ember';

export default Ember.Component.extend({
  sortedQuestion: function() {
    return this.get('question').filterBy('cardshown', 'true');
  },
});
