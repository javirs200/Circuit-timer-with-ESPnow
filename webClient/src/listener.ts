export function setupListener() {
    if ("serial" in navigator) {
        // The Web Serial API is supported.

        // Get the elements from the DOM.
        const connector = document.querySelector<HTMLButtonElement>('#connector')!;
        const disconnector = document.querySelector<HTMLButtonElement>('#disconnector')!;
        const output = document.querySelector<HTMLTextAreaElement>('#output')!;

        // Prompt user to select any serial port.
        connector.addEventListener('click', async () => {
            // Prompt user to select any serial port.
            const port = await (navigator as any).serial.requestPort();

            // Wait for the port to open. 115200 is the default baud rate for esp32.
            await port.open({ baudRate: 115200 });

            // if serial port is open, hide the connect button and show the disconnect button
            connector.hidden = true;
            disconnector.hidden = false;

            // Setup a reader to read data from the serial port.
            const reader = port.readable.getReader();

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

                // Append the data to the textarea element.
                output.value += text;

                // Scroll to the bottom of the textarea element.
                output.scrollTop = output.scrollHeight;

                // if the data contains the string "done", close the serial port
                if (text.includes('done')) {
                    await port.close();
                    // if serial port is closed, hide the disconnect button and show the connect button
                    connector.hidden = false;
                    disconnector.hidden = true;
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
}