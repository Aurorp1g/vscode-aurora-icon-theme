---
name: "folder-icon-creator"
description: "标准化制作 Aurora 文件夹图标（folder-xxx.svg）：固定 16×16 viewBox、标准 folder 轮廓 + motive 图形，融合左上高光→右下暗部的 SVG 渐变规范。在用户要求新建或设计文件夹图标时使用。"
---

# 文件夹图标标准化制作

> 目标：在不改动标准文件夹轮廓的前提下，制作带识别度 motive 图形、并应用统一左上→右下渐变的文件夹图标。只产出关闭态 `folder-xxx.svg`，打开态由脚本自动生成，**不要手动创建**。

## 何时使用

- 需要为某个文件夹名称新增 `folder-xxx.svg` 图标
- 用户要求「新建 / 设计 / 制作一个文件夹图标」
- 需要给现有文件夹图标调整配色或应用渐变

## 关键路径

| 用途 | 路径 |
| --- | --- |
| SVG 源文件 | `icons/`（`folder-xxx.svg`） |
| 注册配置 | `src/core/icons/folderIcons.ts` |
| 渐变规范 | `.trae/skills/svg-icon-gradient-remake/SKILL.md` |
| 参考模板 | `icons/folder-claude.svg`、`icons/folder-cursor.svg`、`icons/folder-gemini-ai.svg` |

## 文件夹图标组成

文件夹图标始终由两部分组成：

1. **文件夹背景**：`<path id="folder">`，使用标准文件夹路径，`d` 不得修改，只能改 `fill` 的渐变引用。
2. **前景图形（motive）**：`<path id="motive">` 或 `<g id="motive">`，这是图标富有辨识度的部分，承载要表达的概念。

## 标准结构（必须严格遵守）

- **viewBox** 必须为 `0 0 16 16`
- **第一个元素**必须是带 `id="folder"` 的 `<path>`，使用下方标准路径，`d` 原样保留
- **图形元素**必须带 `id="motive"`，可以是单个 `<path>` 或多个 `<path>` 包在 `<g>` 中
- **不包含** XML 声明 `<?xml ...?>` 与 Inkscape / Sodipodi 元数据
- **不要** 提交 `-open.svg`（打开态自动生成）

### 单 motive 模板

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
  <defs>
    <linearGradient id="auroraGrad0" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#背景高光"/>
      <stop offset="50%" stop-color="#背景基准色"/>
      <stop offset="100%" stop-color="#背景暗部"/>
    </linearGradient>
    <linearGradient id="auroraGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#图形高光"/>
      <stop offset="50%" stop-color="#图形基准色"/>
      <stop offset="100%" stop-color="#图形暗部"/>
    </linearGradient>
  </defs>
  <path id="folder" fill="url(#auroraGrad0)" d="m6.922 3.768-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232"/>
  <path id="motive" fill="url(#auroraGrad1)" d="...你的图形路径..."/>
</svg>
```

### 多 path motive 模板

如果 motive 需要多个路径，用 `<g id="motive">` 包裹，每个 path 引用各自的渐变 ID：

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
  <defs>
    <linearGradient id="auroraGrad0" x1="0%" y1="0%" x2="100%" y2="100%">...</linearGradient>
    <linearGradient id="auroraGrad1" x1="0%" y1="0%" x2="100%" y2="100%">...</linearGradient>
    <linearGradient id="auroraGrad2" x1="0%" y1="0%" x2="100%" y2="100%">...</linearGradient>
  </defs>
  <path id="folder" fill="url(#auroraGrad0)" d="m6.922 3.768-.644-.536A1 1 0 0 0 5.638 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7.562a1 1 0 0 1-.64-.232"/>
  <g id="motive">
    <path fill="url(#auroraGrad1)" d="..."/>
    <path fill="url(#auroraGrad2)" d="..."/>
  </g>
</svg>
```

## 配色规范（Material Design）

- 只使用 Material Design 调色板中的颜色；可用[颜色转换器](https://aurorp1g.github.io/material-color-converter/)把任意颜色映射到调色板。
- **motive 图形**：只允许调色板**第二行**的颜色。
- **文件夹背景**：选择稍深一些的色相（通常是第 4–6 行）。
- 禁止使用纯黑 `#000000` 与纯白 `#ffffff`。

选定颜色作为「基准色」，再按下方渐变规范生成左上高光 → 右下暗部的同色系渐变。

## 渐变规范（融合 svg-icon-gradient-remake）

1. **路径完全不动，仅修改 fill**：`folder` 与 `motive` 的 `d` 原样保留，禁止改动坐标，只替换 `fill` 为 `url(#渐变ID)`。
2. **以基准色为色相根基**：每个渐变基于该层原始底色生成，同色相内提亮 / 加深，禁止跳到无关色系：
   - `offset="0%"`：同色相提亮（左上高光）
   - `offset="50%"`：原图基准色
   - `offset="100%"`：同色相加深（右下暗部，允许轻微邻近色偏移）
3. **固定渐变方向**：`x1="0%" y1="0%" x2="100%" y2="100%"`，保证左上亮、右下暗。
4. **分层独立处理**：文件夹背景与 motive 各自独立渐变、唯一 ID；motive 内的细小装饰 path 必须压低明暗反差（或直接保留纯色），防止 16px 下细节糊掉。
5. **渐变统一收纳在 defs**：所有 `<linearGradient>` 写在 `<defs>` 内，放在所有 `<path>` 之前。

## 命名与注册

- SVG 文件名：`folder-<名称>.svg`（如 `folder-sample.svg`）；去掉 `.svg` 的名字即 `folderIcons.ts` 中的 `name`。
- 在 `src/core/icons/folderIcons.ts` 的 `folderIcons` 数组内注册：

```ts
{ name: 'folder-sample', folderNames: ['sample', 'samples'] }
```

- 如需绑定工作区根文件夹，可加 `rootFolderNames`：

```ts
{ name: 'folder-sample', folderNames: ['sample'], rootFolderNames: ['sample'] }
```

## 黑名单（务必避免）

- ❌ 修改 `folder` 路径的 `d`（标准轮廓必须原样保留）
- ❌ 手写 `-open.svg` 文件（应由脚本生成）
- ❌ 包含 XML 声明或 Inkscape / Sodipodi 元数据
- ❌ 使用纯黑 / 纯白，或脱离基准色跳到无关色系
- ❌ 多个渐变共用同一 ID，或把 `linearGradient` 放到 `defs` 之外
- ❌ 16px 下 motive 细节过多导致轮廓糊掉