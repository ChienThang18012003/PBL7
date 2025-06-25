from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
import numpy as np
import faiss
from pymongo import MongoClient
from bson import ObjectId
from functools import lru_cache
from datetime import datetime

app = FastAPI()

# MongoDB connection
client = MongoClient("mongodb+srv://nhimdeptraihaha:nhim1234@pbl7.pnlfg.mongodb.net/?retryWrites=true&w=majority&appName=PBL7")
db = client["test"]
resume_collection = db["resumes"]
job_collection = db["job_posts"]

# FAISS index cache
job_index = None
job_id_list = []
resume_index = None
resume_id_list = []

# ========= Lazy load model =========
@lru_cache()
def get_model():
    return SentenceTransformer('paraphrase-MiniLM-L3-v2')

# ========= Utility =========
def encode_text(text: str):
    model = get_model()
    return model.encode([text])[0]  # vector shape: (384,)

def extract_resume_text(r):
    return f"{r.get('desired_position', '')} {r.get('experience', '')}"

def extract_job_text(j):
    return f"{j.get('job_name', '')} {j.get('experience', '')}"

# ========= Build FAISS Index =========
def build_job_index():
    global job_index, job_id_list
    filter_query = {
        "is_deleted": False,
        "status": "Đã duyệt",
        "deadline": {"$gte": datetime.now()}
    }
    jobs = list(job_collection.find(filter_query))
    vectors = []
    job_id_list = []

    for j in jobs:
        text = extract_job_text(j)
        vec = encode_text(text)
        vectors.append(vec)
        job_id_list.append(str(j["_id"]))

    if vectors:
        job_index = faiss.IndexFlatL2(len(vectors[0]))
        job_index.add(np.array(vectors).astype('float32'))
    else:
        job_index = None
        job_id_list = []

def build_resume_index():
    global resume_index, resume_id_list
    resumes = list(resume_collection.find({"is_deleted": False}))
    vectors = []
    resume_id_list = []

    for r in resumes:
        text = extract_resume_text(r)
        vec = encode_text(text)
        vectors.append(vec)
        resume_id_list.append(str(r["_id"]))

    if vectors:
        resume_index = faiss.IndexFlatL2(len(vectors[0]))
        resume_index.add(np.array(vectors).astype('float32'))
    else:
        resume_index = None
        resume_id_list = []

# ========= Request Schemas =========
class ResumeQuery(BaseModel):
    resume_id: str
    top_k: int = 5

class JobQuery(BaseModel):
    job_post_id: str
    top_k: int = 5

# ========= Endpoints =========
@app.post("/find-jobs-by-resume")
def find_jobs_by_resume(data: ResumeQuery):
    resume = resume_collection.find_one({"_id": ObjectId(data.resume_id)})
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    location_ids = [loc["_id"] for loc in db["locations"].find({"city_id": resume.get("city_id")})]
    filter_query = {
        "location_id": {"$in": location_ids},
        "career_id": resume.get("career_id"),
        "is_deleted": False
    }
    jobs = list(job_collection.find(filter_query))
    if not jobs:
        return {"matched_job_ids": []}

    vec = encode_text(extract_resume_text(resume)).astype('float32').reshape(1, -1)

    vectors = []
    job_id_list_filtered = []
    for j in jobs:
        vec_j = encode_text(extract_job_text(j))
        vectors.append(vec_j)
        job_id_list_filtered.append(str(j["_id"]))

    index = faiss.IndexFlatL2(len(vectors[0]))
    index.add(np.array(vectors).astype('float32'))

    D, I = index.search(vec, data.top_k)
    result_ids = [job_id_list_filtered[i] for i in I[0]]

    return {"matched_job_ids": result_ids}

@app.post("/find-resumes-by-job")
def find_resumes_by_job(data: JobQuery):
    job = job_collection.find_one({"_id": ObjectId(data.job_post_id)})
    if not job:
        raise HTTPException(status_code=404, detail="Job post not found")

    location = db["locations"].find_one({"_id": job.get("location_id")})
    city_id = location.get("city_id") if location else None

    filter_query = {
        "city_id": city_id,
        "career_id": job.get("career_id"),
        "is_deleted": False
    }
    resumes = list(resume_collection.find(filter_query))
    if not resumes:
        return {"matched_resume_ids": []}

    vec = encode_text(extract_job_text(job)).astype('float32').reshape(1, -1)

    vectors = []
    resume_id_list_filtered = []
    for r in resumes:
        vec_r = encode_text(extract_resume_text(r))
        vectors.append(vec_r)
        resume_id_list_filtered.append(str(r["_id"]))

    index = faiss.IndexFlatL2(len(vectors[0]))
    index.add(np.array(vectors).astype('float32'))

    D, I = index.search(vec, data.top_k)
    result_ids = [resume_id_list_filtered[i] for i in I[0]]

    return {"matched_resume_ids": result_ids}

@app.get("/rebuild")
def rebuild_indexes():
    build_resume_index()
    build_job_index()
    return {"status": "indexes rebuilt"}
