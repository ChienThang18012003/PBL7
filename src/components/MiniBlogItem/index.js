import React from 'react';
import { BlogWrapper, BlogContent, BlogImage, BlogTitle, BlogDescription } from './miniblog.element';

function MiniBlogItem() {
    return (
        <BlogWrapper>
            <BlogImage
                src="https://tamanhhospital.vn/wp-content/uploads/2021/03/sanh-cho-rong-rai-f.jpg"
                alt="Blog_image"
            />
            <BlogContent>
                <BlogTitle>
                    <span>Suy tim tâm trương là gì? Nguyên nhân, dấu hiệu, chẩn đoán, điều trị</span>
                </BlogTitle>
                <BlogDescription>
                    <span>
                        Suy tim tâm trương là tình trạng bị suy giảm khả năng giãn nở. Tỷ lệ bệnh nhân bị suy tim tâm
                        trương ngày càng tăng
                    </span>
                </BlogDescription>
            </BlogContent>
        </BlogWrapper>
    );
}

export default MiniBlogItem;
