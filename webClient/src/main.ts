import './style.css'
import { setupListener } from './listener.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Serial port</h1>
    <div class="card">
    <p>COM Port Selector<p>
    <button id="connector" type="button">connect</button>
    <button id="disconnector" type="button" hidden>connect</button>
    </div>
    <div class="card">
      <textarea id="output" rows="10" cols="50"></textarea>
    </div>
  </div>
`

setupListener()