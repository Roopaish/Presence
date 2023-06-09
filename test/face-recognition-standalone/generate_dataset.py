import os
import argparse
import cv2

ap = argparse.ArgumentParser()
ap.add_argument("-i", "--dataset", required=True,
                help="path to input directory of faces + images")
ap.add_argument("-e", "--name", required=True,
                help="name of the person to capture images of")
args = vars(ap.parse_args())


def capture_images(person_name, num_images=50, interval=200):
    save_dir = f"./{args['dataset']}/{person_name}"
    os.makedirs(save_dir, exist_ok=True)

    cap = cv2.VideoCapture(0)

    count = 0
    while count < num_images:
        ret, frame = cap.read()
        cv2.imshow('Webcam', frame)

        image_path = os.path.join(save_dir, f"{count+1}.jpg")
        cv2.imwrite(image_path, frame)

        count += 1

        cv2.waitKey(interval)

    cap.release()
    cv2.destroyAllWindows()


capture_images(args['name'])
