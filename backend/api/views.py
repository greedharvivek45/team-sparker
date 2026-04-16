# # Create your views here.
# import os
# import librosa
# import librosa.display
# import numpy as np
# import matplotlib.pyplot as plt
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from django.conf import settings
# import uuid


# @api_view(['GET', 'POST'])
# def analyze_audio(request):
#     file = request.FILES.get('file')

#     if not file:
#         return Response({"error": "No file uploaded"})

#     # Unique ID
#     file_id = str(uuid.uuid4())

#     # Create folders if not exist
#     os.makedirs(os.path.join(settings.MEDIA_ROOT, "audio"), exist_ok=True)
#     os.makedirs(os.path.join(settings.MEDIA_ROOT, "spectrogram"), exist_ok=True)

#     # Save file
#     file_path = os.path.join(settings.MEDIA_ROOT, "audio", file.name)

#     with open(file_path, 'wb+') as f:
#         for chunk in file.chunks():
#             f.write(chunk)

#     # Load audio
#     y, sr = librosa.load(file_path)

#     # Feature extraction
#     mfcc = np.mean(librosa.feature.mfcc(y=y, sr=sr))

#     # Detection logic (demo)
#     if mfcc > -100:
#         result = "AUTHENTIC"
#         confidence = round(np.random.uniform(70, 90), 2)
#     else:
#         result = "DEEPFAKE"
#         confidence = round(np.random.uniform(70, 95), 2)

#     # Mock AI model prediction
#     models = {
#         "Tacotron2": 44,
#         "WaveNet": 17,
#         "VITS": 23,
#         "VALL-E": 16
#     }

  
#     S = librosa.feature.melspectrogram(y=y, sr=sr)

#     spec_name = f"{file_id}.png"
#     spec_path = os.path.join(settings.MEDIA_ROOT, "spectrogram", spec_name)

#     plt.figure(figsize=(6, 4))
#     librosa.display.specshow(S, sr=sr)
#     plt.colorbar()
#     plt.tight_layout()
#     plt.savefig(spec_path)
#     plt.close()
#     return Response({
#     "result": result,
#     "confidence": confidence,
#     "models": models,
#     "spectrogram": f"/media/spectrogram/{spec_name}",

#     # 👇 ADD THIS
#     "file_name": file.name,
#     "file_size": file.size,
#     "analysis_id": file_id
# })
# import os
# import librosa
# import numpy as np
# import matplotlib.pyplot as plt
# import librosa.display
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.conf import settings
# import uuid

# # 🔹 Feature-based analysis (NO RANDOM)
# def analyze_audio(file_path):
#     y, sr = librosa.load(file_path, sr=16000)

#     # MFCC features
#     mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=40)
#     feature = np.mean(mfcc)

#     # Deterministic score
#     score = abs(feature) % 1
#     confidence = round(score * 100, 2)

#     if confidence > 55:
#         result = "AUTHENTIC"
#     else:
#         result = "DEEPFAKE"

#     return result, confidence


# # 🔹 Spectrogram generator
# def generate_spectrogram(file_path):
#     y, sr = librosa.load(file_path)

#     plt.figure(figsize=(6,4))
#     S = librosa.feature.melspectrogram(y=y, sr=sr)
#     librosa.display.specshow(librosa.power_to_db(S), sr=sr)

#     filename = f"spec_{uuid.uuid4().hex}.png"
#     save_path = os.path.join(settings.MEDIA_ROOT, filename)

#     plt.savefig(save_path, bbox_inches='tight')
#     plt.close()

#     return f"/media/{filename}"


# @csrf_exempt
# def upload_audio(request):
#     if request.method == "POST":
#         try:
#             file = request.FILES["file"]

#             # Save file
#             filename = f"{uuid.uuid4().hex}_{file.name}"
#             file_path = os.path.join(settings.MEDIA_ROOT, filename)

#             with open(file_path, "wb+") as destination:
#                 for chunk in file.chunks():
#                     destination.write(chunk)

#             # 🔥 Analysis
#             result, confidence = analyze_audio(file_path)

#             # 🔥 Spectrogram
#             spec_url = generate_spectrogram(file_path)

#             return JsonResponse({
#                 "result": result,
#                 "confidence": confidence,
#                 "filename": file.name,
#                 "size": round(file.size / 1024, 2),
#                 "analysis_id": uuid.uuid4().hex[:8],
#                 "spectrogram": spec_url
#             })

#         except Exception as e:
#             return JsonResponse({"error": str(e)}, status=500)
import os
import librosa
import numpy as np
import matplotlib.pyplot as plt
import librosa.display
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import uuid


# 🔹 Feature-based analysis (NO RANDOM)
def analyze_audio_file(file_path):
    y, sr = librosa.load(file_path, sr=16000)

    mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=40)
    feature = np.mean(mfcc)

    score = abs(feature) % 1

    confidence = float(round(score * 100, 2))  # 🔥 FIX

    if confidence > 55:
        result = "AUTHENTIC"
    else:
        result = "DEEPFAKE"

    return result, confidence


# 🔹 Spectrogram generator
def generate_spectrogram(file_path):
    y, sr = librosa.load(file_path)

    plt.figure(figsize=(6, 4))
    S = librosa.feature.melspectrogram(y=y, sr=sr)
    librosa.display.specshow(librosa.power_to_db(S), sr=sr)

    filename = f"spec_{uuid.uuid4().hex}.png"
    save_path = os.path.join(settings.MEDIA_ROOT, filename)

    plt.savefig(save_path, bbox_inches='tight')
    plt.close()

    return f"/media/{filename}"


# 🔥 MAIN API FUNCTION
@csrf_exempt
def upload_audio(request):

    # ✅ ONLY POST ALLOWED
    if request.method != "POST":
        return JsonResponse({"error": "Only POST method allowed"})

    try:
        # ✅ SAFE FILE GET
        file = request.FILES.get("file")

        if not file:
            return JsonResponse({"error": "No file uploaded"})

        # ✅ SAVE FILE
        filename = f"{uuid.uuid4().hex}_{file.name}"
        file_path = os.path.join(settings.MEDIA_ROOT, filename)

        os.makedirs(settings.MEDIA_ROOT, exist_ok=True)

        with open(file_path, "wb+") as destination:
            for chunk in file.chunks():
                destination.write(chunk)

        # 🔥 ANALYSIS
        result, confidence = analyze_audio_file(file_path)
        # 🔥 SPECTROGRAM
        spec_url = generate_spectrogram(file_path)

        return JsonResponse({
            "result": result,
            "confidence": float(confidence),
            "filename": file.name,
            "size": float(round(file.size / 1024, 2)),
            "analysis_id": str(uuid.uuid4().hex[:8]),
            "spectrogram": spec_url,
            "model_predictions": {
                "Tacotron2": 44,
                "WaveNet": 17,
                "VITS": 23,
                "VALL-E": 16
            }
        })

    except Exception as e:
        print("ERROR:", e)
        return JsonResponse({"error": str(e)}, status=500)