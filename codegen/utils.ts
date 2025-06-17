/**
 * snake_case を camelCase に変換します。
 * @param str snake_case の文字列
 * @returns camelCase の文字列
 */
export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, g => g[1].toUpperCase());
}

/**
 * snake_case を PascalCase に変換します。
 * @param str snake_case の文字列
 * @returns PascalCase の文字列
 */
export function snakeToPascal(str: string): string {
  const camel = snakeToCamel(str);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

/**
 * snake_case を kebab-case に変換します。 (👈 追加)
 * @param str snake_case の文字列
 * @returns kebab-case の文字列
 */
export function snakeToKebab(str: string): string {
  return str.replace(/_/g, '-');
}

/**
 * DBの型を Typia タグ付きの TypeScript 型にマッピングします。
 * @param dbType DBの型文字列 (例: "varchar(255)")
 * @returns 対応するTypeScriptの型文字列
 */
export function mapDbToTsType(dbType: string): string {
  const varcharMatch = dbType.match(/varchar\((\d+)\)/);
  if (varcharMatch) {
    const length = varcharMatch[1];
    if (length === '65535') {
      return 'string';
    }
    return `string & tags.MaxLength<${length}>`;
  }

  switch (dbType.toLowerCase()) {
    case 'int':
    case 'integer':
      return 'number & tags.Type<"integer">';
    case 'text':
      return 'string';
    default:
      return 'string';
  }
}