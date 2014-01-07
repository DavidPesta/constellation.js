// Constellation.js 0.2.0
// (c) 2011-2013 Greg MacWilliam
// Freely distributed under the MIT license
// Docs: https://github.com/gmac/constellation.js
(function(t,n){var e=n(Math.sqrt,Math.min,Math.max,Math.abs);"undefined"!=typeof exports?module.exports=e:"function"==typeof define&&define.amd?define(e):t.Const=e})(this,function(t,n,e,i){function o(t){return t instanceof Array}function r(t){return"function"==typeof t}function s(t){return Array.prototype.slice.call(t)}function a(t,n,e,i){return t===e&&n===i||t===i&&n===e}function h(t,n,e){var i=t.addNode(n.x,n.y,{});if(!e.length){var o=t.snapPointToGrid(n);if(o.point){i.x=o.point.x,i.y=o.point.y,i.data.snap=o;for(var r in o.segment)t.joinNodes(i.id,o.segment[r]);e=t.getPolygonsWithLineSegment(o.segment[0],o.segment[1])}}return e.length&&(i.data.poly=e,c.each(e,function(n){for(var e=t.getPolygonById(n).nodes,o=0,r=e.length;r>o;o++)t.joinNodes(i.id,e[o])})),i}function u(t,n){if(t.data.snap&&n.data.snap){var e=t.data.snap.segment,i=n.data.snap.segment;if(a(e[0],e[1],i[0],i[1]))return!0}if(t.data.poly&&n.data.poly)for(var o in t.data.poly)if(c.contains(n.data.poly,t.data.poly[o]))return!0;return!1}var d={},c=d.utils={size:function(t){if(o(t))return t.length;var n=0;for(var e in t)t.hasOwnProperty(e)&&n++;return n},contains:function(t,n){if(o(t)){if(r(Array.prototype.indexOf))return t.indexOf(n)>=0;for(var e=t.length,i=0;e>i;)if(t[i++]===n)return!0}return t&&t.hasOwnProperty(n)},each:function(t,n,e){var i=0;if(o(t))for(var r=t.length;r>i;)n.call(e,t[i],i++);else for(i in t)t.hasOwnProperty(i)&&n.call(e,t[i],i);return t},map:function(t,n,e){var i=0;if(o(t))for(var r=t.length;r>i;)t[i]=n.call(e,t[i],i++);else for(i in t)t.hasOwnProperty(i)&&(t[i]=n.call(e,t[i],i));return t},all:function(t,n,e){for(var i=t.length,o=0;i>o;)if(!n.call(e,t[o],o++))return!1;return!0},toArray:function(t){var n=[];for(var e in t)t.hasOwnProperty(e)&&n.push(t[e]);return n}},f=d.Point=function(t,n){this.x=t||0,this.y=n||0},l=d.Rect=function(t,n,e,i){this.x=t||0,this.y=n||0,this.width=e||0,this.height=i||0};d.distance=function(n,e){var i=e.x-n.x,o=e.y-n.y;return t(i*i+o*o)},d.ccw=function(t,n,e,i){return i?(e.y-t.y)*(n.x-t.x)>(n.y-t.y)*(e.x-t.x):(e.y-t.y)*(n.x-t.x)>=(n.y-t.y)*(e.x-t.x)},d.intersect=function(t,n,e,i){return d.ccw(t,e,i)!==d.ccw(n,e,i)&&d.ccw(t,n,e)!==d.ccw(t,n,i)},d.degreesToRadians=function(t){return t*Math.PI/180},d.radiansToDegrees=function(t){return 180*t/Math.PI},d.angleRadians=function(t,n){return Math.atan2(n.y-t.y,n.x-t.x)},d.angleDegrees=function(t,n){var e=d.radiansToDegrees(d.angleRadians(t,n));return 0>e?e+360:e},d.angleSector=function(t,n,e){var i=2*Math.PI;return n=n||8,e=e||i/(2*n),0>t&&(t=i+t),t+=e,t>i&&(t-=i),Math.floor(t/(i/n))},d.getRectForPointRing=function(t){var i=t[0],o=i.x,r=i.x,s=i.y,a=i.y;return c.each(t,function(t){o=n(o,t.x),r=e(r,t.x),s=n(s,t.y),a=e(a,t.y)}),new l(o,s,r-o,a-s)},d.hitTestRect=function(t,i){var o=n(i.x,i.x+i.width),r=e(i.x,i.x+i.width),s=n(i.y,i.y+i.height),a=e(i.y,i.y+i.height);return t.x>=o&&t.y>=s&&r>=t.x&&a>=t.y},d.hitTestPointRing=function(t,e){for(var i=new f(0,t.y),o=0,r=0,s=e.length;s>r;r++){var a=e[r],h=e[(r+1)%s];i.x=n(i.x,n(a.x,h.x)-1),o+=this.intersect(i,t,a,h)?1:0}return o%2>0},d.snapPointToLineSegment=function(t,n,e){var i=t.x-n.x,o=t.y-n.y,r=e.x-n.x,s=e.y-n.y,a=r*r+s*s,h=i*r+o*s,u=h/a;return 0>u?new f(n.x,n.y):u>1?new f(e.x,e.y):new f(n.x+r*u,n.y+s*u)},d.getNearestPointToPoint=function(t,n){var e,o,r=null,s=1/0,a=n.length-1;for(n.sort(function(n,e){return n=i(t.x-n.x),e=i(t.x-e.x),e-n});a>=0&&(e=n[a--],s>i(t.x-e.x));)o=d.distance(t,e),s>o&&(r=e,s=o);return r};var g=d.Node=function(t,n,e,i,o){this.id=t,this.x=n||0,this.y=e||0,this.to=o||{},this.data=i||null},y=d.Polygon=function(t,n,e){this.id=t,this.nodes=n.slice(),this.data=e||null},p=d.Path=function(t,n,e){this.nodes=t||[],this.weight=n||0,this.estimate=e||0};p.prototype={copy:function(t,n){return new p(this.nodes.slice(),t||this.weight,n||this.estimate)},last:function(){return this.nodes[this.nodes.length-1]},contains:function(t){return c.contains(t)},prioratize:function(t,n){return n.estimate-t.estimate}};var P=d.Grid=function(t){this.reset(t)};return P.prototype={nodes:{},polys:{},_i:0,toJSON:function(){return{nodes:this.nodes,polys:this.polys,i:this._i}},reset:function(t){this.nodes={},this.polys={},this._i=0,t&&(this._i=t.i||0,c.each(t.nodes||{},function(t){this.nodes[t.id]=t},this),c.each(t.polys||{},function(t){this.polys[t.id]=t},this))},addNode:function(t,n,e){"object"==typeof t&&(e=t,t=0);var i=new g(e&&e.id||"n"+this._i++,t,n,e);return this.nodes[i.id]=i,i},getNodeById:function(t){return this.nodes.hasOwnProperty(t)?this.nodes[t]:null},getNodes:function(t,n){return(!o(t)||n)&&(t=s(arguments)),c.map(t.slice(),function(t){return this.getNodeById(t)},this)},getNumNodes:function(){return c.size(this.nodes)},hasNodes:function(t,n){return(!o(t)||n)&&(t=s(arguments)),c.all(t,function(t){return this.nodes.hasOwnProperty(t)},this)},joinNodes:function(t,n){(!o(t)||n)&&(t=s(arguments));var e=!1;return t.length>1&&this.hasNodes(t)&&c.each(t,function(n){for(var i=this.nodes[n],o=t.length,r=0;o>r;)n=t[r++],n!==i.id&&(i.to[n]=1,e=!0)},this),e},splitNodes:function(t,n){if((!o(t)||n)&&(t=s(arguments)),2>t.length)return this.detachNodes(t);var e=!1;return c.each(t,function(n){var i=this.nodes[n];if(i&&i.to)for(n in i.to)c.contains(t,n)&&(delete i.to[n],e=!0)},this),e},detachNodes:function(t,n){(!o(t)||n)&&(t=s(arguments));var e=!1;return c.each(t,function(t){var n,i,o=this.nodes[t];if(o&&o.to){for(i in o.to)delete o.to[i],n=this.nodes[i],n&&n.to&&delete n.to[t];e=!0}},this),e},removeNodes:function(t,n){(!o(t)||n)&&(t=s(arguments));var e=this.detachNodes(t);return c.each(t,function(t){var n,i;if(this.nodes.hasOwnProperty(t)){delete this.nodes[t];for(i in this.polys)n=this.polys[i],n&&c.contains(n.nodes,t)&&delete this.polys[i];e=!0}},this),e},addPolygon:function(t,n){if(t.length>=3&&this.hasNodes(t)){var e=new y("p"+this._i++,t,n);return this.polys[e.id]=e,e}return null},getPolygonById:function(t){return this.polys.hasOwnProperty(t)?this.polys[t]:null},getPolygons:function(t,n){return(!o(t)||n)&&(t=s(arguments)),c.map(t.slice(),this.getPolygonById,this)},getNodesForPolygon:function(t){return this.polys.hasOwnProperty(t)?c.map(this.polys[t].nodes.slice(),this.getNodeById,this):null},getNumPolygons:function(){return c.size(this.polys)},removePolygons:function(t,n){(!o(t)||n)&&(t=s(arguments));var e=!1;return c.each(t,function(t){this.polys.hasOwnProperty(t)&&(delete this.polys[t],e=!0)},this),e},findPath:function(t,n,e,i){var o,s,a,h,u,c,f,l=[],g={},y=this.getNodeById(t),P=this.getNodeById(n),v=0;for(r(e)||(e=d.distance),r(i)||(i=d.distance),l.push(new p([y],e(y,y)));l.length>0;){s=l.pop(),y=s.last();for(f in y.to)y.to.hasOwnProperty(f)&&(a=this.nodes[f],a&&!s.contains(a)&&(u=s.weight+e(y,a),(g[a.id]||u)>=u&&(g[a.id]=u,c=u+i(a,P),(!o||o.weight>c)&&(h=s.copy(u,c),h.nodes.push(a),a.id===P.id?o=h:l.push(h)))));l.sort(p.prototype.prioratize),v++}return{cycles:v,valid:!!o,nodes:o?o.nodes:[],weight:o?o.weight:0}},findPathWithFewestNodes:function(t,n){var e=function(){return 1};return this.findPath(t,n,e,e)},snapPointToGrid:function(t){var n=null,e=1/0,i=[],o={};return c.each(this.nodes,function(r,s){if(t.id!==s)for(var a in r.to)if(r.to.hasOwnProperty(a)&&!o.hasOwnProperty(a+" "+r.id)){var h=this.nodes[a],u=d.snapPointToLineSegment(t,r,h),c=d.distance(t,u);o[r.id+" "+h.id]=!0,(!n||e>c)&&(n=u,e=c,i[0]=r.id,i[1]=h.id)}},this),{offset:isFinite(e)?e:0,point:n||t,segment:i}},snapPoint:function(t){var n=this.snapPointToGrid(t);return n.point||t},getNearestNodeToNode:function(t){var n=[],e=this.getNodeById(t);return e?(c.each(this.nodes,function(t){t.id!==e.id&&n.push(t)},this),d.getNearestPointToPoint(e,n)):null},getNearestNodeToPoint:function(t){return d.getNearestPointToPoint(t,c.toArray(this.nodes))},hitTestPointInPolygons:function(t){return!!this.getPolygonsOverPoint(t).length},getPolygonsOverPoint:function(t){var n=[];for(var e in this.polys)this.polys.hasOwnProperty(e)&&d.hitTestPointRing(t,this.getNodesForPolygon(e))&&n.push(e);return n},getNodesInPolygon:function(t){var n=[],e=this.getPolygonById(t),i=this.getNodesForPolygon(t),o=d.getRectForPointRing(i);return e&&c.each(this.nodes,function(t){(c.contains(e.nodes,t.id)||d.hitTestRect(t,o)&&d.hitTestPointRing(t,i))&&n.push(t.id)},this),n},getNodesInRect:function(t){var n=[];return c.each(this.nodes,function(e){d.hitTestRect(e,t)&&n.push(e.id)},this),n},getAdjacentPolygonSegments:function(t,n){for(var e=[],i=this.getNodesForPolygon(t),o=this.getNodesForPolygon(n),r=i.length,s=o.length,h=0;r>h;h++)for(var u=i[h].id,d=i[(h+1)%r].id,c=0;s>c;c++){var f=o[c].id,l=o[(c+1)%s].id;a(u,d,f,l)&&e.push([u,f])}return e},getPolygonsWithLineSegment:function(t,n){var e=[];return c.each(this.polys,function(i,o){for(var r=0,s=i.nodes.length;s>r;r++){var h=i.nodes[r],u=i.nodes[(r+1)%s];a(h,u,t,n)&&e.push(o)}}),e},getContiguousNodesMap:function(){function t(n,o){e[n.id]=o[n.id]=1;for(var r in n.to)n.to.hasOwnProperty(r)&&!o.hasOwnProperty(r)&&(o=t(i.getNodeById(r),o));return o}var n=[],e={},i=this;return c.each(this.nodes,function(i){e.hasOwnProperty(i.id)||n.push(t(i,{}))}),n},bridgePoints:function(t,n,e){function i(t,n){return[t,e?a.snapPoint(n):n]}var o,r=this.getPolygonsOverPoint(t),s=this.getPolygonsOverPoint(n),a=this;if(r.length&&s.length){for(o=0;r.length>o;o++)if(c.contains(s,r[o]))return i(t,n);var f=this.getAdjacentPolygonSegments(r,s);for(o=0;f.length>o;o++){var l=c.map(f[o],this.getNodeById,this);if(d.intersect(t,n,l[0],l[1]))return i(t,n)}}var g=h(this,t,r),y=h(this,n,s);u(g,y)&&this.joinNodes(g.id,y.id);var p=this.findPath(g.id,y.id);return this.removeNodes(g.id,y.id),p.valid?(p=p.nodes,d.distance(t,p[0])>1&&p.unshift(t),!e&&d.distance(n,p[p.length-1])>1&&p.push(n),p):[]}},d});