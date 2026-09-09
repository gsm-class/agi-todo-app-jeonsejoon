import type { NextConfig } from "next";

// GitHub Pages는 https://<owner>.github.io/<repo>/ 하위 경로로 서비스된다.
// 배포 빌드에서만 basePath를 붙여, 로컬 `npm run dev`는 그대로 "/"를 쓰도록 한다.
const basePath =
  process.env.GITHUB_PAGES === "true" ? "/agi-todo-app-jeonsejoon" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
