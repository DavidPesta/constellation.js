define(["lib/jquery","lib/backbone","./window-v"],function(e,t,n){var r=t.View.extend({el:"#info",events:{"click button":"onToggle"},onToggle:function(){this.$el.toggleClass("closed");var t=!this.$el.hasClass("closed"),n=this;this.$win=this.$win||e(window),this.$win.off("click.info"),t&&this.$win.on("click.info",function(t){e(t.target).closest(n.$el).length||n.onToggle()}),this.$(".toggle").text(t?"x":"?")}});return new r});