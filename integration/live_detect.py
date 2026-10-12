
import time
import cv2
import requests

from ai_model.inference.detect import detect
from integration.event_mapper import map_detection

API_URL = "http://127.0.0.1:8000/event"
CONFIDENCE_THRESHOLD = 0.50
ALERT_COOLDOWN = 3

cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("ERROR: Camera could not be opened")
    raise SystemExit(1)

print("AegisNova live detection started. Press Q to quit.")

last_alert_time = 0

try:
    while True:
        ok, frame = cap.read()

        if not ok:
            print("ERROR: Could not read camera frame")
            break

        detections = detect(frame)

        for d in detections:
            event = map_detection(d)

            if not event["is_animal"]:
                continue

            if event["confidence"] < CONFIDENCE_THRESHOLD:
                continue

            current_time = time.time()

            if current_time - last_alert_time < ALERT_COOLDOWN:
                continue

            try:
                response = requests.post(
                    API_URL,
                    json={
                        "object_class": event["object_class"],
                        "confidence": event["confidence"],
                        "zone": event["zone"],
                    },
                    timeout=2,
                )
                response.raise_for_status()

                print("Animal detected:", event["object_class"])
                print("Backend response:", response.json())

                last_alert_time = current_time

            except requests.RequestException as error:
                print("Backend connection error:", error)

        cv2.imshow("AEGISNOVA Camera", frame)

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

finally:
    cap.release()
    cv2.destroyAllWindows()
    print("Camera released. Detection stopped.")
