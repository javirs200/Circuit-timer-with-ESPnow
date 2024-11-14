(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();function y(){if("serial"in navigator){const o=document.querySelector("#connector"),n=document.querySelector("#timetable"),r=document.querySelector("#timeContainer"),e=document.querySelector("#bestLap");o.addEventListener("click",async()=>{const t=await navigator.serial.requestPort();await t.open({baudRate:115200});const i=t.readable.getReader();let a=0,u=0;for(;;){const{value:b,done:h}=await i.read();if(h){i.releaseLock();break}const d=new TextDecoder().decode(b);if(d.includes("time:")){u++;const c=d.trim().split(" ")[1],m=s(c);r.textContent=m;const l=document.createElement("tr"),p=document.createElement("td"),f=document.createElement("td");p.textContent=u.toString(),f.textContent=m,l.appendChild(p),l.appendChild(f),n.appendChild(l),(a===0||parseInt(c)<a)&&(a=parseInt(c),e.textContent="best:"+s(c))}if(d.includes("done")){await t.close();break}}await t.close()})}else console.error("Web Serial API is not supported.");function s(o){const n=parseInt(o),r=Math.floor(n/6e4),e=(n%6e4/1e3).toFixed(3);return r+":"+(parseInt(e)<10?"0":"")+e}}document.querySelector("#app").innerHTML=`
  <section>
      <div class="bigCard">
        <h1 class="time" id="timeContainer">
      </div>
  </section>
  <section>
  <button id="connector" type="button">connect</button>
    <h2 id="bestLap"></h2>
    <section class="card">
      <h3>Timetable</h3>
      <table id="timetable"></table>
    </section>
  </section>
`;y();
