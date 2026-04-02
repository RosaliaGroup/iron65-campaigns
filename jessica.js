var jH=[],jL={name:'',email:'',phone:'',unit:'',preq:{}};
var jSys="You are Jessica, Iron65\u2019s warm and friendly virtual leasing concierge. Your ONLY goal is to capture the visitor\u2019s name, email, phone number, and preferred unit \u2014 then book them a tour. Be conversational, never robotic.\n\nPRICING:\nStudio from $2,388 | Studio Flex from $2,499 | 1BR Flex from $2,650 | 1BR from $2,788 | Loft from $3,788\n\nKEY FACTS:\n- 65 McWhorter St, Newark NJ 07105\n- Built 2024, Ironbound District\n- 8-10 NYC blocks to Newark Penn (~10 min walk)\n- 20 min to Midtown via NJ Transit | 22 min to WTC via PATH | 5 min to EWR\n- No NYC income tax for NJ residents (saves $3K-$9K/yr)\n- Amenities: rooftop gym, yoga studio, cold plunge, saunas, rooftop terrace NYC views, outdoor kitchen, game room, 24-hr security, in-unit W/D, quartz countertops, fiber internet\n- Currently: Up to 1 month free on select units\n- Tours: Book directly in chat\n- Phone: (908) 699-6500\n\nRULES:\n- Max 2-3 sentences per response\n- Always be moving toward booking\n- Never say I apologize \u2014 say Let me get Ana to help \u2014 call (908) 699-6500\n- Reference the current special: up to 1 month free on select units";
var jselected='';
var jpreqAnswers={};

function jtoggle(){
  var w=document.getElementById('jwin'),b=document.getElementById('jbtn');
  if(w.style.display==='none'){
    w.style.display='block';b.style.transform='scale(0)';
    setTimeout(function(){b.style.display='none'},150);
    if(!document.getElementById('jmsgs').children.length){
      jbot("Hi! I\u2019m Jessica \uD83D\uDC4B I\u2019m here to help you find your perfect Iron65 home and book a tour. What can I help with?");
      jpill(["\uD83D\uDCC5 Book a Tour","\uD83D\uDCB0 Pricing","\uD83C\uDFCB\uFE0F Amenities","\uD83D\uDE87 Transit"]);
    }
  }else{
    w.style.display='none';b.style.display='flex';
    setTimeout(function(){b.style.transform='scale(1)'},10);
  }
}

function jbot(t){
  var m=document.getElementById('jmsgs');
  var d=document.createElement('div');
  d.style.cssText='background:#1c1a16;border:1px solid rgba(200,169,110,0.1);padding:8px 11px;border-radius:8px;border-top-left-radius:3px;color:rgba(245,240,232,0.8);font-size:12px;line-height:1.55;max-width:88%';
  d.innerHTML=t;m.appendChild(d);m.scrollTop=m.scrollHeight;
}

function jusr(t){
  var m=document.getElementById('jmsgs');
  var d=document.createElement('div');
  d.style.cssText='background:#C8A96E;padding:8px 11px;border-radius:8px;border-top-right-radius:3px;color:#000;font-size:12px;line-height:1.5;max-width:88%;align-self:flex-end';
  d.textContent=t;m.appendChild(d);m.scrollTop=m.scrollHeight;
}

function jpill(arr){
  var q=document.getElementById('jpills');q.innerHTML='';q.style.display='flex';
  arr.forEach(function(l){
    var b=document.createElement('button');b.textContent=l;
    b.style.cssText='background:transparent;border:1px solid rgba(200,169,110,0.25);color:rgba(200,169,110,0.85);font-size:10px;padding:5px 10px;border-radius:20px;cursor:pointer;font-family:Montserrat,sans-serif;letter-spacing:0.5px;transition:all 0.2s;white-space:nowrap';
    b.onmouseover=function(){this.style.background='rgba(200,169,110,0.08)';this.style.borderColor='#C8A96E'};
    b.onmouseout=function(){this.style.background='transparent';this.style.borderColor='rgba(200,169,110,0.25)'};
    b.onclick=function(){jpclick(l)};
    q.appendChild(b);
  });
}

function jhidepills(){var q=document.getElementById('jpills');q.style.display='none';q.innerHTML='';}

function jpclick(l){
  jhidepills();
  var c=l.replace(/^\S+\s*/,'').trim();
  jusr(c);

  if(l.indexOf('Book a Tour')!==-1){
    jbot('Great choice! What size unit are you looking for?');
    jpill(['Studio $2,388+','Studio Flex $2,499+','1BR Flex $2,650+','1BR $2,788+','Loft $3,788+']);
  }else if(l.indexOf('$')!==-1){
    jL.unit=c;
    jbot("Perfect! I\u2019ll need a few details to set up your tour:");
    jshowform();
  }else if(l.indexOf('Pricing')!==-1){
    jbot('Studios from <strong>$2,388</strong>, Studio Flex <strong>$2,499</strong>, 1BR Flex <strong>$2,650</strong>, 1BR <strong>$2,788</strong>, Lofts <strong>$3,788</strong>. Plus up to 1 month free on select units!');
    setTimeout(function(){jpill(["\uD83D\uDCC5 Ready to see it in person?"])},400);
  }else if(l.indexOf('Ready')!==-1){
    jbot('Awesome! What size interests you?');
    jpill(['Studio $2,388+','Studio Flex $2,499+','1BR Flex $2,650+','1BR $2,788+','Loft $3,788+']);
  }else if(l.indexOf('Amenities')!==-1){
    jbot('<strong>Rooftop gym</strong> with NYC views, <strong>yoga studio</strong>, <strong>cold plunge & saunas</strong>, outdoor kitchen, game room, 24-hr security, in-unit W/D, quartz countertops, fiber internet. All included!');
    setTimeout(function(){jpill(["\uD83D\uDCC5 Book a Tour"])},400);
  }else if(l.indexOf('Transit')!==-1){
    jbot('<strong>10 min walk</strong> to Newark Penn. <strong>20 min</strong> to Midtown, <strong>22 min</strong> to WTC via PATH, <strong>5 min</strong> to EWR. No NYC income tax saves $3K\u2013$9K/yr!');
    setTimeout(function(){jpill(["\uD83D\uDCC5 Book a Tour"])},400);
  }else{
    japi(c);
  }
}

function jshowform(){
  jhidepills();
  var f=document.getElementById('jform');f.style.display='block';
  f.innerHTML='<div style="padding:0 2px;width:100%;box-sizing:border-box">'
    +'<input class="jfld" id="jfn" type="text" placeholder="Your full name *">'
    +'<input class="jfld" id="jfe" type="email" placeholder="Email address *">'
    +'<input class="jfld" id="jfp" type="tel" placeholder="Phone number *">'
    +'<button onclick="jsubmit()" style="background:#C8A96E;color:#000;border:none;border-radius:6px;padding:9px;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;width:100%;cursor:pointer;font-family:Montserrat,sans-serif;margin-top:4px">Next \u2014 Qualifying Questions \u2192</button>'
    +'</div>';
  setTimeout(function(){var el=document.getElementById('jfn');if(el)el.focus();},100);
}

function jsubmit(){
  var n=document.getElementById('jfn').value.trim();
  var e=document.getElementById('jfe').value.trim();
  var p=document.getElementById('jfp').value.trim();

  var valid=true;
  if(!n){document.getElementById('jfn').style.borderColor='rgba(220,80,60,0.6)';valid=false;}
  if(!e){document.getElementById('jfe').style.borderColor='rgba(220,80,60,0.6)';valid=false;}
  if(!p){document.getElementById('jfp').style.borderColor='rgba(220,80,60,0.6)';valid=false;}
  if(!valid){jbot('Please fill in all three fields \u2014 name, email, and phone are all required.');return;}

  jL.name=n;jL.email=e;jL.phone=p;
  document.getElementById('jform').style.display='none';
  jusr(n+' \u2022 '+e+' \u2022 '+p);
  jbot('Thanks '+n+'! A few quick questions to make sure Ana is prepared for your visit:');

  // Save initial lead
  fetch('/.netlify/functions/save-lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:n,email:e,phone:p,source:'jessica-chatbot',page:window.location.pathname,message:jL.unit||'',status:'new'})}).catch(function(){});

  setTimeout(jshowPreQual,400);
}

function jshowPreQual(){
  jpreqAnswers={};
  var f=document.getElementById('jform');f.style.display='block';
  f.innerHTML='<div style="padding:0 4px;width:100%;box-sizing:border-box;font-family:Montserrat,sans-serif">'
    +'<div style="font-size:9px;color:#C8A96E;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:6px;margin-top:4px">When are you looking to move in?</div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-bottom:12px" id="grp-move">'
    +'<button class="jpreq-btn" onclick="jpreq(this,\'move\',\'ASAP \u2014 within 30 days\',\'grp-move\')">ASAP</button>'
    +'<button class="jpreq-btn" onclick="jpreq(this,\'move\',\'1\u20132 months\',\'grp-move\')">1\u20132 months</button>'
    +'<button class="jpreq-btn" onclick="jpreq(this,\'move\',\'3\u20136 months\',\'grp-move\')">3\u20136 months</button>'
    +'<button class="jpreq-btn" onclick="jpreq(this,\'move\',\'Just exploring\',\'grp-move\')">Just exploring</button>'
    +'</div>'
    +'<div style="font-size:9px;color:#C8A96E;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:6px">Monthly budget?</div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-bottom:12px" id="grp-budget">'
    +'<button class="jpreq-btn" onclick="jpreq(this,\'budget\',\'Under $2,500/mo\',\'grp-budget\')">Under $2,500</button>'
    +'<button class="jpreq-btn" onclick="jpreq(this,\'budget\',\'$2,500\u2013$3,000/mo\',\'grp-budget\')">$2,500\u2013$3,000</button>'
    +'<button class="jpreq-btn" onclick="jpreq(this,\'budget\',\'$3,000\u2013$4,000/mo\',\'grp-budget\')">$3,000\u2013$4,000</button>'
    +'<button class="jpreq-btn" onclick="jpreq(this,\'budget\',\'$4,000+/mo\',\'grp-budget\')">$4,000+</button>'
    +'</div>'
    +'<div style="font-size:9px;color:#C8A96E;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:6px">Credit score?</div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-bottom:12px" id="grp-credit">'
    +'<button class="jpreq-btn" onclick="jpreq(this,\'credit\',\'700+\',\'grp-credit\')">700+</button>'
    +'<button class="jpreq-btn" onclick="jpreq(this,\'credit\',\'650\u2013699\',\'grp-credit\')">650\u2013699</button>'
    +'<button class="jpreq-btn" onclick="jpreq(this,\'credit\',\'Below 650\',\'grp-credit\')">Below 650</button>'
    +'<button class="jpreq-btn" onclick="jpreq(this,\'credit\',\'Not sure\',\'grp-credit\')">Not sure</button>'
    +'</div>'
    +'<div style="font-size:9px;color:#C8A96E;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:6px">Employment / income?</div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-bottom:12px" id="grp-income">'
    +'<button class="jpreq-btn" onclick="jpreq(this,\'income\',\'Employed W2\',\'grp-income\')">Employed W2</button>'
    +'<button class="jpreq-btn" onclick="jpreq(this,\'income\',\'Self-employed\',\'grp-income\')">Self-employed</button>'
    +'<button class="jpreq-btn" onclick="jpreq(this,\'income\',\'Guarantor/Co-signer\',\'grp-income\')">Guarantor</button>'
    +'<button class="jpreq-btn" onclick="jpreq(this,\'income\',\'Other\',\'grp-income\')">Other</button>'
    +'</div>'
    +'<button id="jpreqbtn" onclick="jfinishPreQual()" disabled style="background:#C8A96E;color:#000;border:none;border-radius:6px;padding:9px;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;width:100%;cursor:pointer;font-family:Montserrat,sans-serif;opacity:0.35;margin-top:4px;transition:opacity 0.3s">Show Me Available Times \u2192</button>'
    +'</div>';
}

function jpreq(el,key,val,grpId){
  var grp=document.getElementById(grpId);
  var btns=grp.querySelectorAll('.jpreq-btn');
  for(var i=0;i<btns.length;i++){
    btns[i].style.background='transparent';
    btns[i].style.borderColor='rgba(200,169,110,0.25)';
    btns[i].style.color='rgba(200,169,110,0.85)';
    btns[i].style.fontWeight='400';
  }
  el.style.background='rgba(200,169,110,0.18)';
  el.style.borderColor='#C8A96E';
  el.style.color='#C8A96E';
  el.style.fontWeight='600';
  jpreqAnswers[key]=val;
  if(Object.keys(jpreqAnswers).length>=4){
    var btn=document.getElementById('jpreqbtn');
    if(btn){btn.disabled=false;btn.style.opacity='1';}
  }
}

function jfinishPreQual(){
  var q=jpreqAnswers;
  document.getElementById('jform').style.display='none';
  if(q.credit==='Below 650'){
    jbot('Thanks for being upfront, '+jL.name+'! A credit score below 650 may require a guarantor or additional deposit. Ana can walk you through the options in person \u2014 let\u2019s still get you a tour. Pick a time:');
  }else{
    jbot('Great \u2014 you\u2019re all set! '+(jL.unit?jL.unit+' looks like a great fit':'We have units that fit your budget')+'. Let me show you available tour times:');
  }
  jL.preq=q;
  jL.unit=jL.unit||q.budget||'';
  setTimeout(jshowslots,400);
}

function jshowslots(){
  var slots=[];
  var now=new Date();
  var dayNames=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var monthNames=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var tourTimes={2:['12:00 PM','2:00 PM','4:00 PM','6:00 PM'],3:['12:00 PM','2:00 PM','4:00 PM','6:00 PM'],4:['12:00 PM','2:00 PM','4:00 PM','6:00 PM'],5:['12:00 PM','2:00 PM','4:00 PM'],6:['12:00 PM','1:00 PM','2:00 PM','3:00 PM'],0:['12:00 PM','1:00 PM','2:00 PM','3:00 PM']};
  var d=new Date(now);d.setDate(d.getDate()+1);
  var count=0;
  while(slots.length<8&&count<30){
    var dow=d.getDay();
    if(tourTimes[dow]){
      var times=tourTimes[dow];
      var time=times[Math.floor(slots.length/3)%times.length]||times[0];
      var label=dayNames[dow]+' '+monthNames[d.getMonth()]+' '+d.getDate()+' \u00B7 '+time;
      slots.push(label);
    }
    d.setDate(d.getDate()+1);count++;
  }
  var unique=[];
  for(var i=0;i<slots.length;i++){if(unique.indexOf(slots[i])===-1)unique.push(slots[i]);}
  unique=unique.slice(0,8);

  var s=document.getElementById('jslots');s.style.display='block';
  var html='<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px">';
  for(var i=0;i<unique.length;i++){
    html+='<div class="jslot" onclick="jselslot(this,\''+unique[i].replace(/'/g,"\\'")+'\')">'+unique[i]+'</div>';
  }
  html+='</div><div style="padding:4px 0 0"><button id="jconfbtn" onclick="jconfirm()" disabled style="background:#C8A96E;color:#000;border:none;border-radius:6px;padding:9px;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;width:100%;cursor:pointer;font-family:Montserrat,sans-serif;opacity:0.4">Confirm My Tour \u2192</button></div>';
  s.innerHTML=html;
}

function jselslot(el,slot){
  jselected=slot;
  var all=document.getElementById('jslots').querySelectorAll('.jslot');
  for(var i=0;i<all.length;i++){
    all[i].style.background='rgba(200,169,110,0.06)';
    all[i].style.borderColor='rgba(200,169,110,0.15)';
    all[i].style.color='rgba(245,240,232,0.7)';
  }
  el.style.background='rgba(200,169,110,0.18)';
  el.style.borderColor='#C8A96E';
  el.style.color='#C8A96E';
  var btn=document.getElementById('jconfbtn');
  if(btn){btn.disabled=false;btn.style.opacity='1';}
}

function jconfirm(){
  if(!jselected)return;
  var slot=jselected;
  var preqSummary='Move: '+(jpreqAnswers.move||'?')+' | Budget: '+(jpreqAnswers.budget||'?')+' | Credit: '+(jpreqAnswers.credit||'?')+' | Income: '+(jpreqAnswers.income||'?');

  fetch('/.netlify/functions/save-lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:jL.name,email:jL.email,phone:jL.phone,source:'jessica-booked',page:window.location.pathname,message:(jL.unit||'')+' | '+preqSummary,status:'tour_scheduled',tourSlot:slot})}).catch(function(){});

  document.getElementById('jslots').style.display='none';
  document.getElementById('jinbar').style.display='none';
  jusr('Confirmed: '+slot);
  jbot('You\u2019re booked, '+jL.name+'! \uD83C\uDF89');

  var m=document.getElementById('jmsgs');
  var d=document.createElement('div');
  d.style.cssText='background:rgba(200,169,110,0.06);border:1px solid rgba(200,169,110,0.2);border-radius:8px;padding:12px;font-size:11px;line-height:1.8;color:rgba(245,240,232,0.75);margin-top:8px';
  d.innerHTML='\uD83D\uDCCD 65 McWhorter St, Newark NJ 07105<br>\uD83D\uDCC5 '+slot+'<br>\uD83D\uDCE7 Confirmation sent to '+jL.email+'<br>\uD83D\uDCDE Questions? Call (908) 699-6500<br><div style="margin-top:10px;font-size:11px;color:rgba(200,169,110,0.7);font-family:Montserrat,sans-serif">Ana Haynes will personally greet you. See you soon!</div>';
  m.appendChild(d);m.scrollTop=m.scrollHeight;
}

async function japi(msg){
  jH.push({role:'user',content:msg});
  var m=document.getElementById('jmsgs');
  var t=document.createElement('div');t.id='jtyp';
  t.style.cssText='color:rgba(200,169,110,0.4);font-size:11px;font-style:italic;padding:4px';
  t.textContent='Jessica is typing...';m.appendChild(t);m.scrollTop=m.scrollHeight;
  try{
    var r=await fetch('/.netlify/functions/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({system:jSys,messages:jH})});
    var d=await r.json();
    var el=document.getElementById('jtyp');if(el)el.remove();
    var reply=d.content&&d.content[0]?d.content[0].text:'Let me get Ana to help \u2014 call (908) 699-6500!';
    jH.push({role:'assistant',content:reply});
    jbot(reply.replace(/</g,'&lt;').replace(/\n/g,'<br>'));
    if(reply.toLowerCase().match(/book|tour|visit/))setTimeout(function(){jpill(["\uD83D\uDCC5 Book a Tour"])},500);
  }catch(e){
    var el=document.getElementById('jtyp');if(el)el.remove();
    jbot('Let me get Ana to help \u2014 call <a href="tel:9086996500" style="color:#C8A96E">(908) 699-6500</a>!');
  }
}

async function jsend(){
  var input=document.getElementById('jin');
  var msg=input.value.trim();if(!msg)return;input.value='';
  jusr(msg);jhidepills();japi(msg);
}
