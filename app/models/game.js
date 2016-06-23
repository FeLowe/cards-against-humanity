import DS from 'ember-data';
// import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  players: DS.hasMany('player', {async:true}),
  round: DS.attr(),
  winners: DS.hasMany('player', {async:true}),
  votes: DS.attr(),
});
