import './style.css'
import { setupListener } from './listener.ts'

// ths is the entry point of the web application and insdide of main
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
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
`
setupListener()