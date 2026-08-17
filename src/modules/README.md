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
- Khi thêm module, thêm rule vào `scripts/check-architecture.mjs` nếu xuất hiện một boundary mới.
