import Ember from 'ember';

export default Ember.Component.extend({

  selectedStatus: "No selection yet",

  actions: {
    selectCard(cardSelected) {
      this.set('selectedStatus', cardSelected);
    }
  }
});
