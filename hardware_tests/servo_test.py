import time
import RPi.GPIO as GPIO

SERVO_PIN = 18

GPIO.setmode(GPIO.BCM)
GPIO.setup(SERVO_PIN, GPIO.OUT)

servo = GPIO.PWM(SERVO_PIN, 50)  # 50 Hz
servo.start(0)

print("Servo test started")
print("Servo will move between positions")
print("Press Ctrl+C to stop")

try:
    while True:
        # Move to approximately 0°
        servo.ChangeDutyCycle(2.5)
        time.sleep(1)

        # Move to approximately 90°
        servo.ChangeDutyCycle(7.5)
        time.sleep(1)

        # Move to approximately 180°
        servo.ChangeDutyCycle(12.5)
        time.sleep(1)

except KeyboardInterrupt:
    print("\nTest stopped")

finally:
    servo.stop()
    GPIO.cleanup()
    print("GPIO cleanup completed")