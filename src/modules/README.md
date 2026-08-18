# Module boundaries

Mỗi module là một vertical slice trong modular monolith và có thể dùng các thư mục sau khi cần:

```text
module/
  domain/          # entity, value, pure rule
  ports/           # contract nhỏ do use case cần
  application/     # use case, orchestration
  infrastructure/  # persistence/external implementation
  adapters/        # framework/platform adapter
  presentation/    # provider, controller, view model
  composition/     # chọn và wire implementation
```

Hướng import hợp lệ:

```text
domain <- ports <- application
domain/ports <- infrastructure
application/ports <- presentation
application + infrastructure <- composition
```

Quy tắc thực hành:

- Domain không import framework, storage, presentation hoặc composition.
- Port ưu tiên interface nhỏ theo consumer; không tạo “god repository”.
- Application nhận dependency qua tham số factory và không khởi tạo adapter cụ thể.
- Infrastructure không chứa UI hoặc route decision.
- Route Next/Expo chỉ chọn controller và route id.
- Import UI qua `@/src/components`; không sửa hoặc import internal TypeScript file của package đó.
- Khi thêm module, giữ dependency direction rõ ràng và bổ sung test kiến trúc khi boundary mới thực sự cần thiết.

## Ánh xạ kiến trúc

| Nguyên tắc | Cách áp dụng trong codebase |
| --- | --- |
| Modular Monolith | `src/modules/<module>` là vertical slice; chỉ composition root được chọn adapter cụ thể. |
| Clean/Onion | Domain và application hướng vào trong; infrastructure, presentation và framework nằm ngoài. |
| Hexagonal | `ports/` chứa inbound use-case port và output port nhỏ; `infrastructure/` triển khai output port. |
| MVC | Domain là Model, presentation hook/provider là Controller, `src/views`/`src/features` là View. |
| Serverless/FaaS | `app/api/**/route.ts` chỉ chuyển HTTP request/response tới application facade từ composition. |
| ISP/DIP | View nhận `LibraryDiagnosticsPort` hoặc `LibraryActionsPort`, không import adapter/singleton. |
| SRP | Mỗi Expo capability có adapter riêng: content, diagnostics, external, feedback và location. |
| OCP | Thêm adapter hoặc platform mới bằng cách implement port và thay wiring ở composition. |
| Cache-aside | Shared loader cache promise, deduplicate request đồng thời và evict promise bị reject. |
| Lazy Loading | Route screen và component demo được dynamic import, preload theo intent và cache qua port. |

`src/architecture/moduleBoundaries.test.ts` bảo vệ dependency direction; `src/architecture/routeParity.test.ts` bảo vệ parity giữa Next.js và Expo tự động trong CI.
