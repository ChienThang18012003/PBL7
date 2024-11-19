import PageTitle from '../../components/PageTitle';
import BlogItem from '../../components/BlogItem';
import Button from '../../components/Button';
import { useState, useEffect } from 'react';
import {
    BlogContent, BlogDescription,
    BlogForm,
    BlogFormContainer,
    BlogImage, BlogTitle,
    ImageContainer, ImagePicker,
    InputFileContainer, Wrapper
} from "./createblog.element";

function CreateBlog() {
    const [image, setImage] = useState();

    useEffect(() => {
        return () => {
            image && URL.revokeObjectURL(image.preview);
        };
    }, [image]);

    const handlePreviewImage = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImage(file);
    };
    return (
        <Wrapper>
            <PageTitle>TẠO BLOG</PageTitle>
            <BlogFormContainer>
                <BlogForm>
                    <ImageContainer>
                        {image && <BlogImage src={image.preview} alt="Preview" />}
                    </ImageContainer>
                    <InputFileContainer>
                        <ImagePicker type="file" className="image-picker" onChange={handlePreviewImage} />
                    </InputFileContainer>
                    <BlogTitle type="text" name="title" placeholder="Tiêu đề" />
                    <BlogDescription
                        name="description"
                        placeholder="Mô tả"
                        rows="4"
                    />
                    <BlogContent
                        name="content"
                        placeholder="Nội dung"
                        rows="4"
                    />
                    <Button submit long>
                        TẠO BLOG
                    </Button>
                </BlogForm>
            </BlogFormContainer>
        </Wrapper>
    );
}

export default CreateBlog;
