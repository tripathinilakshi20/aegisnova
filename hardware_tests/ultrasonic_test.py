import time
import RPi.GPIO as GPIO

TRIG_PIN = 23
ECHO_PIN = 24

GPIO.setmode(GPIO.BCM)

GPIO.setup(TRIG_PIN, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(ECHO_PIN, GPIO.IN)

print("Ultrasonic test started")

try:
    while True:

        # Send trigger pulse
        GPIO.output(TRIG_PIN, GPIO.HIGH)
        time.sleep(0.00001)
        GPIO.output(TRIG_PIN, GPIO.LOW)

        # Wait for echo to start
        start_time = time.time()
        timeout = start_time + 1

        while GPIO.input(ECHO_PIN) == GPIO.LOW:
            start_time = time.time()
            if start_time > timeout:
                break

        # Wait for echo to end
        stop_time = time.time()
        timeout = stop_time + 1

        while GPIO.input(ECHO_PIN) == GPIO.HIGH:
            stop_time = time.time()
            if stop_time > timeout:
                break

        # Calculate distance
        elapsed_time = stop_time - start_time
        distance = (elapsed_time * 34300) / 2

        print("Distance:", round(distance, 2), "cm")

        time.sleep(1)

except KeyboardInterrupt:
    print("\nTest stopped")

finally:
    GPIO.cleanup()
    print("GPIO cleanup completed")