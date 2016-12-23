import Ember from 'ember';
const {on, inject, observer } = Ember;

export default Ember.Component.extend({
  tagName: 'img',
  ratio: "16:9",
  attributeBindings: ['src', 'alt'],
  _resizeListner: null,

  didInsertElement(){
    Ember.run.next(this, this.setStyles);
    this._resizeListner = Ember.run.bind(this, this.setStyles);
    Ember.$( window ).resize(this._resizeListner);
  },

  setStyles(){
    let maxWidth = this.$().parent().width();
    let ratio = this.get('ratio').split(':');
    let prp = ratio[1]/ratio[0];

    this.$().css({width: `${maxWidth}px`, height: `${prp*maxWidth}px`});
  },
  initStles: on('willDestroyElement', function(){
    Ember.$(window).off("resize", this._resizeListner);
    Ember.$(window).unbind("resize", this._resizeListner);
  }),
});
