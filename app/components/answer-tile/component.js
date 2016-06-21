import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    selectCard(cardSelected) {
      cardSelected.set('selected', true);
      cardSelected.save();
      //remember to reset later

    }
  }
});
