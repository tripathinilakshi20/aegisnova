# AEGISNOVA

AI + Edge Intelligence + IoT + Digital Twin prototype.

## Project Pipeline

Hardware -> YOLO-based detection -> dataset training/evaluation -> Raspberry Pi deployment -> backend -> dashboard -> integration -> Digital Twin.

## AI Model

AegisNova uses a YOLOv8n object-detection model trained for 36 classes.

The final trained model is: ai_model/models/trained/aegisnova_best.pt

Model weights are intentionally excluded from Git because of their binary size.

## Classes

Rhino, Badger, Bison, Black_Bear, Brown_Bear, Cats, Cow, Crocodile, Deer, Dog, Elephant, Fox, Gorilla, Hippopotamus, Human, Hyena, Jaguar, Kangaroo, Leopard, Lion, Moose, Nilgai, Panther, Polar_Bear, Porcupine, Puma, Tiger, Wild_Boar, Wolf, Locust, Pig, Rat, Mouse, Caterpillar, Baboon, Rabbit.

## Training

Training entry point: ai_model/training/train.py

- YOLOv8n
- 50 epochs
- Image size: 640
- Batch size: 16
- Patience: 12
- Seed: 42

## Evaluation

Evaluation entry point: ai_model/training/evaluate.py

## Inference

Inference entry point: ai_model/inference/detect.py

The inference module returns class ID, class name, confidence and bounding-box coordinates.

## Dataset

The complete training dataset is not stored in this repository because of its size. The repository contains the dataset configuration and final class mapping, while the actual dataset is maintained separately.

## Deployment

The trained model is intended for integration with the AegisNova edge-computing pipeline and eventual deployment on Raspberry Pi hardware.
