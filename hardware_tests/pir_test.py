import time
import RPi.GPIO as GPIO

PIR_PIN = 17

GPIO.setmode(GPIO.BCM)
GPIO.setup(PIR_PIN, GPIO.IN)

print("PIR motion sensor test started")

try:
    while True:
        if GPIO.input(PIR_PIN):
            print("Motion detected!")
        else:
            print("No motion")

        time.sleep(1)

except KeyboardInterrupt:
    print("\nTest stopped")

finally:
    GPIO.cleanup()
    print("GPIO cleanup completed")