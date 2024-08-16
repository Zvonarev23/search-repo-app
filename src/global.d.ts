// Определяем тип для импорта CSS-модулей с расширением `.module.sass`

declare module '*.module.sass' {
	interface IClassNames {
		[className: string]: string;
	}
	const classNames: IClassNames;
	export = classNames;
}