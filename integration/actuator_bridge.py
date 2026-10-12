
import time

try:
    import RPi.GPIO as GPIO
    RPI_AVAILABLE = True
except (ImportError, RuntimeError):
    GPIO = None
    RPI_AVAILABLE = False

LED_PIN = 27
BUZZER_PIN = 22


def setup():
    if not RPI_AVAILABLE:
        print("Raspberry Pi GPIO not available")
        return False

    GPIO.setmode(GPIO.BCM)
    GPIO.setup(LED_PIN, GPIO.OUT, initial=GPIO.LOW)
    GPIO.setup(BUZZER_PIN, GPIO.OUT, initial=GPIO.LOW)

    print("Actuator bridge ready")
    return True


def alert(duration=3):
    if not RPI_AVAILABLE:
        print("Simulation: LED and buzzer alert")
        return False

    try:
        GPIO.output(LED_PIN, GPIO.HIGH)
        GPIO.output(BUZZER_PIN, GPIO.HIGH)
        time.sleep(duration)
        return True
    finally:
        GPIO.output(LED_PIN, GPIO.LOW)
        GPIO.output(BUZZER_PIN, GPIO.LOW)


def cleanup():
    if RPI_AVAILABLE:
        try:
            GPIO.output(LED_PIN, GPIO.LOW)
            GPIO.output(BUZZER_PIN, GPIO.LOW)
        finally:
            GPIO.cleanup()
