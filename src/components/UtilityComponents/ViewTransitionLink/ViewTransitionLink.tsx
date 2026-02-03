"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ComponentProps, MouseEvent, useCallback } from "react";

type ViewTransitionLinkProps = ComponentProps<typeof Link>;

/**
 * A Link component that uses View Transitions API for smooth page navigation.
 * Falls back to normal navigation if View Transitions API is not supported.
 */
export default function ViewTransitionLink({
	href,
	onClick,
	children,
	...props
}: ViewTransitionLinkProps) {
	const router = useRouter();

	const handleClick = useCallback(
		(e: MouseEvent<HTMLAnchorElement>) => {
			// Call original onClick if provided
			onClick?.(e);

			// Don't intercept if default was prevented or modifier keys are pressed
			if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.shiftKey) {
				return;
			}

			// Don't intercept external links
			const url = typeof href === "string" ? href : href.pathname || "";
			if (url.startsWith("http") || url.startsWith("//")) {
				return;
			}

			e.preventDefault();

			// Use view transition if supported
			if (!document.startViewTransition) {
				router.push(url);
				return;
			}

			document.startViewTransition(() => {
				router.push(url);
			});
		},
		[href, onClick, router],
	);

	return (
		<Link href={href} onClick={handleClick} {...props}>
			{children}
		</Link>
	);
}
