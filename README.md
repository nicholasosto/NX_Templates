# Roblox-TS Nx Toolchain

This project is a fully configured roblox-ts workspace using Nx for task management and build orchestration.

## 🚀 Features

- ✅ **roblox-ts**: TypeScript to Luau compilation
- ✅ **Nx**: Monorepo tooling and task runner
- ✅ **Watch Mode**: Automatic recompilation on file changes
- ✅ **Proper Project Structure**: Client, Server, and Shared code organization
- ✅ **Rojo Integration**: Ready for Roblox Studio sync

## 📁 Project Structure

```
├── src/
│   ├── client/          # Client-side scripts (StarterPlayerScripts)
│   ├── server/          # Server-side scripts (ServerScriptService)
│   └── shared/          # Shared utilities and types
├── include/             # Compiled output (auto-generated)
├── node_modules/        # Dependencies
├── default.project.json # Rojo configuration
├── tsconfig.json        # TypeScript configuration
├── project.json         # Nx project configuration
└── package.json         # Node.js package configuration
```

## 🛠️ Available Commands

### Build Commands
```bash
# Build the project once
npm run build
# or
nx build

# Build with watch mode (auto-rebuild on changes)
npm run build:watch
# or
nx build:watch
```

### Development Commands
```bash
# Start both watch mode and Rojo server (requires Rojo installed)
npm run dev

# Start only Rojo server
npm run rojo:serve
# or
nx rojo:serve
```

### Utility Commands
```bash
# Clean compiled output
npm run clean
# or
nx clean

# Type checking without compilation
npm run type-check
# or
nx type-check

# Build Roblox place file
npm run rojo:build
# or
nx rojo:build
```

## 🔧 Setup Requirements

### Prerequisites
1. **Node.js** (v16 or higher)
2. **pnpm** (or npm/yarn)
3. **Rojo** (optional, for Roblox Studio integration)

### Installation
```bash
# Install dependencies
pnpm install

# Build the project
pnpm run build
```

## 📝 Development Workflow

1. **Start Development Mode:**
   ```bash
   pnpm run build:watch
   ```

2. **Edit TypeScript Files:**
   - Client code: `src/client/`
   - Server code: `src/server/`
   - Shared code: `src/shared/`

3. **Sync with Roblox Studio** (if using Rojo):
   ```bash
   pnpm run rojo:serve
   ```
   Then connect from Roblox Studio using the Rojo plugin.

## 🏗️ Architecture

### TypeScript Configuration
- **Target**: ESNext with Luau compilation
- **Strict Mode**: Enabled for better type safety
- **Module Detection**: Forced for proper roblox-ts compatibility
- **Output Directory**: `include/` (required by roblox-ts)

### Rojo Configuration
- **ReplicatedStorage**: Contains compiled output and @rbxts packages
- **Include Path**: Maps to the compiled `include/` directory
- **Node Modules**: @rbxts packages are properly mapped for runtime access

### Nx Configuration
- **Build Target**: Compiles TypeScript using roblox-ts
- **Watch Target**: Continuous compilation during development
- **Clean Target**: Removes compiled output
- **Type Check**: Validates TypeScript without compilation

## 🔍 Example Code

### Client Script (`src/client/index.ts`)
```typescript
import { Players } from "@rbxts/services";

const player = Players.LocalPlayer;
print(`Hello from client, ${player.Name}!`);
```

### Server Script (`src/server/index.ts`)
```typescript
import { Players } from "@rbxts/services";

Players.PlayerAdded.Connect((player) => {
    print(`${player.Name} joined the game!`);
});

print("Server started!");
```

### Shared Utilities (`src/shared/utils.ts`)
```typescript
export function greet(name: string): string {
    return `Hello, ${name}!`;
}

export const GAME_CONFIG = {
    VERSION: "1.0.0",
    MAX_PLAYERS: 10,
} as const;
```

## 🐛 Troubleshooting

### Common Issues

1. **"Cannot find module '@rbxts/services'"**
   - Run: `pnpm add -D @rbxts/services`

2. **"Rojo project contained no data for include folder"**
   - Ensure `include/` directory exists
   - Check that `default.project.json` has correct paths

3. **"Runtime library cannot be in server-only container"**
   - Ensure @rbxts packages are in ReplicatedStorage, not ServerScriptService

4. **Build fails with TypeScript errors**
   - Run: `nx type-check` to see detailed error messages
   - Ensure all imports use @rbxts packages

### Build Process
The build process works as follows:
1. roblox-ts compiles TypeScript to Luau
2. Output goes to `include/` directory
3. Rojo maps `include/` to game locations
4. @rbxts packages are mapped to ReplicatedStorage

## 📚 Additional Resources

- [roblox-ts Documentation](https://roblox-ts.com/)
- [Nx Documentation](https://nx.dev/)
- [Rojo Documentation](https://rojo.space/)
- [Roblox TypeScript Types](https://github.com/roblox-ts/types)

## 🎯 Next Steps

1. Install Rojo for studio integration
2. Add more @rbxts packages as needed
3. Set up testing with @rbxts/testez
4. Configure CI/CD for automated builds
5. Add linting with ESLint

---

Your roblox-ts Nx toolchain is now ready for development! 🎉
