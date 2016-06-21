import DS from 'ember-data';
// import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
cardcontent: DS.attr(),
cardshown: DS.attr(false),
current: DS.attr(false)
});
