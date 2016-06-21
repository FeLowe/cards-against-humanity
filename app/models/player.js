import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr(),
  userage: DS.attr(),
  userpoints: DS.attr(),
  answers: DS.hasMany('answer', {async: true})
});
