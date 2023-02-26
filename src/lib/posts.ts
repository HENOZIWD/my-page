import * as fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export interface IDateData {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

export interface IPostData {
  title: string;
  description: string;
  content: string;
  date: IDateData;
}

export interface IPostCardData {
  id: string;
  title: string;
  description: string;
  date: IDateData;
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
      date: {
        year: +matterResult.data.year,
        month: +matterResult.data.month,
        day: +matterResult.data.day,
        hour: +matterResult.data.hour,
        minute: +matterResult.data.minute
      }
    }
  });

  return allPostsData.sort((a, b) => {

    return (a.date.year - b.date.year !== 0) ?
        -(a.date.year - b.date.year)
      : (
        (a.date.month - b.date.month !== 0) ?
          -(a.date.month - b.date.month)
        : (
          (a.date.day - b.date.day !== 0) ?
            -(a.date.day - b.date.day)
          : (
            (a.date.hour - b.date.hour !== 0) ?
              -(a.date.hour - b.date.hour)
            : (
              -(a.date.hour - b.date.hour)
      ))));
  });
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
    content: matterResult.content,
    date: {
      year: matterResult.data.year,
      month: matterResult.data.month,
      day: matterResult.data.day,
      hour: matterResult.data.hour,
      minute: matterResult.data.minute
    }
  }
}