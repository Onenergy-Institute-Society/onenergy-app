import { useState, useEffect } from 'react';

const FetchPosts = (callback) => {
    const [isFetching, setIsFetching] = useState(false);
    const { postType, postCategory, postPerPage, postOrder, postOrderBy } = callback;
    const [ postPage, setPage] = useState(1);
    const fetchPostsData = async () => {
        try {
            const api = getApi(props.config);
            await api.customRequest(
                "wp-json/wp/v2/posts?_embed&categories="+postCategory+"&order="+postOrder+"&orderby="+postOrderBy+"&per_page="+postPerPage+"&page="+postPage,          // Endpoint suffix or full url. Suffix will be appended to the site url that app uses. Example of a suffix is "wp-json/buddyboss/v1/members". Example of full url would be "https://app-demos.buddyboss.com/learndash/wp-json/buddyboss/v1/members".
                "get",       // get, post, patch, delete etc.
                {},               // JSON, FormData or any other type of payload you want to send in a body of request
                null,             // validation function or null
                {},               // request headers object
                false   // true - if full url is given, false if you use the suffix for the url. False is default.
            ).then(response => setPostsData(dataPosts=>({
                ...dataPosts,
                [postType]: response.data})));
            setDataPostsLoading(false);
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isFetching) return;
        callback(() => {
            fetchPostsData().then();
        });
    }, [isFetching]);

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
        setPage(postPage+1);
        setIsFetching(true);
    }

    return [isFetching, setIsFetching];
};

export default FetchPosts;