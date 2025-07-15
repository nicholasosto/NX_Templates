# Copilot Instructions for Roblox-TS Nx Project

## Project Architecture

This is a **roblox-ts + Nx** project that compiles TypeScript to Luau for Roblox development. The architecture follows a specific pattern where TypeScript is compiled to the `include/` directory and mapped to Roblox services via Rojo.

### Critical File Relationships
- `src/` → TypeScript source code (client/server/shared structure)
- `include/` → Compiled Luau output (auto-generated, never edit directly)
- `default.project.json` → Rojo configuration mapping `include/` to Roblox services
- `tsconfig.json` → **Must have `"moduleDetection": "force"` and `"outDir": "include"`** for roblox-ts compatibility

## Essential Development Workflow

### Build Commands (Windows PowerShell)
```bash
.\nx build           # Single build
.\nx build:watch     # Watch mode (primary development command)
.\nx clean          # Clean include/ directory
.\nx type-check     # TypeScript validation without compilation
```

### Critical Dependencies Pattern
- Always use `@rbxts/` prefixed packages for Roblox APIs
- Import Roblox services: `import { Players } from "@rbxts/services"`
- All @rbxts packages must be mapped in `default.project.json` under `node_modules/@rbxts`

## Project-Specific Conventions

### Directory Structure Rules
- `src/client/` → Client-side scripts (StarterPlayerScripts)
- `src/server/` → Server-side scripts (ServerScriptService)  
- `src/shared/` → Shared utilities accessible by both client and server
- **Never put code directly in `include/`** - it's auto-generated

### State Management Pattern (Fusion-based)
This project uses `@rbxts/fusion` for reactive state management:
```typescript
import { Value } from "@rbxts/fusion";

const GameState = {
    DataLoaded: Value(false),
    PlayerDataLoaded: Value(false),
};
```
- State files are in `src/client/states/` and follow the `*State.ts` naming pattern
- Use Fusion's `Value()` for reactive state containers

### Module Organization Patterns
- **Barrel exports**: Each major directory has an `index.ts` that re-exports all modules
- **Layer documentation**: Files include JSDoc headers with `@layer` (Client/Server/Shared)
- **Theme system**: Centralized in `src/theme/` with enum-based theme keys (`ThemeKey.CyberGothic`, etc.)

### Rojo Configuration Pattern
The `default.project.json` **must** include:
1. `rbxts_include` path pointing to `include/`
2. `node_modules/@rbxts` mapping for runtime libraries
3. ReplicatedStorage as the container (required for shared runtime)

### TypeScript Configuration Requirements
- `"noLib": true` (roblox-ts requirement)
- `"moduleDetection": "force"` (required for compilation)
- `"typeRoots": ["node_modules/@rbxts"]` (for Roblox types)
- `"baseUrl": "src"` (enables clean imports without relative paths)

## Common Integration Points

### Adding New Dependencies
```bash
pnpm add -D @rbxts/[package-name]  # Always use -D for roblox-ts packages
```

### Debugging Build Issues
1. Check `.\nx type-check` for TypeScript errors
2. Verify `include/` directory exists and contains `.lua` files
3. Ensure `default.project.json` maps include folder correctly
4. Check that imports use `@rbxts/` packages, not standard Node.js modules

### Cross-Component Communication
- Use `src/shared/` for types, utilities, and constants shared between client/server
- Import shared code: `import { GAME_CONFIG } from "shared/utils"`
- Export constants with `as const` for type safety

## Key Examples from Codebase

### Shared Utility Pattern (`src/shared/utils.ts`):
```typescript
export const GAME_CONFIG = {
    VERSION: "1.0.0", 
    MAX_PLAYERS: 10,
} as const;  // ← 'as const' provides literal types
```

### Service Import Pattern:
```typescript
import { Players } from "@rbxts/services";  // ← Always @rbxts/ prefix
```

### Nx Task Commands:
- Use `nx` commands with `.\` prefix on Windows: `.\nx build`
- Package manager is `pnpm` (see package.json)
- Clean command uses Windows syntax: `rmdir /s /q include`
- Available targets: `build`, `build:watch`, `clean`, `type-check`, `rojo:serve`, `rojo:build`
