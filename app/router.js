import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('rules');
  this.route('player', {path: '/player/:player_id'});
  this.route('about');
});

export default Router;
