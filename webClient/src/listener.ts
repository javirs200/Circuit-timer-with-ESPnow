export function setupListener() {
    if ("serial" in navigator) {
        // The Web Serial API is supported.

        // Get the elements from the DOM.
        const connector = document.querySelector<HTMLButtonElement>('#connector')!;
        const timetable = document.querySelector<HTMLTextAreaElement>('#timetable')!;
        const timeContainer = document.querySelector<HTMLHeadingElement>('#timeContainer')!;
        const bestLapContainer = document.querySelector<HTMLHeadingElement>('#bestLap')!;

        // Prompt user to select any serial port.
        connector.addEventListener('click', async () => {
            // Prompt user to select any serial port.
            const port = await (navigator as any).serial.requestPort();

            // Wait for the port to open. 115200 is the default baud rate for esp32.
            await port.open({ baudRate: 115200 });

            // Setup a reader to read data from the serial port.
            const reader = port.readable.getReader();

            let bestLap = 0;
            let laps = 0;

            // Read data from the serial port.
            while (true) {
                const { value, done } = await reader.read();
                if (done) {
                    // Allow the serial port to be closed later.
                    reader.releaseLock();
                    break;
                }
                //transform the data from Uint8Array to a string
                const textDecoder = new TextDecoder();
                const text = textDecoder.decode(value);

                if (text.includes('time:')) {
                    laps++;
                    // trim the string to get the time
                    const time = text.trim().split(' ')[1];

                    //format the time from milliseconds to ss:mm.miliseconds
                    const formatedtime = convertTimeToFormattedString(time);

                    // display the time in the timeContainer
                    timeContainer.textContent = formatedtime;

                    // display the data in the output table
                    const tr = document.createElement('tr');
                    const lapnumber = document.createElement('td');
                    const laptime = document.createElement('td');
                    lapnumber.textContent = laps.toString();
                    laptime.textContent = formatedtime;

                    tr.appendChild(lapnumber);
                    tr.appendChild(laptime);

                    timetable.appendChild(tr);
                                       
                    // calculate the best lap
                    if (bestLap === 0 || parseInt(time) < bestLap) {
                        bestLap = parseInt(time);
                        bestLapContainer.textContent = "best:" + convertTimeToFormattedString(time);
                    }
                }

                // if the data contains the string "done", close the serial port
                if (text.includes('done')) {
                    await port.close();
                    break;
                }
            }

            // Close the serial port.
            await port.close();
        });
    } else {
        // The Web Serial API is not supported.
        // Inform user.
        console.error('Web Serial API is not supported.');
    }

    function convertTimeToFormattedString(time: string) {
        const timeInMilliseconds = parseInt(time);
        const minutes = Math.floor(timeInMilliseconds / 60000);
        const Milliseconds = ((timeInMilliseconds % 60000) / 1000).toFixed(3);
        const formatedtime = minutes + ':' + (parseInt(Milliseconds) < 10 ? '0' : '') + Milliseconds;
        return formatedtime;
    }
}