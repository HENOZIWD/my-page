import * as fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export interface IPostData {
  title: string;
  description: string;
  content: string;
}

const postDir = path.join(process.cwd(), "resources");

export async function getAllPostsData() {
  const postFileNames: string[] = fs.readdirSync(postDir);
  const allPostsData: IPostData[] = postFileNames.map((fileName: string): IPostData => {
    const fullPath: string = path.join(postDir, fileName);
    const postContents: string = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(postContents);

    return {
      title: matterResult.data.title,
      description: matterResult.data.description,
      content: matterResult.content
    }
  });

  return allPostsData;
}