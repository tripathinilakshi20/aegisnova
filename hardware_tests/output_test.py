import time

import RPi.GPIO as GPIO


LED_PIN = 27
BUZZER_PIN = 22


GPIO.setmode(GPIO.BCM)

GPIO.setup(LED_PIN, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(BUZZER_PIN, GPIO.OUT, initial=GPIO.LOW)


try:
    print("LED + Buzzer test started")

    # Turn ON
    GPIO.output(LED_PIN, GPIO.HIGH)
    GPIO.output(BUZZER_PIN, GPIO.HIGH)

    print("LED: ON")
    print("Buzzer: ON")

    time.sleep(3)

    # Turn OFF
    GPIO.output(LED_PIN, GPIO.LOW)
    GPIO.output(BUZZER_PIN, GPIO.LOW)

    print("LED: OFF")
    print("Buzzer: OFF")

finally:
    GPIO.cleanup()
    print("Test completed")