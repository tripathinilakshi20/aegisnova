import os
from pathlib import Path

from ultralytics import YOLO


# --------------------------------------------------
# Paths
# --------------------------------------------------

PROJECT_ROOT = Path(__file__).resolve().parents[1]

MODEL_PATH = (
    PROJECT_ROOT
    / "models"
    / "trained"
    / "aegisnova_best.pt"
)

DATASET_YAML = Path(
    os.getenv(
        "AEGISNOVA_DATASET",
        str(PROJECT_ROOT / "dataset" / "data.yaml"),
    )
)

DEVICE = os.getenv("AEGISNOVA_DEVICE", "cpu")


# --------------------------------------------------
# Evaluation
# --------------------------------------------------

def evaluate_model():

    print("Starting AegisNova model evaluation...")
    print(f"Model: {MODEL_PATH}")
    print(f"Dataset YAML: {DATASET_YAML}")
    print(f"Device: {DEVICE}")

    model = YOLO(str(MODEL_PATH))

    results = model.val(
        data=str(DATASET_YAML),
        split="test",
        imgsz=640,
        batch=16,
        device=DEVICE,
        plots=True,
    )

    print("\nEvaluation completed.")
    print(f"mAP50: {results.box.map50:.4f}")
    print(f"mAP50-95: {results.box.map:.4f}")

    return results


# --------------------------------------------------
# Main
# --------------------------------------------------

if __name__ == "__main__":
    evaluate_model()
