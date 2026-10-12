import cv2

print("AegisNova camera test started")

camera = cv2.VideoCapture(0)

if not camera.isOpened():
    print("ERROR: Camera could not be opened")
    exit()

print("Camera connected successfully")
print("Press Q to quit")

while True:
    success, frame = camera.read()

    if not success:
        print("ERROR: Could not read frame")
        break

    cv2.imshow("AegisNova Camera Test", frame)

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

camera.release()
cv2.destroyAllWindows()

print("Camera test completed")