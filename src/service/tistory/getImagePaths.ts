export function getImagePaths(mdContent: string): string[] {
  return (mdContent.match(/!\[(.*?)]\((.*?)\)/g) ?? []).map((content) =>
    content.split('(')[1].replace(')', ''),
  );
}
