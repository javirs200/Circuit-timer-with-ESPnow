export function setupListener() {
    if ("serial" in navigator) {
        // The Web Serial API is supported.

        // Get the elements from the DOM.
        const connector = document.querySelector<HTMLButtonElement>('#connector')!;
        const timetable = document.querySelector<HTMLTextAreaElement>('#timetable')!;
        const timeContainer = document.querySelector<HTMLHeadingElement>('#timeContainer')!;
        const bestLapContainer = document.querySelector<HTMLHeadingElement>('#bestLap')!;
        const input = document.querySelector<HTMLInputElement>('#input')!;
        const send = document.querySelector<HTMLButtonElement>('#send')!;
        const inLablel = document.querySelector<HTMLLabelElement>('#inLablel')!;

        let newdb: number = 0;

        // Add click event listener to the send button.
        send.addEventListener('click', async () => {
            // Get the value from the input field.
            newdb = parseInt(input.value);
            // Clear the input field.
            input.value = '';
            // console.log('newdb:', newdb);
        });

        // Prompt user to select any serial port.
        connector.addEventListener('click', async () => {
            // Prompt user to select any serial port.
            const port = await (navigator as any).serial.requestPort();

            // Wait for the port to open. 115200 is the default baud rate for esp32.
            await port.open({ baudRate: 115200 });

            // Setup a reader to read data from the serial port.
            const reader = port.readable.getReader();
            // Setup a writer to write data to the serial port.
            const writer = port.writable.getWriter();

            let bestLap = 0;
            let laps = 0;

            let recived: number[] = []

            // Create a TextDecoder to decode the data into a string.
            const textDecoder = new TextDecoder();
            let text: string = '';

            async function sendDb() {
                while (true) {
                    // if the message is not undefined, send it to the serial port
                    if (newdb !== 0) {
                        let bytes = new TextEncoder().encode(newdb.toString()+ '\n');
                        console.log('sending message: ' + newdb + ' as bytes: ' + bytes)
                        await writer.write(bytes).then(() => {
                            console.log('message sent');
                        });
                        newdb = 0;
                    }
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }

            async function read() {

                // Read data from the serial port.
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) {
                        // Allow the serial port to be closed later.
                        reader.releaseLock();
                        break;
                    }

                    // Convert the data into a string.
                    (value as Uint8Array).forEach((element) => {
                        if (element === 10) {
                            text = textDecoder.decode(new Uint8Array(recived));
                            // console.log('recived:', text);
                            recived = []
                        } else {
                            recived.push(element)
                        }
                    });

                    if (text.includes('dbTreshold:')){
                        const dbTreshold = text.trim().split(':')[1];
                        console.log('dbTreshold text:', text);
                        inLablel.textContent = 'db : ' + dbTreshold;
                    }

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

                    
                }

            }

            // Start the read function.
            read();
            // Start the send function
            sendDb();

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