import React from 'react';
import { PageTitleContainer, PageTitleContent } from './pagetitle.element'; // Adjust the path accordingly

function PageTitle({ children }) {
    return (
        <PageTitleContainer>
            <PageTitleContent>{children}</PageTitleContent>
        </PageTitleContainer>
    );
}

export default PageTitle;
