const intentConfig = require('../utils/intents.json');

function buildPrompt(question) {
    let prompt = `Bạn là hệ thống hiểu ngôn ngữ người dùng cho ứng dụng "HireHub". Nhiệm vụ của bạn là phân loại câu hỏi theo các intent được liệt kê bên dưới.\n\n`;

    prompt += `🔒 QUY TẮC BẮT BUỘC:\n`;
    prompt += `- Chỉ chọn intent trong DANH SÁCH INTENT BÊN DƯỚI.\n`;
    prompt += `- Nếu không khớp intent nào → dùng intent "other_question".\n`;
    prompt += `- KHÔNG BAO GIỜ tạo thêm intent mới. KHÔNG BAO GIỜ ghi sai tên intent.\n`;
    prompt += `- TRẢ VỀ intent với CHỈ CÁC PARAMS TƯƠNG ỨNG, KHÔNG LẤY PARAMS CỦA CÁC INTENT KHÁC.\n`;
    prompt += `- Luôn trả về JSON duy nhất dạng:\n`;
    prompt += `{\n  "intent": "intent_từ_danh_sách",\n  "params": { ...hoặc null nếu không tìm thấy params nào }\n}\n\n`;

    prompt += `📚 Danh sách intent hợp lệ:\n`;
    for (const [intent, info] of Object.entries(intentConfig)) {
        prompt += `- "${intent}": ${info.description}\n  → params: ${info.params.length > 0 ? info.params.join(', ') : 'none'}\n`;
    }

    prompt += `\n❗ KHÔNG ĐƯỢC TRẢ VỀ BẤT KỲ INTENT NÀO KHÔNG NẰM TRONG DANH SÁCH TRÊN.\n`;

    prompt += `\n📥 Câu hỏi: "${question}"\n`;
    prompt += `JSON:\n`;

    return prompt;
}

module.exports = { buildPrompt };
