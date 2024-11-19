
import {BlogItems, PageTitle, Wrapper} from "./blog.element";
import BlogItem from "../../components/BlogItem";

function Blog() {
    return (
        <Wrapper>
            <PageTitle>TIN TỨC</PageTitle>
            <BlogItems>
                <BlogItem />
                <BlogItem />
                <BlogItem />
                <BlogItem />
            </BlogItems>
            {/*<Pagination />*/}
        </Wrapper>
    );
}

export default Blog;
