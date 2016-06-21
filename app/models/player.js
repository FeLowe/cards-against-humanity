import DS from 'ember-data';
// import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  username: DS.attr(),
  userage: DS.attr(),
  userpoints: DS.attr(),
  answers: DS.hasMany('answer', {inverse: null})
});
