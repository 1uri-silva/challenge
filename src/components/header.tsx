import { useSearchParams } from 'react-router-dom';

export function Header() {

  const [urlParams, setUrlParams] = useSearchParams();

  return (
    <header className="max-w-[1200px] mx-auto flex items-center justify-between border-b">
      <div className="flex flex-col items-center gap-3 p-1.5">
        <img
          src="https://i.pravatar.cc/300"
          alt="avatar"
          className="w-12 h-12 rounded-full"
        />
        <span className="font-bold text-center text-lg">challenge</span>
      </div>

      <button
        type="button"
        onClick={() => setUrlParams((prev) => {
          prev.set('_dialog', String(!!urlParams))

          return prev
        })}
        className="rounded text-center bg-blue-600 p-2"
      >
        New Challenge
      </button>
    </header>
  )
}