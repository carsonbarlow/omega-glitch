!function(){function t(t,s,e,n){C.beginPath(),C.moveTo(t,s),C.lineTo(e,n),C.closePath(),C.stroke()}function s(){this.points=[{y:Math.floor(Math.random()*z+1)*x,x:Math.floor(Math.random()*F+1)*x}],this.draw=n,this.move=e,this.dir=Math.floor(8*Math.random()+1)}function e(){var t=Math.floor(3*Math.random()-1),s=this.dir+t;s<0&&(s=7),7<s&&(s=0);var e=this.points[this.points.length-1];e.x<10&&(s=2),e.y<10&&(s=4),v.width-10<e.x&&(s=6),v.height-10<e.y&&(s=0),this.dir=s;var n={x:e.x+T[s].x*x,y:e.y+T[s].y*x};this.points.push(n),10<this.points.length&&this.points.shift()}function n(){var t=this.points;for(m=1;m<t.length;m++)y.beginPath(),y.moveTo(t[m-1].x,t[m-1].y),y.lineTo(t[m].x,t[m].y),y.closePath(),y.lineWidth=1,y.strokeStyle=k,y.stroke(),y.lineWidth=10,y.strokeStyle=j,y.stroke()}function o(t){this.snakeys=[];for(var e=0;e<t;e++)this.snakeys.push(new s);this.go=i}function i(){for(var t=0;t<this.snakeys.length;t++)this.snakeys[t].move(),this.snakeys[t].draw()}var a,r=function(){function t(){x.charges&&(x.charges--,g.detonate_charge(v))}function s(){var t=utils.normalize(x.pos_x,x.pos_y,u[d].x,u[d].y);x.vol_x=t[0]*x.speed,x.vol_y=t[1]*x.speed}function e(t){function e(){x.pos_x=u[d].x,x.pos_y=u[d].y,d++,d>=u.length?n(next_spot):s()}m&&(x.pos_x+=x.vol_x*t,x.pos_y+=x.vol_y*t,x.vol_x>0&&x.pos_x>u[d].x?e():x.vol_x<0&&x.pos_x<u[d].x&&e(),x.vol_y>0&&x.pos_y>u[d].y?e():x.vol_y<0&&x.pos_y<u[d].y&&e())}function n(t){v=t,m=!1,x.pos_x=t.pos_x,x.pos_y=t.pos_y,t.charge&&(x.charges++,t.charge=!1),x.collision=8,w=!1}function o(){n(g.starting_spot)}function i(t){e(t)}function a(){return x}function r(){return w}function l(t){f=t,f.add_subscriber(this)}function h(e){if(!m){if(" "===e)return void t();var n=g.move_leads_to(v,y[e]);n&&(u=n.path.checkpoints.slice(0),u[0].x===x.pos_x&&u[0].y===x.pos_y||u.reverse(),d=1,next_spot=n.spot,s(),m=!0,w=!1,x.collision=2)}}function _(t){g=t}function c(t){x.charges=t}function p(){w=!0,x.vol_x=x.vol_x*-1,x.vol_y=x.vol_y*-1,u.reverse(),d=u.length-1-d,next_spot=v}var f,g,u,d,v,y={a:"west",s:"south",d:"east",w:"north"},x={pos_x:0,pos_y:0,vol_x:0,vol_y:0,speed:500,charges:0,collision:10,radius:10,graphic:{lineWidth:0,fillStyle:"rgba(250,247,91,0.7)",strokeStyle:"#29c8df",shadowColor:"#39b5a6",shadowBlur:5,shadowOffsetX:0,shadowOffsetY:0}},m=!1,w=!1;this.update=i,this.get_avatar=a,this.start_level=o,this.inject_input=l,this.key_pressed=h,this.button_pressed=function(){},this.inject_level_manager=_,this.set_avatar_charges=c,this.get_gate_hit=r,this.hit_gate=p},l={canvas_id:"game_canvas",fps:60,grid_size:15,direction_to_grid_difference:{1:{x:0,y:-1},2:{x:1,y:-1},3:{x:1,y:0},4:{x:1,y:1},5:{x:0,y:1},6:{x:-1,y:1},7:{x:-1,y:0},8:{x:-1,y:-1}},level_button_width:5},h=function(){function t(t){n[t].classList.add("hidden")}function s(t){n[t].classList.remove("hidden")}function e(t){for(var s=1;s<=t;s++){var e=document.getElementById("level_"+s);e.disabled=!1}}for(var n={start_screen:document.getElementById("start_screen"),select_level:document.getElementById("select_level"),game_complete:document.getElementById("game_complete")},o=0,i=0,a=1;a<=Object.keys(q.levels).length;a++){var r=document.createElement("button");r.textContent="lv "+a,r.id="level_"+a,r.classList.add("level_btn"),r.classList.add("left_"+o),r.classList.add("top_"+i),r.disabled=!0,o++,o==l.level_button_width&&(o=0,i++),n.select_level.appendChild(r),input.add_button("level_"+a)}this.close_screen=t,this.open_screen=s,this.unlock_levels=e};window.onload=function(t){a=new _};var _=function(){function t(t){c&&s.update(t)}var s=new p;graphics=new d,input=new M,dom_manager=new h,input.set_up_button_events(),s.inject_graphics(graphics),s.inject_input(input),s.inject_dom_manager(dom_manager);var e=function(){var s=1e3/l.fps;next_tick=last_tick=(new Date).getTime();return num_frames=0,function(){for(current_tick=(new Date).getTime();current_tick>next_tick;)delta=(current_tick-last_tick)/1e3,t(delta),next_tick+=s,last_tick=(new Date).getTime();graphics.draw(),num_frames++}}();window.requestAnimationFrame?window.each_frame=function(t){var s=function(){t(),requestAnimationFrame(s)};s()}:window.mozRequestAnimationFrame?window.each_frame=function(t){var s=function(){t(),mozRequestAnimationFrame(s)};s()}:window.each_frame=function(t){setInterval(t,1e3/l.fps)},window.each_frame(e)},c=!1,p=function(){function t(t){v.update(t),level_manager.update(t)}function s(t){p=t,p.inject_avatar(v.get_avatar()),level_manager.inject_graphics(t)}function e(t){f=t,v.inject_input(t),f.add_subscriber(this)}function n(t){g=t}function o(){u=6,i()}function i(){level_manager.clear_level(),p.clear_level(),level_manager.setup_level(u),v.start_level(),c=!0}function a(){setTimeout(function(){c=!1,u++,u>d&&(d=u,g.unlock_levels(d)),i()},1e3)}function l(){g.open_screen("game_complete")}function h(){c=!1,i()}function _(t){"campaign"==t?(g.close_screen("start_screen"),g.open_screen("select_level"),g.unlock_levels(d)):"level_"==t.substring(0,6)?(u=parseInt(t.substring(6)),i(),g.close_screen("select_level")):"restart_level"==t?(c=!1,i()):"quit_level"==t?g.open_screen("select_level"):"back_to_start"==t&&(g.close_screen("game_complete"),g.open_screen("start_screen"))}var p,f,g,u,d=1,v=new r;level_manager=new D,v.inject_level_manager(level_manager),level_manager.inject_avatar_manager(v),level_manager.inject_game_master(this),this.update=t,this.inject_graphics=s,this.inject_input=e,this.inject_dom_manager=n,this.key_pressed=function(){},this.button_pressed=_,this.start_game=o,this.level_complete=a,this.reset_level=h,this.game_complete=l},f=function(t){function s(){active=!1}function e(){return active}this.pos_x=t.x*l.grid_size,this.pos_y=t.y*l.grid_size,this.path=t.p,this.size=10,this.collision=8,active=!0,this.blow_up=s,this.is_active=e,this.graphic={lineWidth:1,fillStyle:"rgba(204, 51, 51, 0.6)",shadowColor:"#6FC3DF",shadowBlur:5,shadowOffsetX:0,shadowOffsetY:0}},g=function(t,s){function e(t){o=t,o.add_to_manifest(this,"gate_generators");for(var s=0;s<i.length;s++)i[s].inject_graphics(o),i[s].set_starting_spot(this.spot)}function n(){for(var t=0;t<i.length;t++)i[t].blow_up()}var o;this.spot=s[t.s],this.gates=t.g;var i=t.gp.slice(0);this.pos_x=this.spot.pos_x,this.pos_y=this.spot.pos_y,this.size=10;for(var a=0;a<i.length;a++)i[a]=new u(i[a]);this.blow_up=n,this.inject_graphics=e,this.graphic={lineWidth:1,fillStyle:"rgba(204, 104, 51, 0.6)",shadowColor:"#6FC3DF",shadowBlur:5,shadowOffsetX:0,shadowOffsetY:0}},u=function(t){function s(t){i=t,this.checkpoints=n(),graphics.add_to_manifest(this,"gate_generator_paths")}function e(t){graphics=t}function n(){a=[],a.push({x:i.pos_x,y:i.pos_y});for(var t,s,e=0;e<r.length;e+=2)t=r[e],s=r[e+1],a.push({x:l.direction_to_grid_difference[t].x*l.grid_size*s+a[a.length-1].x,y:l.direction_to_grid_difference[t].y*l.grid_size*s+a[a.length-1].y});return a}function o(){graphics.remove_from_manifest(this,"gate_generator_paths"),this.blown_up=!0}var i,a,r=t;this.checkpoints=[],this.graphic={setLineDash:[5,3],lineWidth:2,strokeStyle:"#ff5c33",shadowColor:"#6FC3DF",shadowBlur:5,shadowOffsetX:0,shadowOffsetY:0},this.set_starting_spot=s,this.inject_graphics=e,this.checkpoints=a,this.blow_up=o},d=function(){function t(){g.clearRect(0,0,u,d);for(var t=0;t<v.length;t++)i(v[t]);g.font="bold 20px sans-serif",g.fillStyle="rgba(210,210,210,0.5)",g.fillText("Charges:"+c.charges,33,27)}function s(t){c=t}function e(){for(var t in p)p[t]=[];p.avatar=[c]}function n(t,s){var e=p[s];e.indexOf(t)==-1&&e.push(t)}function o(t,s){var e=p[s];e.indexOf(t)!=-1&&e.splice(e.indexOf(t),1)}function i(t){for(var s=p[t],e=0;e<s.length;e++){g.save();var n=s[e].graphic;for(var o in n)"setLineDash"!=o?g[o]=n[o]:g.setLineDash(n[o]);y[t](s[e]),g.restore()}}function a(t){g.beginPath(),g.arc(t.pos_x,t.pos_y,t.collision,0,2*Math.PI,!0),g.fill(),g.stroke(),t.charge&&_(t)}function r(t){var s=t.pos_x,e=t.pos_y,n=t.size;g.beginPath(),g.moveTo(s-n,e-n),g.lineTo(s+n,e-n),g.lineTo(s+n,e+n),g.lineTo(s-n,e+n),g.lineTo(s-n,e-n),g.fill(),g.stroke()}function h(t){g.beginPath();var s=t.checkpoints;g.moveTo(s[0].x,s[0].y);for(var e=1;e<s.length;e++)g.lineTo(s[e].x,s[e].y);g.stroke()}function _(t){g.fillStyle="rgba(212, 17, 27, 0.6)",g.shadowColor="#d0161e",g.shadowBlur=10,g.shadowOffsetX=0,g.shadowOffsetY=0,g.beginPath(),g.arc(t.pos_x,t.pos_y,4,0,2*Math.PI,!0),g.fill()}var c,p={spots:[],paths:[],objectives:[],patrols:[],patrol_generators:[],gates:[],gate_generators:[],gate_generator_paths:[],avatar:[]},f=document.getElementById(l.canvas_id),g=f.getContext("2d"),u=f.width,d=f.height,v=["paths","spots","objectives","patrols","patrol_generators","gates","gate_generators","gate_generator_paths","avatar"],y={paths:h,spots:a,objectives:r,patrols:a,patrol_generators:r,gates:r,gate_generators:r,gate_generator_paths:h,avatar:a};this.draw=t,this.clear_level=e,this.inject_avatar=s,this.add_to_manifest=n,this.remove_from_manifest=o},v=document.getElementById("text");v.width=window.innerWidth,v.height=window.innerHeight;var y=v.getContext("2d");y.translate(.5,.5);var x=12,w="rgba(240,240,240)",b="rgba(0,20,40,0.9)",k="rgba(0,255,255,0.1)",j="rgba(0,100,100,0.1)",O=document.createElement("canvas");O.width=window.innerWidth,O.height=window.innerHeight;var C=O.getContext("2d");C.translate(.5,.5),C.fillStyle=w,C.fillRect(0,0,O.width,O.height);var z=Math.ceil(O.height/x),F=Math.ceil(O.width/x);C.strokeStyle=b;for(var S=1;S<=F;S++)t(S*x,0,S*x,O.height);for(var B=0;B<=z;B++)t(0,B*x,O.width,B*x);for(var B=0;B<=z+F;B++)t(0,B*x-O.width,O.width,B*x),t(0,B*x,O.width,B*x-O.width);var T=[{name:"up",x:0,y:-1},{name:"upright",x:1,y:-1},{name:"right",x:1,y:0},{name:"downright",x:1,y:1},{name:"down",x:0,y:1},{name:"downleft",x:-1,y:1},{name:"left",x:-1,y:0},{name:"upleft",x:-1,y:-1}],I=new o(10);y.drawImage(O,0,0),setInterval(function(){y.globalAlpha=.2,y.drawImage(O,0,0),y.globalAlpha=1,I.go()},1e3/30);var M=function(){function t(t){i.push(t)}function s(){for(var t=0;t<i.length;t++){var s=document.getElementById(i[t]);!function(t){s.addEventListener("mouseup",function(){for(var s=0;s<o.length;s++)o[s].button_pressed(i[t])})}(t)}}function e(t){o.indexOf(t)===-1&&o.push(t)}function n(t){o.indexOf(t)!==-1&&t.splice(o.indexOf(t),1)}var o=[],i=["campaign","custom","build","restart_level","quit_level","back_to_start"];window.addEventListener("keydown",function(t){for(var s=0;s<o.length;s++)o[s].key_pressed(t.key)}),this.add_subscriber=e,this.remove_subscriber=n,this.set_up_button_events=s,this.add_button=t},D=function(){function t(t){l=q.levels[String(t)],_.set_avatar_charges(l.charges);for(var s in l.spots){var e=new X(l.spots[s]);p[s]=e,h.add_to_manifest(e,"spots")}for(this.starting_spot=p[l.start],B=0;B<l.paths.length;B++){var n=new E(l.paths[B]);n.inject_graphics(h),n.set_starting_spot(p[l.paths[B][0]]),u.push(n)}for(B=0;B<l.objectives.length;B++){var o=new W(l.objectives[B],p);h.add_to_manifest(o,"objectives"),d.push(o)}for(B=0;B<l.patrols.length;B++){var i=new L(l.patrols[B]);i.make_path_list(u,p),i.inject_graphics(h),v.push(i)}for(B=0;B<l.patrol_generators.length;B++){var a=new P(l.patrol_generators[B],p);h.add_to_manifest(a,"patrol_generators"),y.push(a)}for(B=0;B<l.gates.length;B++){var r=new f(l.gates[B]);h.add_to_manifest(r,"gates"),x.push(r)}for(B=0;B<l.gate_generators.length;B++){var c=new g(l.gate_generators[B],p);c.inject_graphics(h),m.push(c)}}function s(t,s){if(!t[s])return!1;var e={spot:p[t[s][0]],path:u[t[s][1]]};return!e.path.blocked&&e}function e(t){h=t}function n(t){_=t}function o(t){c=t}function i(t){for(var s=0;s<d.length;s++)if(d[s].spot==t){d[s].blow_up(),h.remove_from_manifest(d[s],"objectives");for(var e=d[s].paths.length-1;e>-1;e--){u[d[s].paths[e]].blow_up();for(var n=0;n<v.length;n++)v[n].get_current_path()===u[d[s].paths[e]]&&v[n].blow_up()}d.splice(s,1),d.length||(l.end_of_game?c.game_complete():c.level_complete())}for(s=0;s<y.length;s++)if(y[s].spot==t){y[s].blow_up();for(var n=y[s].patrols.length-1;n>-1;n--)v[y[s].patrols[n]].blow_up(),h.remove_from_manifest(v[y[s].patrols[n]].get_unit(),"patrols");h.remove_from_manifest(y[s],"patrol_generators")}for(s=0;s<m.length;s++)if(m[s].spot==t){m[s].blow_up();for(var o=m[s].gates.length-1;o>-1;o--)x[m[s].gates[o]].blow_up(),h.remove_from_manifest(x[m[s].gates[o]],"gates"),u[x[m[s].gates[o]].path].blocked=!1,h.remove_from_manifest(m[s],"gate_generators")}}function a(){p={},u=[],d=[],v=[],y=[],x=[],m=[]}function r(t){for(var s=0;s<v.length;s++)v[s].update(t),v[s].is_active()&&utils.check_collision(v[s].get_unit(),_.get_avatar())&&c.reset_level();for(s=0;s<x.length;s++)x[s].is_active()&&!_.get_gate_hit()&&utils.check_collision(x[s],_.get_avatar())&&_.hit_gate()}var l,h,_,c,p,u,d,v,y,x,m;this.starting_spot,this.setup_level=t,this.inject_graphics=e,this.inject_avatar_manager=n,this.inject_game_master=o,this.move_leads_to=s,this.detonate_charge=i,this.clear_level=a,this.update=r},W=function(t,s){function e(){}this.spot=s[t[0]],this.paths=t[1],this.size=15,this.pos_x=this.spot.pos_x,this.pos_y=this.spot.pos_y,this.graphic={lineWidth:1,fillStyle:"rgba(250,247,91,0.2)",shadowColor:"#6FC3DF",shadowBlur:5,shadowOffsetX:0,shadowOffsetY:0},this.blow_up=e},E=function(t){function s(t){a=t,this.checkpoints=n(),i.add_to_manifest(this,"paths")}function e(t){i=t}function n(){r=[],r.push({x:a.pos_x,y:a.pos_y});for(var s,e,n=1;n<t.length;n+=2)s=t[n],e=t[n+1],r.push({x:l.direction_to_grid_difference[s].x*l.grid_size*e+r[r.length-1].x,y:l.direction_to_grid_difference[s].y*l.grid_size*e+r[r.length-1].y});return r}function o(){i.remove_from_manifest(this,"paths"),this.blocked=!0,this.blown_up=!0}var i,a,r;this.graphic={lineWidth:2,strokeStyle:"#d1f3f8",shadowColor:"#6FC3DF",shadowBlur:5,shadowOffsetX:0,shadowOffsetY:0},this.set_starting_spot=s,this.inject_graphics=e,this.checkpoints=r,this.blow_up=o},L=function(t){function s(t){p=t,p.add_to_manifest(x,"patrols")}function e(t,s){f=[];for(var e=0;e<y.length;e++)f.push(t[n(s[y[e]],y[(e+1)%y.length])]);x.pos_x=s[y[0]].pos_x,x.pos_y=s[y[0]].pos_y,u=-1,d=1,a()}function n(t,s){for(var e=0;e<w.length;e++)if(t[w[e]]&&t[w[e]][0]==s)return t[w[e]][1]}function o(t){m&&i(t)}function i(t){function s(){x.pos_x=g[v].x,x.pos_y=g[v].y,v++,v>=g.length?a():r()}x.pos_x+=x.vol_x*t,x.pos_y+=x.vol_y*t,x.vol_x>0&&x.pos_x>g[v].x?s():x.vol_x<0&&x.pos_x<g[v].x&&s(),x.vol_y>0&&x.pos_y>g[v].y?s():x.vol_y<0&&x.pos_y<g[v].y&&s()}function a(){u=(u+d+y.length)%y.length,g=f[u],g.blown_up&&(d=-d,u=(u+2*d+y.length)%y.length,g=f[u]),g=g.checkpoints.slice(0),g[0].x===x.pos_x&&g[0].y===x.pos_y||g.reverse(),v=1,r()}function r(){var t=utils.normalize(x.pos_x,x.pos_y,g[v].x,g[v].y);x.vol_x=t[0]*x.speed,x.vol_y=t[1]*x.speed}function l(){return x}function h(){return m}function _(){m=!1}function c(){return f[u]}var p,f,g,u,d,v,y=t,x={pos_x:0,pos_y:0,vol_x:0,vol_y:0,speed:75,collision:10,graphic:{lineWidth:0,fillStyle:"rgba(207, 19, 28, 0.8)",shadowColor:"#6FC3DF",shadowBlur:20,shadowOffsetX:0,shadowOffsetY:0}},m=!0,w=["north","east","west","south"];this.make_path_list=e,this.update=o,this.inject_graphics=s,this.get_unit=l,this.get_current_path=c,this.blow_up=_,this.is_active=h},P=function(t,s){function e(){}this.spot=s[t.s],this.patrols=t.p,this.pos_x=this.spot.pos_x,this.pos_y=this.spot.pos_y,this.size=10,this.blow_up=e,this.graphic={lineWidth:1,fillStyle:"rgba(84, 84, 51, 0.6)",shadowColor:"#6FC3DF",shadowBlur:5,shadowOffsetX:0,shadowOffsetY:0}},X=function(t){this.pos_x=t.x*l.grid_size,this.pos_y=t.y*l.grid_size,this.north=t.n,this.east=t.e,this.south=t.s,this.west=t.w,this.charge=t.charge||!1,this.collision=l.grid_size/2,this.graphic={fillStyle:"rgba(254, 254, 254, 0.8)",lineWidth:2,strokeStyle:"#29c8df",shadowColor:"#5ad4e6",shadowBlur:10,shadowOffsetX:0,shadowOffsetY:0}},Y=function(){function t(t,s,e,n){x_dif=e-t,y_dif=n-s;var o=x_dif*x_dif+y_dif*y_dif;return o=Math.sqrt(o),[x_dif/o,y_dif/o]}function s(t,s){return e(t,s)<t.collision+s.collision}function e(t,s){var e=t.pos_x-s.pos_x,n=t.pos_y-s.pos_y;return Math.sqrt(e*e+n*n)}this.normalize=t,this.check_collision=s};utils=new Y;var q=q||{levels:{}};q.levels[1]={charges:1,spots:{s1:{x:8,y:15,e:["s2",0]},s2:{x:20,y:15,w:["s1",0],e:["s3",1]},s3:{x:35,y:15,w:["s2",1]}},paths:[["s1",3,12],["s2",3,15]],patrols:[],patrol_generators:[],start:"s1",objectives:[["s3",[0,1]]],gates:[],gate_generators:[]};var q=q||{levels:{}};q.levels[2]={charges:0,spots:{s1:{x:8,y:15,e:["s2",0]},s2:{x:20,y:15,w:["s1",0],e:["s3",1],n:["s4",2]},s3:{x:35,y:15,w:["s2",1],charge:!0},s4:{x:20,y:10,s:["s2",2]}},paths:[["s1",3,12],["s2",3,15],["s2",1,5]],patrols:[],patrol_generators:[],start:"s1",objectives:[["s4",[0,1,2]]],gates:[],gate_generators:[]};var q=q||{levels:{}};q.levels[3]={charges:1,spots:{s1:{x:8,y:15,e:["s2",0]},s2:{x:12,y:15,w:["s1",0],e:["s4",1],n:["s3",2]},s3:{x:12,y:10,s:["s2",2]},s4:{x:16,y:15,w:["s2",1],e:["s5",3]},s5:{x:20,y:15,w:["s4",3],e:["s6",4]},s6:{x:24,y:15,w:["s5",4],e:["s7",5],s:["s8",6]},s7:{x:30,y:11,s:["s6",5]},s8:{x:30,y:19,w:["s6",6]}},paths:[["s1",3,4],["s2",3,4],["s2",1,5],["s4",3,4],["s5",3,4],["s6",3,3,2,3,1,1],["s6",5,2,4,2,3,4]],start:"s1",objectives:[["s7",[0,1,2,3,4,5,6]]],patrols:[["s3","s2","s4","s5","s6","s8","s6","s5","s4","s2"]],patrol_generators:[{s:"s8",p:[0]}],gates:[],gate_generators:[]};var q=q||{levels:{}};q.levels[4]={charges:2,spots:{s1:{x:9,y:7,s:["s2",0]},s2:{x:10,y:12,n:["s1",0],e:["s3",1]},s3:{x:14,y:12,w:["s2",1],e:["s4",2],n:["s7",5]},s4:{x:22,y:14,w:["s3",2],e:["s5",3],s:["s6",4]},s5:{x:25,y:11,s:["s4",3]},s6:{x:20,y:17,e:["s4",4]},s7:{x:20,y:8,w:["s3",5]}},paths:[["s1",5,2,4,1,5,2],["s2",3,4],["s3",3,2,4,2,3,4],["s4",3,2,2,1,1,2],["s4",5,2,6,1,7,1],["s3",1,2,2,2,3,4]],start:"s1",objectives:[["s5",[0,1,2,3,4,5]]],patrols:[["s6","s4","s3","s4"]],patrol_generators:[{s:"s6",p:[0]}],gates:[{x:20,y:14,p:2}],gate_generators:[{s:"s7",g:[0],gp:[[5,6]]}]};var q=q||{levels:{}};q.levels[5]={charges:1,spots:{s1:{x:8,y:20,n:["s2",0]},s2:{x:9,y:13,s:["s1",0],n:["s3",1],e:["s4",2]},s3:{x:6,y:12,n:["s2",1],charge:!0},s4:{x:16,y:15,w:["s2",2],s:["s5",3],e:["s7",6]},s5:{x:15,y:20,n:["s4",3],s:["s6",4]},s6:{x:22,y:20,w:["s5",4],n:["s7",5]},s7:{x:19,y:15,w:["s4",6],s:["s6",5],e:["s8",7]},s8:{x:23,y:10,s:["s7",7],w:["s9",8]},s9:{x:19,y:11,e:["s8",8]}},paths:[["s1",1,3,2,1,1,3],["s2",1,2,2,1,1,3,8,1,7,3,6,1,5,2,4,1,5,2],["s2",3,2,4,2,3,3],["s4",5,2,6,1,5,2],["s5",5,1,6,9,3,1,2,10,3,1,6,10,3,1,2,10,3,1,6,10,3,1,2,10,3,1],["s6",1,1,8,3,1,1],["s4",3,3],["s7",3,2,2,2,1,3],["s8",7,2,6,1,7,1]],start:"s1",objectives:[["s8",[0,1,2,3,4,5,6,7,8]]],patrols:[["s5","s4","s7","s6"]],patrol_generators:[{s:"s5",p:[0]}],gates:[{x:18,y:15,p:6}],gate_generators:[{s:"s9",g:[0],gp:[[5,1,6,1,5,2]]}]};var q=q||{levels:{}};q.levels[6]={charges:4,spots:{s1:{x:28,y:18,n:["s2",0]},s2:{x:20,y:14,e:["s1",0],s:["s3",1]},s3:{x:8,y:18,n:["s2",1],w:["s4",2]},s4:{x:4,y:10,s:["s3",2],n:["s5",3],e:["s9",8]},s5:{x:9,y:4,w:["s4",3],e:["s6",4],n:["s10",9]},s6:{x:15,y:4,w:["s5",4],n:["s7",5]},s7:{x:22,y:1,w:["s6",5],s:["s8",6]},s8:{x:19,y:8,e:["s7",6],w:["s9",7]},s9:{x:14,y:9,e:["s8",7],w:["s4",8]},s10:{x:6,y:1,e:["s5",9]}},paths:[["s1",1,2,8,2,7,6],["s2",5,3,6,2,8,2,1,3,7,6,6,2,5,2],["s3",7,2,8,2,1,6],["s4",1,3,2,3,3,2],["s5",3,6],["s6",1,2,2,1,3,6],["s7",5,6,6,1,7,2],["s8",7,2,6,1,7,2],["s9",7,6,6,1,7,3],["s5",1,2,8,1,7,2]],start:"s1",objectives:[["s4",[0,1,2,3,4,8,7,6]],["s7",[5,4,9,3]]],patrols:[["s10","s5","s6","s7","s8","s9","s4","s5"],["s8","s9","s4","s5","s10","s5","s6","s7"]],patrol_generators:[{s:"s10",p:[0,1]}],gates:[{x:11,y:9,p:8}],gate_generators:[{s:"s9",g:[0],gp:[[6,1,7,1,8,1]]}],end_of_game:!0}}();