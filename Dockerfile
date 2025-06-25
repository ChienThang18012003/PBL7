# Base image nhẹ hơn so với python:3.10
FROM python:3.10-slim

# Cài đặt thư mục làm việc
WORKDIR /app

# Copy file requirements vào trước để tận dụng cache
COPY requirements.txt .

# Tối ưu pip
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Cài dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy toàn bộ project vào container
COPY . .

# Expose port (quan trọng với Railway/Render)
EXPOSE 8000

# Lệnh chạy app FastAPI bằng Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
