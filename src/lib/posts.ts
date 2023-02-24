import * as fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export interface IPostData {
  title: string;
  description: string;
  content: string
}

export interface IPostCardData {
  id: string;
  title: string;
  description: string;
}

const postDir = path.join(process.cwd(), "resources");

export async function getAllPostsData() {
  const postFileNames: string[] = fs.readdirSync(postDir);
  const allPostsData: IPostCardData[] = postFileNames.map((fileName: string): IPostCardData => {
    const fullPath: string = path.join(postDir, fileName);
    const postContents: string = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(postContents);

    return {
      id: fileName.replace(/\.md$/, ''),
      title: matterResult.data.title,
      description: matterResult.data.description,
    }
  });

  return allPostsData;
}

export async function getAllpostsId() {
  const postFileNames: string[] = fs.readdirSync(postDir);
  
  return postFileNames.map((fileName: string) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id: string): Promise<IPostData> {
  const fileName: string = id + ".md";
  const fullPath: string = path.join(postDir, fileName);
  const postContents: string = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(postContents);

  return {
    title: matterResult.data.title,
    description: matterResult.data.description,
    content: matterResult.content
  }
}