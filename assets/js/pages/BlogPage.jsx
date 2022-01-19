import React from 'react';
import { useTranslation } from 'react-i18next';

const BlogPage = () => {
    const {t} = useTranslation();

    return ( 
        <>
            <h1 className="mb30">{t("nav.blog")}</h1>
            <h2>{t("blogPage.futur-feature")}</h2>
        </>
    );
}
 
export default BlogPage;