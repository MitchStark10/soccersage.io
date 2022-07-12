import { useState } from 'react';

// TODO: Replace YOUR_SPACE_ID
// TODO: Replace YOUR_ACCESS_TOKEN
export const useContentful = (query: string) => {
    const [content, setContent] = useState(null);
    useEffect(() => {
        window
            .fetch(`https://graphql.contentful.com/content/v1/spaces/[YOUR_SPACE_ID]/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Authenticate the request
                    Authorization: "Bearer [YOUR_ACCESS_TOKEN]",
                },
                // send the GraphQL query
                body: JSON.stringify({ query }),
            })
            .then((response) => response.json())
            .then(({ data, errors }) => {
                if (errors) {
                    console.error(errors);
                }

                // rerender the entire component with new data
                setContent(data);
            });
    }, []);

    return content;
}