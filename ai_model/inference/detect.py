from pathlib import Path

from ultralytics import YOLO


# --------------------------------------------------
# Model
# --------------------------------------------------

PROJECT_ROOT = Path(__file__).resolve().parents[1]
MODEL_PATH = PROJECT_ROOT / "models" / "trained" / "aegisnova_best.pt"

model = YOLO(str(MODEL_PATH))


# --------------------------------------------------
# Detection
# --------------------------------------------------

def detect(frame, confidence=0.25):
    """
    Run AegisNova object detection on a single image/frame.

    Args:
        frame: OpenCV image/frame.
        confidence: Minimum detection confidence.

    Returns:
        List of detections containing class, confidence,
        and bounding-box coordinates.
    """

    results = model(
        frame,
        conf=confidence,
        verbose=False
    )

    detections = []

    for box in results[0].boxes:
        class_id = int(box.cls[0])
        confidence_score = float(box.conf[0])
        x1, y1, x2, y2 = box.xyxy[0].tolist()

        detections.append(
            {
                "class_id": class_id,
                "class": model.names[class_id],
                "confidence": round(confidence_score, 3),
                "bbox": {
                    "x1": round(x1, 2),
                    "y1": round(y1, 2),
                    "x2": round(x2, 2),
                    "y2": round(y2, 2),
                },
            }
        )

    return detections
