/**
 * Remove the starting index from a file name
 * @example "2. Hello" => "Hello"
 */
export function removeFileNameIndex(fileName: string): string {
	const match = fileName.match(/^(\d+\.\s*)(.*)\s*$/);
	return match ? match[2] : fileName;
}
