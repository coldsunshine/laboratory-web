const rules = {
  bold: {
    name: "粗体",
    regexp: /(\*{2})([^*]+)\1/g,
    replacement: "[b]$2[/b]"
  },
  italic: {
    name: "斜体",
    regexp: /(\*{1})([^*]+)\1/g,
    replacement: "[i]$2[/i]"
  },
  underscore: {
    name: "下划线",
    regexp: /(_{2})([^*]+)\1/g,
    replacement: "[u]$2[/u]"
  },
  hx: {
    name: "标题",
    regexp: /(#{4,})\s*([^\n]+)/g,
    replacement: "[size=4][b]$2[/b][/size]"
  },
  h3: {
    name: "三级标题",
    regexp: /(#{3})\s*([^\n]+)/g,
    replacement: "[size=5][b]$2[/b][/size]"
  },
  h2: {
    name: "二级标题",
    regexp: /(#{2})\s*([^\n]+)/g,
    replacement: "[size=6][b]$2[/b][/size][hr]"
  },
  h1: {
    name: "一级标题",
    regexp: /(#)\s*([^\n]+)/g,
    replacement: "[size=7][b]$2[/b][/size][hr]"
  },
  hr: {
    name: "分割线",
    regexp: /-{3,}/g,
    replacement: "[hr]"
  },
  quote: {
    name: "引用",
    regexp: /(>\s*[^\n]*\n)+/g,
    replacement: block => {
      return "[quote]" + block.split(/^>[ ]*/gm).join("") + "[/quote]";
    }
  },
  code: {
    name: "代码",
    regexp: /```(\s?\w+)((.*\n)+)```/g,
    replacement: "[code]$2[/code]"
  },
  shortcode: {
    name: "短代码",
    regexp: /`(.+?)`/g,
    replacement: "[backcolor=LemonChiffon]$1[/backcolor]"
  },
  image: {
    name: "图片",
    regexp: /!\[([^\]]*)\]\(([^)]*)\)/g,
    replacement: "[img]$2[/img]"
  },
  link: {
    name: "链接",
    regexp: /\[([^\]]*)\]\(([^)]*)\)/g,
    replacement: "[url=$2]$1[/url]"
  },
  ul: {
    name: "列表",
    regexp: /(^\s*-.*\n?)+/gm,
    replacement: block => {
      return "[list]\n" + block.replace(/^-\s*(.*)/gm, "[*]$1") + "[/list]";
    }
  }
};

export function convert(md) {
  return [
    "bold",
    "italic",
    "underscore",
    "hx",
    "h3",
    "h2",
    "h1",
    "hr",
    "quote",
    "code",
    "shortcode",
    "image",
    "link",
    "ul"
  ].reduce((md, type) => {
    return md.replace(rules[type].regexp, rules[type].replacement);
  }, md);
}
