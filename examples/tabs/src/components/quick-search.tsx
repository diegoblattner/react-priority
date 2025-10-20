/** biome-ignore-all lint/suspicious/noExplicitAny: <needed for infering function params> */
import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "./field";

const searchId = "quick-search";
type QuickSearchProps = Readonly<{
	initialText?: string;
	onSearch: (text: string) => void;
	debounceMs?: number;
}>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type InferableFunction = (...args: any[]) => void;

function useDebounce<T extends InferableFunction>(
	fn: T,
	ms: number = 300,
): (...args: Parameters<T>) => void {
	const timeoutRef = useRef(0);

	const wrapper = useCallback(
		(...args: Parameters<T>) => {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = setTimeout(() => {
				fn(...args);
			}, ms);
		},
		[fn, ms],
	);

	return wrapper;
}

export function QuickSearch({
	initialText = "",
	onSearch,
	debounceMs,
}: QuickSearchProps) {
	const [text, setText] = useState(initialText);

	const debouncedSearch = useDebounce(onSearch, debounceMs);
	useEffect(() => {
		debouncedSearch(text);
	}, [debouncedSearch, text]);

	return (
		<div className="flex flex-col w-full py-4">
			<Input
				id={searchId}
				aria-label="Quick search"
				name="search"
				type="search"
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="Search..."
				className="bg-white border rounded px-3 py-2 w-full sm:max-w-80"
			/>
		</div>
	);
}
