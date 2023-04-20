
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'md-posts');

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * Returns an array that looks like this:
 * ```js
 * [
 *   {
 *     params: {
 *       id: 'ssg-ssr'
 *     }
 *   },
 *   {
 *     params: {
 *       id: 'pre-rendering'
 *     }
 *   }
 * ]
 * ```
 * 
 * This must be an array of objects where each object has a params key which
 * contains an object with an id key (because we’re using [id] in the file
 * name). Without this structure, getStaticPaths will fail.
 */
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  const postIds = fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });

  return postIds;
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  // Parse the post metadata
  const matterResult = matter(fileContents);
  // Convert markdown to HTML
  const parsedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const htmlContent = parsedContent.toString();
  // Combine the id and data
  const postData = {
    id,
    htmlContent,
    ...matterResult.data,
  };

  return postData;
}
