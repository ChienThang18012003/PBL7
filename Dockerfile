FROM python:3.10-slim

# Tạo thư mục làm việc
WORKDIR /app

# Cài các gói hệ thống cần thiết
RUN apt-get update && apt-get install -y \
    build-essential \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements trước để tối ưu cache
COPY requirements.txt .

# Cài các thư viện Python
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Copy source code vào container
COPY . .

# Chạy ứng dụng
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
