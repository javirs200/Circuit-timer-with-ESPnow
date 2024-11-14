import network
import espnow

from machine import Pin
from utime import sleep

print("Reciever booting...")

led=Pin(2,Pin.OUT) # onboard led
led.value(0)

def flash(speed):
    for i in range(3):
        led.value(1)
        sleep(speed)
        led.value(0)
        sleep(speed)

print("Setting up network...")

# A WLAN interface must be active to send()/recv()
sta = network.WLAN(network.STA_IF)
sta.active(True)
sta.disconnect()   # Because ESP8266 auto-connects to last Access Point

e = espnow.ESPNow()
e.active(True)

currentLap = 0
dbTreshold = -50

print("starting to recieve lap ping")

while True:
    host,msg = e.recv()
    if msg: # msg == None if timeout in recv()
        if msg == b'lap':
            flash(0.1)
            currentmsgData = e.peers_table[host]
            db = currentmsgData[0]
            timestamp = currentmsgData[1]
            if db > dbTreshold:
                if currentLap == 0:
                    currentLap = timestamp
                    print("initial lap")
                elif timestamp - currentLap > 1000:
                    print("time:", timestamp - currentLap)
                    flash(0.2)
                currentLap = timestamp
            