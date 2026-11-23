// Stack registry: adding a tool is one line. `icon` is a Simple Icons slug (public/icons/<slug>.svg, shown as a CSS mask
// in the tag's ink colour); tools without one show text only. scripts/assets.py fetches any icon named here that is missing.
import type { Messages } from "@/messages";

export type Tool = { name: string; icon?: string };

export const stack: readonly { group: keyof Messages["stack"]["groups"]; tools: readonly Tool[] }[] = [
  {
    group: "backend",
    tools: [
      { name: "Ruby", icon: "ruby" },
      { name: "Ruby on Rails", icon: "rubyonrails" },
      { name: "Hotwire · Turbo", icon: "hotwire" },
      { name: "Sidekiq", icon: "sidekiq" },
      { name: "PHP", icon: "php" },
      { name: "REST APIs" },
    ],
  },
  {
    group: "data",
    tools: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Redis", icon: "redis" },
    ],
  },
  {
    group: "frontend",
    tools: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "WordPress", icon: "wordpress" },
      { name: "HTML · CSS", icon: "html5" },
    ],
  },
  {
    group: "cloud",
    tools: [
      { name: "AWS EC2", icon: "amazonec2" },
      { name: "AWS S3", icon: "amazons3" },
      { name: "Elastic Beanstalk" },
      { name: "Firebase", icon: "firebase" },
      { name: "Docker", icon: "docker" },
      { name: "GitHub", icon: "github" },
      { name: "GitHub Actions", icon: "githubactions" },
    ],
  },
  {
    group: "ai",
    tools: [{ name: "Claude Code", icon: "claude" }, { name: "ChatGPT", icon: "openai" }, { name: "Grok" }],
  },
  {
    group: "earlier",
    tools: [{ name: "C# · .NET", icon: "dotnet" }, { name: "SQL Server" }],
  },
];
