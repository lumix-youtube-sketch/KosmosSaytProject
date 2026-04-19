import { useLocation, Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="text-center">
        <h1 className="font-heading text-[8rem] leading-none text-stroke mb-4">404</h1>
        <p className="font-display text-sm tracking-widest uppercase text-muted-foreground mb-2">Страница не найдена</p>
        <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
          Похоже, вы попали в пустоту между галактиками. Эта страница не существует.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-full border border-primary/40 text-xs font-display tracking-widest uppercase text-primary hover:bg-primary/10 transition-all"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};

export default NotFound;