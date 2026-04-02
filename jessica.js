var jH=[],jL={name:'',email:'',phone:'',unit:''};
var jSys="You are Jessica, Iron65\u2019s warm and friendly virtual leasing concierge. Your ONLY goal is to capture the visitor\u2019s name, email, phone number, and preferred unit \u2014 then book them a tour. Be conversational, never robotic.\n\nPRICING:\nStudio from $2,388 | Studio Flex from $2,499 | 1BR Flex from $2,650 | 1BR from $2,788 | Loft from $3,788\n\nKEY FACTS:\n- 65 McWhorter St, Newark NJ 07105\n- Built 2024, Ironbound District\n- 8-10 NYC blocks to Newark Penn (~10 min walk)\n- 20 min to Midtown via NJ Transit | 22 min to WTC via PATH | 5 min to EWR\n- No NYC income tax for NJ residents (saves $3K-$9K/yr)\n- Amenities: rooftop gym, yoga studio, cold plunge, saunas, rooftop terrace NYC views, outdoor kitchen, game room, 24-hr security, in-unit W/D, quartz countertops, fiber internet\n- Currently: Up to 1 month free on select units\n- Tours: Book directly in chat\n- Phone: (908) 699-6500\n\nRULES:\n- Max 2-3 sentences per response\n- Always be moving toward booking\n- Never say I apologize \u2014 say Let me get Ana to help \u2014 call (908) 699-6500\n- Reference the current special: up to 1 month free on select units";
var jSlots=['Sat 1:00 PM','Sat 3:00 PM','Sun 1:00 PM','Sun 2:00 PM','Tue 12:00 PM','Wed 2:00 PM','Thu 3:00 PM','Fri 12:00 PM'];

function jtoggle(){
  var w=document.getElementById('jwin'),b=document.getElementById('jbtn');
  if(w.style.display==='none'){
    w.style.display='block';b.style.transform='scale(0)';
    setTimeout(function(){b.style.display='none'},150);
    if(!document.getElementById('jmsgs').children.length){
      jbot("Hi! I'm Jessica \uD83D\uDC4B I'm here to help you find your perfect Iron65 home and book a tour. What can I help with?");
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

function jhidepills(){document.getElementById('jpills').style.display='none';}

function jpclick(l){
  jhidepills();
  // Strip leading emoji
  var c=l.replace(/^\S+\s*/,'').trim();
  jusr(c);

  if(l.indexOf('Book a Tour')!==-1){
    jbot('Great choice! What size unit are you looking for?');
    jpill(['Studio $2,388+','Studio Flex $2,499+','1BR Flex $2,650+','1BR $2,788+','Loft $3,788+']);
  }else if(l.indexOf('$')!==-1){
    jL.unit=c;
    jbot("Perfect! Just a few quick details and I\u2019ll show you tour times:");
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
  f.innerHTML='<input id="jfn" placeholder="Your name" style="background:rgba(255,255,255,0.03);border:1px solid rgba(200,169,110,0.18);border-radius:6px;padding:8px 10px;font-size:11px;color:#f5f0e8;margin-bottom:5px;width:100%;outline:none;font-family:Montserrat,sans-serif;box-sizing:border-box"><input id="jfe" type="email" placeholder="Email address" style="background:rgba(255,255,255,0.03);border:1px solid rgba(200,169,110,0.18);border-radius:6px;padding:8px 10px;font-size:11px;color:#f5f0e8;margin-bottom:5px;width:100%;outline:none;font-family:Montserrat,sans-serif;box-sizing:border-box"><input id="jfp" type="tel" placeholder="Phone (optional)" style="background:rgba(255,255,255,0.03);border:1px solid rgba(200,169,110,0.18);border-radius:6px;padding:8px 10px;font-size:11px;color:#f5f0e8;margin-bottom:5px;width:100%;outline:none;font-family:Montserrat,sans-serif;box-sizing:border-box"><button onclick="jsubmit()" style="background:#C8A96E;color:#000;border:none;border-radius:6px;padding:9px;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;width:100%;cursor:pointer;font-family:Montserrat,sans-serif">Get Tour Times \u2192</button>';
  document.getElementById('jfn').focus();
}

function jsubmit(){
  var n=document.getElementById('jfn').value.trim();
  var e=document.getElementById('jfe').value.trim();
  var p=document.getElementById('jfp').value.trim();
  if(!n||!e){jbot('I just need your name and email to pull up times!');return;}
  jL.name=n;jL.email=e;jL.phone=p;
  document.getElementById('jform').style.display='none';
  jusr(n+' \u2022 '+e+(p?' \u2022 '+p:''));
  jbot('Thanks, '+n+'! Pick a time that works:');
  jshowslots();
}

function jshowslots(){
  var s=document.getElementById('jslots');s.style.display='block';
  var html='<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px">';
  jSlots.forEach(function(t){
    html+='<button onclick="jbook(\''+t+'\')" style="background:rgba(200,169,110,0.06);border:1px solid rgba(200,169,110,0.15);border-radius:6px;padding:7px 6px;font-size:10px;color:rgba(245,240,232,0.7);cursor:pointer;text-align:center;font-family:Montserrat,sans-serif;transition:all 0.15s" onmouseover="this.style.background=\'rgba(200,169,110,0.18)\';this.style.borderColor=\'#C8A96E\';this.style.color=\'#C8A96E\'" onmouseout="this.style.background=\'rgba(200,169,110,0.06)\';this.style.borderColor=\'rgba(200,169,110,0.15)\';this.style.color=\'rgba(245,240,232,0.7)\'">'+t+'</button>';
  });
  html+='</div>';
  s.innerHTML=html;
}

function jbook(slot){
  document.getElementById('jslots').style.display='none';
  document.getElementById('jinbar').style.display='none';
  jbot("You\u2019re booked, "+jL.name+"! \uD83C\uDF89");
  var c=document.getElementById('jconf');c.style.display='block';
  c.innerHTML='<div style="background:rgba(200,169,110,0.06);border:1px solid rgba(200,169,110,0.2);border-radius:8px;padding:12px;font-size:11px;line-height:1.8;color:rgba(245,240,232,0.75)"><div style="text-align:center;font-size:20px;margin-bottom:4px">\u2705</div><div style="text-align:center;color:#C8A96E;font-weight:700;font-size:13px;margin-bottom:8px">Tour Confirmed</div><strong>'+jL.name+'</strong><br>'+jL.email+'<br><strong>'+slot+'</strong><br>65 McWhorter St, Newark NJ 07105<br><br><div style="text-align:center;margin-bottom:6px"><a href="https://calendly.com/ana-rosaliagroup/65-iron-tour" target="_blank" style="display:inline-block;background:#C8A96E;color:#000;padding:7px 16px;border-radius:6px;text-decoration:none;font-weight:700;font-size:10px;letter-spacing:1px;text-transform:uppercase">Add to Calendar</a></div><div style="text-align:center;color:rgba(200,169,110,0.5);font-size:9px">Ana will call/text to confirm within the hour</div></div>';
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
