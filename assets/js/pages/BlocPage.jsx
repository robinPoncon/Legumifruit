import React from 'react';
import { useTranslation } from 'react-i18next';

const BlogPage = () => {
    const {t} = useTranslation();

    return ( <h1>{t("nav.blog")}</h1> );
}
 
export default BlogPage;