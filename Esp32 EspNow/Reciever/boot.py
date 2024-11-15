import network
import espnow
import sys
import uasyncio
import uselect

from machine import Pin
from utime import sleep

led=Pin(2,Pin.OUT) # onboard led
led.value(0)

def flash(speed):
    for i in range(3):
        led.value(1)
        sleep(speed)
        led.value(0)
        sleep(speed)

async def serialManager(dbTreshold):
    count = 0
    msg = ""
    while True:
        # read byte(str) from stdin non-blocking
        list = uselect.select([sys.stdin], [], [], 0.01)
        if list[0]:
            char = sys.stdin.read(1)
        else:
            char = None
            
        # build msg
        if char:
            msg = msg + char
            count += 1
            if char == '\n':
                print("msg:",msg , "count:",count)
                if count == 4:
                    newTreshold = int(msg)
                    print("newTreshold:",newTreshold)
                    if newTreshold < 0 and newTreshold != dbTreshold[0]:
                        dbTreshold[0] = newTreshold
                        print("new dbTreshold:",dbTreshold[0])
                count = 0
                msg = ""    
                
        await uasyncio.sleep(0.2)

async def espnowManager(e,dbTreshold,currentLap):
    while True:
        host,msg = e.recv()
        if msg == b'lap':
            flash(0.1)
            currentmsgData = e.peers_table[host]
            db = currentmsgData[0]
            timestamp = currentmsgData[1]
            #print("db:",db,"dbTreshold:",dbTreshold[0])
            if db > dbTreshold[0]:
                if currentLap == 0:
                    print("initial lap")
                elif timestamp - currentLap > 1000:
                    print("time:", timestamp - currentLap)
                    flash(0.2)
                currentLap = timestamp
        await uasyncio.sleep(0.2)

def main():
    # A WLAN interface must be active to send()/recv()
    sta = network.WLAN(network.STA_IF)
    sta.active(True)
    sta.disconnect()   # Because ESP8266 auto-connects to last Access Point

    e = espnow.ESPNow()
    e.active(True)

    currentLap = 0
    dbTreshold = [-50]

    try:
        loop = uasyncio.get_event_loop()
        loop.create_task(serialManager(dbTreshold))
        loop.create_task(espnowManager(e,dbTreshold,currentLap))
        loop.run_forever()
    except Exception as e:
        print('Exception ',e)
        loop.stop()
        loop.close()

if __name__ == "__main__":
    main()
        