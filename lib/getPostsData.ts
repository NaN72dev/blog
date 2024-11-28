// https://santhalakshminarayana.github.io/blog/build-blog-with-nextjs-mdx-and-deploy-to-github-pages
import fs from "fs";
import path from "path";
import matter from "gray-matter";

// current 'posts' directory
const postsDirectory = path.join(process.cwd(), "posts");
const mdx_file_extention = ".mdx";

function getAllFilesInDirectory() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return path.parse(fileName);
    });
}

function getMdxFiles() {
    const allFiles = getAllFilesInDirectory();
    return allFiles.filter(parsedFile => parsedFile.ext === mdx_file_extention);
}

export function getAllPostsPath() {
    const allMdxFiles = getMdxFiles();
    return allMdxFiles.map((parsedFile) => {
        return {
            params: {
                id: parsedFile.name
            }
        };
    });
}

export function getPostsMetaData() {
    const allMdxFiles = getMdxFiles();

    return allMdxFiles.map((parsedFile) => {
        const fullPath = path.join(postsDirectory, parsedFile.base);

        // get MDX metadata and content
        const fileContents = fs.readFileSync(fullPath, "utf8");
        // get metadata, content
        const {data} = matter(fileContents);
        // metadata["id"] = parsedFile.name;
        return data;
    });
}

export function getPostData(slug: string) {
    const fullPath = path.join(postsDirectory, slug + mdx_file_extention);

    // get MDX metadata and content
    const fileContents = fs.readFileSync(fullPath, "utf8");
    // get metadata, content
    const {data, content} = matter(fileContents);

    const metadata = data;
    // metadata["slug"] = slug;

    return {"metadata": metadata, "content": content};
}