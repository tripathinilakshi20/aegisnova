from ultralytics import YOLO
MODEL_PATH = 'ai_model/models/trained/aegisnova_best.pt'
model = YOLO(MODEL_PATH)
def detect(frame):
    results=model(frame,verbose=False)
    out=[]
    for box in results[0].boxes:
        out.append({'class':model.names[int(box.cls[0])],'confidence':round(float(box.conf[0]),3)})
    return out
