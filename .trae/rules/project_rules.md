# 项目规则：图标注册与设计

> 目的：减少图标相关任务的前期探索，直接定位到关键路径。

## 注册图标（改配置，只碰这 3 个文件）

| 图标类型 | 路径 |
| --- | --- |
| 文件夹图标 | `src/core/icons/folderIcons.ts` |
| 文件图标 | `src/core/icons/fileIcons.ts` |
| 语言图标 | `src/core/icons/languageIcons.ts` |

- 文件夹注册写法：在 `folderIcons` 数组内加一条 `{ name: 'folder-xxx', folderNames: ['xxx'] }`。
- `name` 对应 `icons/` 目录下的 SVG 文件名（不含 `.svg`）。

## 设计图标（只碰这 1 个目录 + 1 份规范）

| 用途 | 路径 |
| --- | --- |
| SVG 源文件 | `icons/`（文件夹用 `folder-xxx.svg`，文件用 `xxx.svg`） |
| 渐变制作规范 | `.trae/skills/svg-icon-gradient-remake/SKILL.md` |
| 参考模板 | `icons/folder-claude.svg`、`icons/folder-cursor.svg`、`icons/folder-gemini-ai.svg` |

- 只需手写关闭态 `folder-xxx.svg`；打开态 `folder-xxx-open.svg` 由脚本自动生成，**不要手动创建**。
- 渐变规范核心：左上亮 → 右下暗，`d` 路径原样保留，只改 `fill` 与 `defs` 内 stop 色值。

## 生成与校验

| 命令 | 作用 |
| --- | --- |
| `npm run generateOpenFolders` | 自动生成所有打开态文件夹图标 |
| `npm run generateJson` | 生成 `dist/aurora-icons.json` 主题清单 |
| `npm run check` | 图标检查（可用性 / 使用 / 冲突 / 命名 / 结构） |