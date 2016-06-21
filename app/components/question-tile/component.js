import Ember from 'ember';

export default Ember.Component.extend({
  question: Ember.computed('questions', function() {
    return this.get('questions').findBy('current', "true");
  })
});
