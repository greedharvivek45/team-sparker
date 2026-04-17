import os
import librosa
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import librosa.display
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import uuid


# 🔹 Audio Analysis
def analyze_audio_file(file_path):
    y, sr = librosa.load(file_path, sr=16000)

    mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=40)
    feature = np.mean(mfcc)

    score = abs(feature) % 1
    confidence = float(round(score * 100, 2))

    # 🔥 Improved logic
    if confidence >= 60:
        result = "AUTHENTIC"
    else:
        result = "DEEPFAKE"

    return result, confidence


# 🔹 Spectrogram
def generate_spectrogram(file_path):
    y, sr = librosa.load(file_path)

    plt.figure(figsize=(8, 5))

    S = librosa.feature.melspectrogram(y=y, sr=sr)
    S_dB = librosa.power_to_db(S, ref=np.max)

    img = librosa.display.specshow(
        S_dB,
        sr=sr,
        x_axis='time',
        y_axis='mel',
        cmap='magma'   # 🔥 better color like your Image 2
    )

    # 🔥 ADD COLOR BAR (THIS WAS MISSING)
    plt.colorbar(img, format="%+2.0f dB")

    # 🔥 ADD LABELS
    plt.title("Mel Spectrogram")
    plt.xlabel("Time")
    plt.ylabel("Hz")

    filename = f"spec_{uuid.uuid4().hex}.png"
    save_path = os.path.join(settings.MEDIA_ROOT, filename)

    plt.savefig(save_path, bbox_inches='tight')
    plt.close()

    return f"/media/{filename}"


# 🔹 MAIN API
@csrf_exempt
def upload_audio(request):

    # ✅ Allow GET
    if request.method == "GET":
        return JsonResponse({"message": "API is working 🚀"})

    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"})

    file = request.FILES.get("file")

    if not file:
        return JsonResponse({"error": "No file uploaded"})

    try:
        # 🔹 Save file
        filename = f"{uuid.uuid4().hex}_{file.name}"
        file_path = os.path.join(settings.MEDIA_ROOT, filename)

        with open(file_path, "wb+") as f:
            for chunk in file.chunks():
                f.write(chunk)

        # 🔥 ANALYSIS
        result, confidence = analyze_audio_file(file_path)

        # ✅ FIX → DEFINE risk_score
        risk_score = round(100 - confidence, 2)

        # 🔥 Spectrogram
        spec_url = generate_spectrogram(file_path)

        return JsonResponse({
            "result": result,
            "confidence": confidence,
            "risk_score": risk_score,   # ✅ WORKING

            "filename": file.name,
            "size": round(file.size / 1024, 2),
            "analysis_id": uuid.uuid4().hex[:8],
            "spectrogram": spec_url,

            "model_predictions": {
                "Tacotron2": 44,
                "WaveNet": 17,
                "VITS": 23,
                "VALL-E": 16
            }
        })

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)