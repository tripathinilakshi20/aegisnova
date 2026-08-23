import cv2,requests
from ai_model.inference.detect import detect
from integration.event_mapper import map_detection
cap=cv2.VideoCapture(0)
while True:
    ok,frame=cap.read()
    if not ok: break
    for d in detect(frame):
        try: requests.post('http://127.0.0.1:8000/event',json=map_detection(d),timeout=2)
        except requests.RequestException: pass
    cv2.imshow('AEGISNOVA Camera',frame)
    if cv2.waitKey(1)&0xFF==ord('q'): break
cap.release(); cv2.destroyAllWindows()
