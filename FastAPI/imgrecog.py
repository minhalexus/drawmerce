import mediapipe
import mediapipe as mp # Import mediapipe as mp at the top
from mediapipe import solutions
from mediapipe.framework.formats import landmark_pb2
import numpy as np
import matplotlib.pyplot as plt
import cv2
import os # Added for checking file existence
from mediapipe.python.solutions.drawing_utils import DrawingSpec

# Define drawing function
def draw_landmarks_on_image(rgb_image, detection_result):
  # Define a custom color (e.g., bright green)
  primary_color = (0, 255, 130)  # RGB: Green
  secondary_color = (0, 0, 8)
  tertiary_color = (255, 255, 255)
  custom_thickness = 4

  vertical_line = frozenset(
      [(10, 151), (151, 9), (9, 8), (8, 168), (168, 6), (6, 197), (197, 195), (195, 5), (5, 4), (4, 1), (1, 164),
       (164, 9), (9, 11), (11, 12), (12, 13), (13, 15), (15, 16), (16, 17), (17, 18), (18, 200), (200, 199), (199, 175),
       (175, 152)])

  straight_vertical_line = frozenset([
      (10,8),
      (8,164),
      (164,152)
  ])

  below_nose_line = frozenset([
      (213, 205),
      (205, 2),
      (2,425),
      (425,433),
  ])

  eye_start_left = frozenset([
      (154, 176)
  ])

  eye_start_right = frozenset([
      (362, 400)
  ])

  horizontal_line = frozenset([(139, 46), (46, 224), (224, 223), (223, 222), (222, 55), (55, 8), (8, 285), (285, 442), (442, 443), (443, 444), (444, 276), (276, 368)])

  eye_end_right = frozenset([
      (130, 136)
  ])

  eye_end_left = frozenset([
      (249, 365)
  ])

  primary_spec = DrawingSpec(color=primary_color, thickness=custom_thickness)
  secondary_spec = DrawingSpec(color=secondary_color, thickness=custom_thickness)
  tertiary_spec = DrawingSpec(color=tertiary_color, thickness=custom_thickness)

  face_landmarks_list = detection_result.face_landmarks
  annotated_image = np.copy(rgb_image)

  # Loop through the detected faces to visualize.
  for idx in range(len(face_landmarks_list)):
    face_landmarks = face_landmarks_list[idx]

    # Draw the face landmarks.
    face_landmarks_proto = landmark_pb2.NormalizedLandmarkList()
    face_landmarks_proto.landmark.extend([
      landmark_pb2.NormalizedLandmark(x=landmark.x, y=landmark.y, z=landmark.z) for landmark in face_landmarks
    ])

    # Use mp.solutions consistently as mediapipe was imported as mp
    print(mp.solutions.drawing_styles
          .get_default_face_mesh_iris_connections_style())

    # solutions.drawing_utils.draw_landmarks(
    #     image=annotated_image,
    #     landmark_list=face_landmarks_proto,
    #     connections=mp.solutions.face_mesh.FACEMESH_LEFT_EYEBROW,
    #     landmark_drawing_spec=None,
    #     connection_drawing_spec=mp.solutions.drawing_styles
    #     .get_default_face_mesh_contours_style())

    solutions.drawing_utils.draw_landmarks(
        image=annotated_image,
        landmark_list=face_landmarks_proto,
        connections=straight_vertical_line,
          landmark_drawing_spec=None,
          connection_drawing_spec=primary_spec)

    solutions.drawing_utils.draw_landmarks(
        image=annotated_image,
        landmark_list=face_landmarks_proto,
        connections=horizontal_line,
        landmark_drawing_spec=None,
        connection_drawing_spec=primary_spec)

    solutions.drawing_utils.draw_landmarks(
        image=annotated_image,
        landmark_list=face_landmarks_proto,
        connections=below_nose_line,
        landmark_drawing_spec=None,
        connection_drawing_spec=secondary_spec)

    solutions.drawing_utils.draw_landmarks(
        image=annotated_image,
        landmark_list=face_landmarks_proto,
        connections=eye_start_left,
        landmark_drawing_spec=None,
        connection_drawing_spec=tertiary_spec)

    solutions.drawing_utils.draw_landmarks(
        image=annotated_image,
        landmark_list=face_landmarks_proto,
        connections=eye_start_right,
        landmark_drawing_spec=None,
        connection_drawing_spec=tertiary_spec)

    solutions.drawing_utils.draw_landmarks(
        image=annotated_image,
        landmark_list=face_landmarks_proto,
        connections=eye_end_right,
        landmark_drawing_spec=None,
        connection_drawing_spec=tertiary_spec
    )

    solutions.drawing_utils.draw_landmarks(
        image=annotated_image,
        landmark_list=face_landmarks_proto,
        connections=eye_end_left,
        landmark_drawing_spec=None,
        connection_drawing_spec=tertiary_spec
    )

  return annotated_image

# Define blendshapes plotting function
def plot_face_blendshapes_bar_graph(face_blendshapes):
  # Extract the face blendshapes category names and scores.
  # Handle cases where blendshapes might be empty
  if not face_blendshapes:
      print("No face blendshapes detected.")
      return
  face_blendshapes_names = [face_blendshapes_category.category_name for face_blendshapes_category in face_blendshapes[0]] # Access the first list element
  face_blendshapes_scores = [face_blendshapes_category.score for face_blendshapes_category in face_blendshapes[0]] # Access the first list element
  # The blendshapes are ordered in decreasing score value.
  face_blendshapes_ranks = range(len(face_blendshapes_names))

  fig, ax = plt.subplots(figsize=(12, 12))
  bar = ax.barh(face_blendshapes_ranks, face_blendshapes_scores, label=[str(x) for x in face_blendshapes_ranks])
  ax.set_yticks(face_blendshapes_ranks, face_blendshapes_names)
  ax.invert_yaxis()

  # Label each bar with values
  for score, patch in zip(face_blendshapes_scores, bar.patches):
    plt.text(patch.get_x() + patch.get_width(), patch.get_y(), f"{score:.4f}", va="top")

  ax.set_xlabel('Score')
  ax.set_title("Face Blendshapes")
  plt.tight_layout()
  plt.show() # This will block execution until the plot window is closed

# --- Main Script ---

# Define file paths
image_path = "images/20250410_163639.jpg"
# image_path = "images/ogi.jpg"
# image_path = "images/IMG-20250423-WA0001.jpg"
# image_path = "images/ogi.jpg"

model_path = 'face_landmarker.task'

# Check if files exist
if not os.path.exists(image_path):
    print(f"ERROR: Image file not found at {image_path}")
    exit()
if not os.path.exists(model_path):
    print(f"ERROR: Model file not found at {model_path}")
    print("Please download it from MediaPipe Models.")
    exit()

# Load the input image using OpenCV
img = cv2.imread(image_path)
if img is None:
    print(f"ERROR: Failed to load image file {image_path}")
    exit()

# Display the original image using OpenCV's standard window
cv2.imshow('Original Image', img)
# Do not wait here yet, show all images then wait at the end.
# cv2.waitKey(0)
# cv2.destroyWindow('Original Image') # Close only this window if needed, or use destroyAllWindows() later

# STEP 1: Import necessary modules (already done above)

# STEP 2: Create a FaceLandmarker object.
from mediapipe.tasks import python
from mediapipe.tasks.python import vision

try:
    base_options = python.BaseOptions(model_asset_path=model_path)
    options = vision.FaceLandmarkerOptions(base_options=base_options,
                                           output_face_blendshapes=True,
                                           output_facial_transformation_matrixes=True,
                                           num_faces=1) # Adjust num_faces if needed
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
    # Visualize landmarks
    annotated_image = draw_landmarks_on_image(image.numpy_view(), detection_result)

    # Display the annotated image using OpenCV's standard window
    # Convert the RGB annotated image back to BGR for OpenCV display
    cv2.imshow('Annotated Image', cv2.cvtColor(annotated_image, cv2.COLOR_RGB2BGR))

    # Plot blendshapes if available
    if detection_result.face_blendshapes:
        plot_face_blendshapes_bar_graph(detection_result.face_blendshapes)
        print(detection_result)
    else:
        print("No blendshape data found in the detection result.")

else:
    print(f"No face landmarks detected in {image_path}.")
    # Keep the original image window open if no face is detected
    # cv2.imshow('Annotated Image', img) # Show original if no detection


# Wait for a key press indefinitely until a window is focused and key pressed
print("Press any key with an image window focused to exit.")
cv2.waitKey(0)

# Close all OpenCV windows
cv2.destroyAllWindows()

# Close the detector
detector.close()
print("Script finished.")

