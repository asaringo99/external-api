import type { XmlColumn } from './cli';
import { snakeToCamel, snakeToKebab, snakeToPascal } from './utils';

/**
 * カラム用の型定義ファイルの内容を生成します。
 */
// ... (createColumnTypeContent関数は変更なし)
export function createColumnTypeContent(column: XmlColumn, tsType: string): string {
  const pascalCaseName = snakeToPascal(column['#text']);
  const needsTags = tsType.includes('tags.');

  return `${needsTags ? 'import type { tags } from "typia";\n\n' : ''}/**
 * ${column.comment}
 */
export type ${pascalCaseName} = ${tsType};
`;
}

/**
 * テーブル用のInterfaceファイルの内容を生成します。
 */
export function createTableInterfaceContent(table: any, columns: XmlColumn[]): string {
  const tableName = table.name.split('.').pop() ?? 'table';
  const interfaceName = `${snakeToPascal(tableName)}`;

  const imports = columns
    .map(col => {
      const colName = col['#text'];
      return `import type { ${snakeToPascal(colName)} } from "../${snakeToKebab(colName)}";`;
    })
    .join('\n');

  const properties = columns
    .map(col => {
      const colName = col['#text'];
      return `    /**
     * ${col.comment}
     */
    ${snakeToCamel(colName)}: ${snakeToPascal(colName)};`;
    })
    .join('\n');

  return `import typia from "typia";
${imports}

/**
 * ${table.comment}
 */
export interface ${interfaceName} {
${properties}
}

export const assert${interfaceName} = typia.createAssert<${interfaceName}>();
export const is${interfaceName} = typia.createIs<${interfaceName}>();
export const validate${interfaceName} = typia.createValidate<${interfaceName}>();
`;
}