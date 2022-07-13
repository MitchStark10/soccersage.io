import { useEffect, useState } from 'react';
import * as contentful from 'contentful';
import {
    CONTENTFUL_ACCESS_TOKEN,
    CONTENTFUL_SPACE_ID,
} from 'src/web-constants';

export const useContentful = (entryId: string) => {
    const [content, setContent] = useState(null);

    useEffect(() => {
        contentful
            .createClient({
                space: CONTENTFUL_SPACE_ID,
                accessToken: CONTENTFUL_ACCESS_TOKEN,
            })
            .getEntry(entryId)
            .then((entry) => setContent(entry.toPlainObject()));
    }, [entryId]);

    return content;
};
