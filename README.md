# Circuit Timer with ESP-NOW

This project provides code and instructions for building a homemade RC car racing transponder system using two ESP development boards. One board acts as the **emitter** (mounted on the RC car), and the other as the **receiver** (placed at the finish line or timing box).

## Features

- **Wireless Timing:** Uses ESP-NOW protocol for fast, reliable communication between the car and the timing box.
- **Android App Integration:** The receiver connects to an Android app, providing a graphical user interface (GUI) for:
    - Viewing lap times
    - Adjusting settings
    - Interacting with the system in real time

## How It Works

1. **Emitter (Car):** Sends a signal each time the car crosses the finish line.
2. **Receiver (Box):** Receives the signal, records the timestamp, and sends data to the Android app.
3. **Android App:** Displays lap times and allows configuration of the system.

## Requirements

- 2x ESP development boards (e.g., ESP8266 or ESP32)
- Android device with the companion app
- Basic soldering and assembly tools

## Getting Started

1. Flash the provided code to both ESP boards.
2. Mount the emitter board on your RC car.
3. Set up the receiver at the finish line and connect it to your Android device.
4. Use the app to monitor and configure your races.