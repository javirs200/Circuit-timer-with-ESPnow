(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();function T(){if("serial"in navigator){const o=document.querySelector("#connector"),r=document.querySelector("#timetable"),i=document.querySelector("#timeContainer"),e=document.querySelector("#bestLap"),t=document.querySelector("#input"),a=document.querySelector("#send"),w=document.querySelector("#inLablel");let l=0;a.addEventListener("click",async()=>{l=parseInt(t.value),t.value=""}),o.addEventListener("click",async()=>{const u=await navigator.serial.requestPort();await u.open({baudRate:115200});const f=u.readable.getReader(),S=u.writable.getWriter();let m=0,y=0,p=[];const v=new TextDecoder;let s="";async function C(){for(;;){if(l!==0){let c=new TextEncoder().encode(l.toString()+`
`);console.log("sending message: "+l+" as bytes: "+c),await S.write(c).then(()=>{console.log("message sent")}),l=0}await new Promise(c=>setTimeout(c,1e3))}}async function x(){for(;;){const{value:c,done:q}=await f.read();if(q){f.releaseLock();break}if(c.forEach(n=>{n===10?(s=v.decode(new Uint8Array(p)),p=[]):p.push(n)}),s.includes("dbTreshold:")){const n=s.trim().split(":")[1];console.log("dbTreshold text:",s),w.textContent="db : "+n}if(s.includes("time:")){y++;const n=s.trim().split(" ")[1],h=d(n);i.textContent=h;const b=document.createElement("tr"),g=document.createElement("td"),L=document.createElement("td");g.textContent=y.toString(),L.textContent=h,b.appendChild(g),b.appendChild(L),r.appendChild(b),(m===0||parseInt(n)<m)&&(m=parseInt(n),e.textContent="best:"+d(n))}}}x(),C()})}else console.error("Web Serial API is not supported.");function d(o){const r=parseInt(o),i=Math.floor(r/6e4),e=(r%6e4/1e3).toFixed(3);return i+":"+(parseInt(e)<10?"0":"")+e}}document.querySelector("#app").innerHTML=`
  <section>
      <div class="bigCard">
        <h1 class="time" id="timeContainer">
      </div>
  </section>
  <section>
    <h1>Settings</h1>
    <label id="inLablel" for="input">db :-50</label>
    <input type="number" id="input" placeholder="enter setting">
    <button id="send" type="button">Send</button>
  <button id="connector" type="button">connect</button>
    <h2 id="bestLap"></h2>
    <section class="card">
      <h3>Timetable</h3>
      <table id="timetable"></table>
    </section>
  </section>
`;T();
