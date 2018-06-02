x.each({mouseenter:"mouseover"
mouseleave:"mouseout"}


x.fn.extend({hover:function(e
t){return this.mouseenter(e).mouseleave(t||e)}
