import DS from 'ember-data';
// import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  cardcontent: DS.attr(),
  drawn: DS.attr(false),
  selected: DS.attr(false),
  player: DS.belongsTo('player', {inverse: 'answers'}),
  votedBy: DS.hasMany('player', {async: true}),
  game: DS.belongsTo('game', {inverse: null})
});
