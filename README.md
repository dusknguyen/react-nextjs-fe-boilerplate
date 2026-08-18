# Expo + Next.js + React Native Boilerplate

Một codebase dùng chung UI React Native cho:

- Expo / Android / iOS
- Expo Web
- Next.js App Router
- NativeWind 4 + Tailwind CSS 3
- TypeScript strict

## Yêu cầu

- Node.js >= 22.13.0
- npm

Project chỉ giữ `package-lock.json` để tránh lệch dependency giữa npm và Yarn.

## Cài đặt

```bash
npm ci
```

## Chạy project

### Next.js

```bash
npm run dev
```

### Expo

```bash
npm run expo:start
```

Hoặc:

```bash
npm run expo:android
npm run expo:ios
npm run expo:web
```

## Kiểm tra trước khi commit

```bash
npm run check
```

`check` chạy lần lượt:

1. TypeScript cho shared/Expo và Next.js.
2. ESLint.
3. Jest.

## Styling

Project dùng hai lớp styling, mỗi lớp có nhiệm vụ riêng:

### NativeWind

Dùng `className` cho style tĩnh và style phụ thuộc UI state:

- spacing, flexbox, typography
- responsive breakpoint
- dark mode
- hover/focus/active trên web
- theme token

Ví dụ:

```tsx
<View className="flex-1 items-center justify-center bg-white dark:bg-slate-950">
  <Text className="text-lg font-bold text-slate-950 dark:text-white">Hello</Text>
</View>
```

### React Native StyleSheet

Dùng `StyleSheet` cho style native đặc biệt hoặc giá trị runtime mà utility class không phù hợp, ví dụ `StyleSheet.absoluteFillObject`.

Không tạo object style tĩnh mới trong mỗi lần render nếu có thể đưa ra ngoài component.

Animation vẫn dùng `style` vì giá trị `Animated.Value` thay đổi ở runtime.

## Cấu hình NativeWind

- `babel.config.js`: Babel preset cho Expo.
- `metro.config.js`: `withNativeWind` cho Metro.
- `tailwind.native.config.js`: scan source Expo/native.
- `tailwind.config.js`: scan cả Next.js `app/` và shared `src/`, đồng thời tăng CSS specificity cho web.
- `style/global.css`: Tailwind directives dùng chung.
- `nativewind-env.d.ts`: type augmentation cho `className`.

## Cấu trúc chính

```text
app/                         # Next.js routes
src/app/                     # Expo Router routes
src/components/              # Shared React Native UI
src/composition/providers/   # App-level providers
src/features/                # Feature composition / demo pages
src/modules/                 # Domain + application + adapters
src/shared/                  # Shared infrastructure
src/views/                   # Shared page views
style/                       # Global Tailwind CSS
```

Next.js và Expo chỉ giữ router adapter mỏng. Nội dung màn hình nằm trong `src/views` để không nhân đôi UI.

`appRoutes` và `appRouteAliases` trong `src/modules/navigation/domain/appRoute.ts` là route contract dùng chung. Hiện Next.js và Expo cùng cung cấp 19 trang canonical và 5 alias; `routeParity.test.ts` kiểm tra cả URL lẫn shared screen id. Loading, not-found và error UI cũng dùng chung view. Route Handler `/api/health` là delivery adapter Serverless/FaaS riêng của Next.js; nó không phải trang điều hướng và Expo Web vẫn giữ chế độ static export.

## Component demo

Catalog tương tác nằm tại `/ui` trên Next.js và Expo Web. Demo được tổ chức theo capability trong `src/features/gallery/component-demo/`:

- Mỗi section import trực tiếp các component cần dùng và tự quản lý state.
- Section được lazy-load, cache promise và preload khi hover/chọn tab.
- Tab `Universal toolkit` minh họa semantic UI, animation, collection, mobile, desktop và platform primitives.
- Metadata catalog là nguồn duy nhất cho filter, nhãn và số lượng API demo.

Route tương thích `/components` tự chuyển hướng về `/ui`.

## Scripts

```text
npm run dev                  Next.js development
npm run build                Next.js production build
npm run start                Start Next.js production server
npm run lint                 ESLint
npm run typecheck            TypeScript + Next route type generation
npm run test                 Jest
npm run test:architecture    Kiểm tra dependency direction và module boundaries
npm run test:watch           Jest watch mode
npm run check                Typecheck + lint + test
npm run doctor               Expo dependency/configuration diagnostics
npm run verify               Check + Next production build + Expo Web export
npm run expo:start           Expo development server
npm run expo:android         Expo Android
npm run expo:ios             Expo iOS
npm run expo:web             Expo Web
```

## Chính sách dependency

- Dùng `package-lock.json` và npm; không duy trì nhiều lockfile song song.
- Expo/RN package theo phiên bản do SDK 57 xác nhận qua `npx expo install --check`.
- Package thuần JavaScript dùng bản stable mới nhất trong peer-dependency range.
- Không tự động dùng preview/canary hoặc `npm audit fix --force` vì có thể phá ABI native.
- NativeWind 4 stable đi cùng Tailwind CSS 3.4; NativeWind 5/Tailwind 4 chỉ được nâng khi bản stable được phát hành.
