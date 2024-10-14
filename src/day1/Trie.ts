class TrieNode {
    children: Map<string, TrieNode>;
    isEndOfWord: boolean;

    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
    }
}

export default class Trie {
    private root: TrieNode;
    constructor() {
        this.root = new TrieNode();
    }

    insert(item: string): void {
        let curr = this.root;
        for (const char of item) {
            if (!curr.children.has(char)) {
                curr.children.set(char, new TrieNode());
            }
            curr = curr.children.get(char)!;
        }
        curr.isEndOfWord = true;
    }

    private getMatches(
        node: TrieNode,
        partial: string,
        matches: string[],
    ): void {
        if (node.isEndOfWord) {
            matches.push(partial);
        }
        for (const [char, n] of node.children.entries()) {
            this.getMatches(n, partial + char, matches);
        }
    }
    find(partial: string): string[] {
        let matches: string[] = [];
        let curr = this.root;
        for (const char of partial) {
            if (!curr.children.has(char)) {
                return [];
            }
            curr = curr.children.get(char)!;
        }

        this.getMatches(curr, partial, matches);
        return matches;
    }

    private isWord(prefix: string): boolean {
        let curr = this.root;
        for (const char of prefix) {
            if (!curr.children.has(char)) return false;
            curr = curr.children.get(char)!;
        }
        return curr.isEndOfWord;
    }
    delete(item: string): void {
        this.deleteRecursive(this.root, item, 0);
    }

    private deleteRecursive(
        node: TrieNode,
        word: string,
        depth: number,
    ): boolean {
        if (depth === word.length) {
            if (!node.isEndOfWord) return false;

            node.isEndOfWord = false;
            return node.children.size === 0;
        }

        if (!node.children.get(word[depth])) {
            return false;
        }
        const shouldDeleteChildNode = this.deleteRecursive(
            node.children.get(word[depth])!,
            word,
            depth + 1,
        );

        if (shouldDeleteChildNode) {
            node.children.delete(word[depth]);

            return node.children.size === 0 && !node.isEndOfWord;
        }

        return false;
    }
}

