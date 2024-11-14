export function setupListener(element: HTMLButtonElement) {
    if ("serial" in navigator) {
        // The Web Serial API is supported.
        // Prompt user to select any serial port.
        element.addEventListener('click', async () => {
            // Prompt user to select any serial port.
            const port = await navigator.serial.requestPort();

            // Wait for the port to open. 115200 is the default baud rate for esp32.
            await port.open({ baudRate: 115200 });

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
                // Print the data to the console.
                console.log(value);
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