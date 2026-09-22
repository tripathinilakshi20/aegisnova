import os
from pathlib import Path

from ultralytics import YOLO


# --------------------------------------------------
# AegisNova Final Model Training Configuration
# --------------------------------------------------

PROJECT_ROOT = Path(__file__).resolve().parents[1]

DATASET_YAML = Path(
    os.getenv(
        "AEGISNOVA_DATASET",
        str(PROJECT_ROOT / "dataset" / "data.yaml"),
    )
)

MODEL_WEIGHTS = os.getenv("AEGISNOVA_BASE_MODEL", "yolov8n.pt")
DEVICE = os.getenv("AEGISNOVA_DEVICE", "0")


# --------------------------------------------------
# Training
# --------------------------------------------------

def train_model():

    print("Starting AegisNova YOLOv8n training...")
    print(f"Dataset YAML: {DATASET_YAML}")
    print(f"Pretrained model: {MODEL_WEIGHTS}")
    print(f"Device: {DEVICE}")

    model = YOLO(MODEL_WEIGHTS)

    results = model.train(
        data=str(DATASET_YAML),
        epochs=50,
        imgsz=640,
        batch=16,
        project=str(PROJECT_ROOT / "runs"),
        name="aegisnova_yolov8n_36class",
        device=DEVICE,
        workers=2,
        patience=12,
        save=True,
        save_period=1,
        cache=False,
        plots=True,
        seed=42,
    )

    return results


# --------------------------------------------------
# Main
# --------------------------------------------------

if __name__ == "__main__":
    train_model()
