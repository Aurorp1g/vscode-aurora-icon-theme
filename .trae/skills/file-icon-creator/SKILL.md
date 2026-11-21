---
name: "file-icon-creator"
description: "标准化制作 Aurora 文件图标（xxx.svg）：Material Design 纯色填充、纯矢量结构，并关联到文件名 / 扩展名 / 语言。在用户要求新建或设计文件图标时使用。"
---

# 文件图标标准化制作

> 目标：制作一个使用 Material Design 纯色填充、在 16px 下依然清晰的矢量文件图标，并关联到正确的文件名 / 扩展名 / 语言 ID。

## 何时使用

- 需要为某个文件名、扩展名或语言新增 `xxx.svg` 图标
- 用户要求「新建 / 设计 / 制作一个文件图标」

## 关键路径

| 用途 | 路径 |
| --- | --- |
| SVG 源文件 | `icons/`（`xxx.svg`，浅色变体 `xxx_light.svg`） |
| 注册配置 | `src/core/icons/fileIcons.ts` |
| 语言注册 | `src/core/icons/languageIcons.ts` |

## 结构与配色

- **纯色填充**：文件图标使用单一 Material Design 颜色（`fill="#色值"`），**不做渐变**。
- **viewBox 尺寸**：常见 `0 0 16 16`、`0 0 24 24`、`0 0 32 32`，保持图形整体居中且边缘留白。
- **配色**：只用 Material Design 调色板颜色，禁止纯黑 `#000000` 与纯白 `#ffffff`。
- **矢量化**：产出完全矢量图形，禁止内嵌 base64 图片字符串。

### 单 path 模板

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path fill="#色值" d="...你的图形路径..."/>
</svg>
```

### 多 path 模板

多个 path 共用同一颜色时，用 `<g fill="#色值">` 包裹；不同颜色时每个 path 单独写 `fill`：

```svg
<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 16 16">
  <g fill="#色值">
    <path d="..."/>
    <path d="..."/>
  </g>
</svg>
```

## 命名

- 基础：`<名称>.svg`（如 `sample.svg`）
- 浅色主题变体：`<名称>_light.svg`（更深的颜色，用于浅色背景），需在注册时设 `light: true`
- 高对比变体：`<名称>_highContrast.svg`，需在注册时设 `highContrast: true`

## 注册（fileIcons.ts）

- 关联文件名与扩展名：

```ts
{ name: 'sample', fileNames: ['sample.js', 'sample.ts'], fileExtensions: ['sample'] }
```

- 关联语言 ID（languageIcons.ts）：

```ts
{ name: 'sample', ids: ['css'] }
```

- 浅色 / 高对比变体：

```ts
{ name: 'sample', fileNames: ['sample.txt'], light: true }
```

- 克隆现有图标换色（复用已有形状，不新建 SVG）：

```ts
{ name: 'rust-library', fileNames: ['lib.rs'], light: true, clone: { base: 'rust', color: 'green-400' } }
```

## 像素级精准设计技巧

- 使用 16×16 网格设计，让边缘对齐网格，避免小数坐标导致模糊。
- 少即是多：16px 下塞入过多细节会让图标难以辨识，优先表达核心概念。
- 曲线与圆角渲染时会轻微模糊，属正常现象。

## 黑名单（务必避免）

- ❌ 内嵌 base64 图片字符串（必须纯矢量）
- ❌ 使用纯黑 / 纯白
- ❌ 顶点使用小数坐标导致边缘模糊
- ❌ 包含 Inkscape / Sodipodi 元数据