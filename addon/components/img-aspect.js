import Ember from 'ember';
const {on, inject, observer } = Ember;

export default Ember.Component.extend({
  tagName: 'img',
  aspect: "16:9",
  attributeBindings: ['src', 'alt'],
  _resizeListner: null,

  didInsertElement(){
    Ember.run.next(this, this.setStyles);
    this._resizeListner = Ember.run.bind(this, this.setStyles);
    Ember.$( window ).resize(this._resizeListner);
  },

  setStyles(){
    let maxWidth = this.$().parent().width();
    let aspect = this.get('aspect').split(':');
    let prp = aspect[1]/aspect[0];

    this.$().css({width: `${maxWidth}px`, height: `${prp*maxWidth}px`});
  },
  initStles: on('willDestroyElement', function(){
    Ember.$(window).off("resize", this._resizeListner);
    Ember.$(window).unbind("resize", this._resizeListner);
  }),
});
