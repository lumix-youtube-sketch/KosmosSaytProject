# Тайны космоса

Образовательный сайт о космосе: космонавты, планеты, технологии из космоса.

## Запуск

```bash
npm install
npm run dev
```

Откроется на `http://localhost:8080`.

## Стек

- Vite + React 18 + TypeScript
- Tailwind CSS
- Framer Motion (анимации)
- React Router (навигация)
- React Query (данные)
- Lucide (иконки)

## Структура

```
src/
  components/   — переиспользуемые компоненты
  pages/       — страницы
  contexts/    — реакт-контексты
  assets/      — картинки
  lib/         — утилиты
```

## Если что-то сломалось

1. Останови сервер
2. Удали `node_modules` и `package-lock.json`
3. `npm install && npm run dev`
4. Если белый экран — открой DevTools (F12), посмотри вкладку Console

## Сборка

```bash
npm run build    # продакшен
npm run preview  # посмотреть результат локально
```
