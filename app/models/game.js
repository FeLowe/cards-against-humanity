import DS from 'ember-data';
// import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  players: DS.hasMany('player', {async:true}),
  round: DS.attr(),
  winners: DS.hasMany('answer', {inverse:null}),
  votes: DS.attr(),
  selected: DS.attr(),
  answers: DS.hasMany('answer', {inverse:null}),
});
