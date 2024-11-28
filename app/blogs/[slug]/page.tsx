import {getAllPostsPath} from "@/lib/getPostsData";

export default async function Page({params}: {
    params: Promise<{ slug: string }>,
}) {
    const slug = (await params).slug;
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const postTsxFunction = require("@/posts/" + slug + ".mdx")?.default;
    if (!postTsxFunction) {
        return null;
    }

    return postTsxFunction({});
}

export function generateStaticParams() {
    const paths = getAllPostsPath();
    return paths.map(path => ({slug: path.params.id.replace("/posts/", "")}));
}
