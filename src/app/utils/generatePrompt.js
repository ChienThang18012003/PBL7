function createSimpleJobSuggestionPrompt(histories, jobs) {
  const historySummary = histories
    .map((h, i) => `Lịch sử ${i + 1}:
- Từ khóa: "${h.keyword || 'Không có'}"
- Thành phố: ${h.city_id?.name || 'Không rõ'}
- Ngành nghề: ${h.career_id?.career_name || 'Không rõ'}`)
    .join('\n\n');

  const simplifiedJobs = jobs.map((job, index) => ({
    index,
    career: job.career_id?.career_name || '',
    location: job.location_id?.address || '',
    job_name: job.job_name || '',
    deadline: job.deadline || '',
    position: job.position || '',
    type_of_workplace: job.type_of_workplace || '',
    experience: job.experience || '',
    academic_level: job.academic_level || '',
    job_type: job.job_type || '',
    salary_min: job.salary_min || 0,
    salary_max: job.salary_max || 0
  }));

  return `
Dựa trên 5 lịch sử tìm kiếm gần nhất của người dùng:

${historySummary}

Và danh sách các công việc sau:

${JSON.stringify(simplifiedJobs, null, 2)}

Hãy phân tích và lựa chọn tối đa 9 công việc phù hợp nhất với lịch sử tìm kiếm của người dùng.

⚠️ Trả về kết quả dưới dạng **mảng JSON** chứa index của các công việc phù hợp trong mảng jobs. Không mô tả thêm, không giải thích. Chỉ trả lại **array JSON** duy nhất.
`;
}

module.exports = { createSimpleJobSuggestionPrompt };
