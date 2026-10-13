## AI Model

AegisNova currently uses a trained YOLO object-detection model stored as `ai_model/models/trained/best.pt`.

- Model file: `ai_model/models/trained/best.pt`
- Number of classes: 30
- Framework: Ultralytics YOLO
- Inference entry point: `ai_model/inference/detect.py`
- Evaluation entry point: `ai_model/training/evaluate.py`

The trained model weights are included in the `feat/aegisnova-final-model` branch.

## Classes

The model supports the following 30 classes:

Rhino, badger, bison, black_bear, brown_bear, cats, cow, crocodile, deer, dog, elephant, fox, gorilla, hippopotamus, humans, hyena, jaguar, kangaroo, leopard, lion, moose, nilgai, panther, polar_bear, porcupine, puma, python, tiger, wild_boar, wolf.

**Note:** Use the class names and IDs returned by the model. Keep the mapping consistent across inference, risk assessment, and backend integration.

## Training

Training entry point: `ai_model/training/train.py`

The existing trained model is being reused. Retraining is not required if the checkpoint loads and inference works correctly.

## Evaluation

Evaluation entry point: `ai_model/training/evaluate.py`

The evaluation dataset configuration must match the model's 30-class mapping before evaluation results can be considered valid.

## Inference

Inference entry point: `ai_model/inference/detect.py`

The inference module returns:
- Class ID
- Class name
- Confidence score
- Bounding-box coordinates

The model should be tested on sample images, including images containing humans, before integration.

## Dataset

The complete training dataset is maintained separately because of its size. The dataset configuration must match the class names and ordering of the trained model.

## Deployment

The trained model is intended for integration with the AegisNova edge-computing pipeline and deployment on Raspberry Pi hardware.

Raspberry Pi compatibility and inference performance must be verified on the target device before deployment is considered complete.