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
  <button id="connector" type="button">connect</button>
    <h2 id="bestLap"></h2>
    <section class="card">
      <h3>Timetable</h3>
      <table id="timetable"></table>
    </section>
  </section>
`
setupListener()