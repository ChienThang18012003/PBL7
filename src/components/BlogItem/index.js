import {BlogDescription, BlogImage, BlogTitle, BlogWrapper} from "./blogitem.element";


function BlogItem() {
    return (
        <BlogWrapper>
            <BlogImage
                src="https://tamanhhospital.vn/wp-content/uploads/2021/03/sanh-cho-rong-rai-f.jpg"
                alt="Blog_image"
            />
            <BlogTitle>
                <span>Khai trương phòng khám đa khoa tại quận 7</span>
            </BlogTitle>
            <BlogDescription>
                <span>
                    Ngày 23/8/2024, hệ thống bệnh viện Đa khoa chính thức đưa vào hoạt động phòng khám Đa khoa Quận 7
                    chuyên sâu, hiện đại, góp phần khám chữa bệnh cho nhiều bệnh nhân hơn
                </span>
            </BlogDescription>
        </BlogWrapper>
    );
}

export default BlogItem;
