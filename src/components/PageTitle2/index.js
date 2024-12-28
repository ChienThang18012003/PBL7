import React from 'react';
import { PageTitleContainer, PageTitleContent } from './pagetitle.element';

function PageTitle2({ children }) {
    return (
        <PageTitleContainer>
            <PageTitleContent>{children}</PageTitleContent>
        </PageTitleContainer>
    );
}

export default PageTitle2;
