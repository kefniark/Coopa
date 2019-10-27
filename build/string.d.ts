interface String {
    capitalize: () => string;
    capitalizeWords: () => string;
    contains: (val: string) => boolean;
    slugify: (lower?: boolean) => string;
}
interface StringConstructor {
    isNullOrEmpty: (val: any) => boolean;
}
