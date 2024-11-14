import './style.css'
import { setupCounter } from './counter.ts'
import { setupListener } from './listener.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Counter</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p>COM Port Selector<p>
    <button id="connector" type="button">connect</button>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

setupListener(document.querySelector<HTMLButtonElement>('#connector')!)