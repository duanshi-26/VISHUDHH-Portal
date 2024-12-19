from flask import Flask, jsonify, request
from ultralytics import YOLO
import numpy as np
import cv2
import base64
import settings
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Load the YOLO model
model = YOLO(r"src\weights\best.pt")

def calculate_cleanliness_score(detected_counts):
    """
    Calculate cleanliness score based on detected waste categories.
    Returns 100 if no waste is detected.
    """
    if sum(detected_counts.values()) == 0:
        return 100
        
    deductions = {
        'recyclable': -5,
        'non_recyclable': -10,
        'hazardous': -20
    }
    
    base_score = 100
    score_change = sum(deductions[category] * count 
                      for category, count in detected_counts.items())
    
    updated_score = max(0, min(100, base_score + score_change))
    return updated_score

@app.route("/detect", methods=["POST"])
def detect():
    """Detect waste in an image and classify it."""
    try:
        data = request.json
        image_base64 = data.get("image")

        if not image_base64:
            return jsonify({"error": "No image provided"}), 400

        # Decode the image
        image_data = base64.b64decode(image_base64.split(",")[1])
        np_img = np.frombuffer(image_data, np.uint8)
        image = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

        # Ensure image is in correct format for model (640x640)
        image = cv2.resize(image, (640, 640))

        # Run detection with increased confidence threshold
        results = model.predict(image, conf=0.45, iou=0.45)
        
        detected_counts = {
            'recyclable': 0,
            'non_recyclable': 0,
            'hazardous': 0
        }
        
        detected_items = {
            'recyclable': [],
            'non_recyclable': [],
            'hazardous': []
        }

        # Process detections with confidence scores
        for result in results:
            boxes = result.boxes
            for box, conf in zip(boxes.cls, boxes.conf):
                item_name = model.names[int(box)]
                confidence = float(conf)
                
                if item_name in settings.RECYCLABLE:
                    detected_counts['recyclable'] += 1
                    detected_items['recyclable'].append(f"{item_name} ({confidence:.2f})")
                elif item_name in settings.NON_RECYCLABLE:
                    detected_counts['non_recyclable'] += 1
                    detected_items['non_recyclable'].append(f"{item_name} ({confidence:.2f})")
                elif item_name in settings.HAZARDOUS:
                    detected_counts['hazardous'] += 1
                    detected_items['hazardous'].append(f"{item_name} ({confidence:.2f})")

        # Calculate score based on current detections only
        current_score = calculate_cleanliness_score(detected_counts)
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        response = {
            "cleanliness_score": current_score,
            "timestamp": timestamp,
            "detected_items": detected_items,
            "detected_counts": detected_counts
        }

        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)