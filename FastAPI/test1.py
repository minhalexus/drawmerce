import mediapipe as mp
from mediapipe import solutions
from mediapipe.framework.formats import landmark_pb2
import numpy as np
import matplotlib.pyplot as plt
import cv2
import os
from mediapipe.python.solutions.drawing_utils import DrawingSpec

# --- Function to draw landmarks as numbered dots ---
def draw_landmarks_with_numbers_on_image(rgb_image, detection_result):
  annotated_image = np.copy(rgb_image)
  height, width, _ = annotated_image.shape # Get image dimensions

  face_landmarks_list = detection_result.face_landmarks

  # Define color and font for drawing (Red in BGR format)
  dot_color = (0, 0, 255)
  text_color = (255, 0, 0)
  dot_radius = 1 # Radius of the dot
  font_face = cv2.FONT_HERSHEY_SIMPLEX
  font_scale = 0.7
  font_thickness = 1
  text_offset_x = 5 # Offset for text from the dot
  text_offset_y = 5

  # Loop through the detected faces
  for face_landmarks in face_landmarks_list:
    # Loop through each landmark in the face
    for idx, landmark in enumerate(face_landmarks):
      # Convert normalized coordinates to pixel coordinates
      # Ensure coordinates are within image bounds
      pixel_x = min(int(landmark.x * width), width - 1)
      pixel_y = min(int(landmark.y * height), height - 1)

      # Draw the dot (circle) at the landmark location
      # cv2.circle works on the numpy array which is treated as BGR
      cv2.circle(annotated_image, (pixel_x, pixel_y), dot_radius, dot_color, -1) # -1 fills the circle

      # Draw the landmark index number as text
      text_position = (pixel_x + text_offset_x, pixel_y + text_offset_y)
      # cv2.putText works on the numpy array which is treated as BGR
      cv2.putText(annotated_image, str(idx), text_position, font_face, font_scale, text_color, font_thickness, cv2.LINE_AA)

  return annotated_image # This image is still in RGB format


# Define blendshapes plotting function (same as before)
def plot_face_blendshapes_bar_graph(face_blendshapes):
  # Extract the face blendshapes category names and scores.
  if not face_blendshapes or not face_blendshapes[0]:
      print("No face blendshapes detected or data is empty.")
      return

  face_blendshapes_names = [face_blendshapes_category.category_name for face_blendshapes_category in face_blendshapes[0]]
  face_blendshapes_scores = [face_blendshapes_category.score for face_blendshapes_category in face_blendshapes[0]]

  face_blendshapes_ranks = range(len(face_blendshapes_names))

  fig, ax = plt.subplots(figsize=(12, 12))
  bar = ax.barh(face_blendshapes_ranks, face_blendshapes_scores, label=[str(x) for x in face_blendshapes_ranks])
  ax.set_yticks(face_blendshapes_ranks, face_blendshapes_names)
  ax.invert_yaxis()

  for score, patch in zip(face_blendshapes_scores, bar.patches):
    ax.text(patch.get_width(), patch.get_y() + patch.get_height()/2, f"{score:.1f}", va="center")

  ax.set_xlabel('Score')
  ax.set_title("Face Blendshapes")
  plt.tight_layout()
  plt.show()

# --- Main Script ---

# Define file paths
image_path = "images/ogi.jpg"
model_path = 'face_landmarker.task'

# Check if files exist
if not os.path.exists(image_path):
    print(f"ERROR: Image file not found at {image_path}")
    exit()
if not os.path.exists(model_path):
    print(f"ERROR: Model file not found at {model_path}")
    print("Please download the 'face_landmarker.task' model from MediaPipe Models.")
    print("You can usually find it here: https://developers.google.com/mediapipe/solutions/vision/face_landmarker#model")
    exit()

# Load the input image using OpenCV
img = cv2.imread(image_path)
if img is None:
    print(f"ERROR: Failed to load image file {image_path}")
    exit()

# Display the original image using OpenCV's standard window
cv2.imshow('Original Image', img)

# STEP 1: Import necessary modules (already done above)

# STEP 2: Create a FaceLandmarker object.
from mediapipe.tasks import python
from mediapipe.tasks.python import vision

try:
    base_options = python.BaseOptions(model_asset_path=model_path)
    options = vision.FaceLandmarkerOptions(base_options=base_options,
                                           output_face_blendshapes=True,
                                           output_facial_transformation_matrixes=True,
                                           num_faces=1)
    detector = vision.FaceLandmarker.create_from_options(options)
except Exception as e:
    print(f"Error creating FaceLandmarker: {e}")
    exit()

# STEP 3: Load the input image into MediaPipe Image object.
# Convert the BGR image (from cv2.imread) to RGB for MediaPipe
image_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
image = mp.Image(image_format=mp.ImageFormat.SRGB, data=image_rgb)

# STEP 4: Detect face landmarks from the input image.
try:
    detection_result = detector.detect(image)
except Exception as e:
    print(f"Error during face landmark detection: {e}")
    exit()

# STEP 5: Process the detection result.
if detection_result and detection_result.face_landmarks:
    # Visualize landmarks with numbers - USING THE NEW FUNCTION
    annotated_image = draw_landmarks_with_numbers_on_image(image.numpy_view(), detection_result)

    # Display the annotated image using OpenCV's standard window
    # Convert the RGB annotated image back to BGR for OpenCV display
    cv2.imshow('Annotated Image with Numbers', cv2.cvtColor(annotated_image, cv2.COLOR_RGB2BGR))

    # Plot blendshapes if available
    if detection_result.face_blendshapes:
        plot_face_blendshapes_bar_graph(detection_result.face_blendshapes)
    else:
        print("No blendshape data found in the detection result.")

else:
    print(f"No face landmarks detected in {image_path}.")

# Wait for a key press
print("Press any key with an image window focused to exit.")
cv2.waitKey(0)

# Close all OpenCV windows
cv2.destroyAllWindows()

# Close the detector
detector.close()
print("Script finished.")

# 10 151 9 8 168 6 197 195 5 4 1 164 9 11 12 13 15 16 17 18 200 199 175 152

# 139 46 224 223 22 55 8 285 442 443 444 278 389