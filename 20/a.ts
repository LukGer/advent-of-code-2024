const file = Bun.file("test.txt");
const text = await file.text();
const lines = text.split("\n");
