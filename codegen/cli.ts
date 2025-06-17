#!/usr/bin/env bun

import { Command } from 'commander';
import { XMLParser } from 'fast-xml-parser';
import { promises as fs } from 'fs';
import path from 'path';
import { mapDbToTsType, snakeToKebab } from './utils';
import { createColumnTypeContent, createTableInterfaceContent } from './template';

// ... (XmlColumnの型定義は変更なし)
export interface XmlColumn {
  '#text': string;
  comment: string;
  type: string;
  import?: string;
  pkey?: string;
}

// --- ファイル生成ロジック ---

/**
 * カラムファイルを生成します。
 */
async function generateColumnFile(column: XmlColumn, baseDir: string): Promise<void> {
  const kebabCaseName = snakeToKebab(column['#text']);
  const tsType = mapDbToTsType(column.type);
  const content = createColumnTypeContent(column, tsType);

  // 👇 指定ディレクトリ直下に <kebab-case-name>.ts ファイルを作成
  const filePath = path.join(baseDir, `${kebabCaseName}.ts`);
  await fs.writeFile(filePath, content, 'utf8');
  console.log(`✅ カラムの型を作成しました: ${filePath}`);
}

/**
 * テーブルファイルを生成します。
 */
async function generateTableFile(table: any, baseDir: string): Promise<void> {
  const tableName = table.name.split('.').pop() ?? 'table';
  const tableDir = path.join(baseDir, 'table');
  await fs.mkdir(tableDir, { recursive: true });

  const columns: XmlColumn[] = Array.isArray(table.column) ? table.column : [table.column];
  const content = createTableInterfaceContent(table, columns);

  const filePath = path.join(tableDir, `${tableName}.ts`);
  await fs.writeFile(filePath, content, 'utf8');
  console.log(`✅ テーブルのInterfaceを作成しました: ${filePath}`);
}

async function main() {
  const program = new Command();

  program
    .name('schema2typia')
    .description('XMLスキーマからTypiaのコードを生成します。')
    .version('1.0.0')
    .requiredOption('-t, --table <name>', 'スキーマ内のテーブル名 (例: "temairazu.hotel")')
    .requiredOption('-d, --dir <path>', '生成されたファイルを出力するディレクトリ')
    .argument('<schema_file>', 'スキーマXMLファイルのパス');

  program.parse(process.argv);

  const options = program.opts();
  const schemaPath = program.args[0];
  const { table: targetTableName, dir: targetDir } = options;

  try {
    await fs.mkdir(targetDir, { recursive: true });

    const xmlData = await fs.readFile(schemaPath, 'utf8');
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '',
      textNodeName: '#text',
    });
    const schema = parser.parse(xmlData);

    const tables = Array.isArray(schema.schema.table) ? schema.schema.table : [schema.schema.table];
    const tableInfo = tables.find((t: any) => t.name === targetTableName);

    if (!tableInfo) {
      console.error(`❌ エラー: テーブル "${targetTableName}" が ${schemaPath} に見つかりません。`);
      process.exit(1);
    }

    const columns: XmlColumn[] = Array.isArray(tableInfo.column) ? tableInfo.column : [tableInfo.column];
    for (const column of columns) {
      await generateColumnFile(column, targetDir);
    }

    await generateTableFile(tableInfo, targetDir);

    console.log(`\n✨ Typiaコードの生成が完了しました: "${targetDir}"`);

  } catch (error) {
    console.error('予期せぬエラーが発生しました:', error);
    process.exit(1);
  }
}

main();