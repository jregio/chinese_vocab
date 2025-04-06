# Chinese Vocabulary Checker

A web application that helps you identify known Chinese characters and words from your vocabulary list.

## Features

- Paste any Chinese text and check it against your vocabulary lists
- Known characters/words are highlighted in light blue
- Unknown characters are highlighted in orange
- Multi-character words are detected (up to 4 characters)
- Hover over highlighted words to see pinyin and definition
- Visual statistics showing the breakdown of known vs unknown characters
- Support for two vocabulary sources (CI and YT)

## How to Use

1. Start the local server using one of the provided server options:
   - Node.js: `node server.js`
   - Python: `python server.py`
2. Open your browser and navigate to `http://localhost:3000`
3. Paste Chinese text into the textarea
4. Click "Check Vocabulary" button
5. The processed text will appear below with appropriate highlighting
6. Hover over blue highlighted characters to see their pronunciation and meaning
7. View character statistics to track your vocabulary coverage

## Vocabulary Files

The application uses two vocabulary files:

### 1. vocab_ci.txt
Main vocabulary list in tab-separated format:
```
character/word    pinyin    definition
```

Example:
```
你    nǐ    you
好    hǎo    good
你好    nǐ haǒ    hello
```

### 2. vocab_yt.txt
Secondary vocabulary list in the same format, used to track additional vocabulary sources.

## Notes

- The app checks combinations of up to 4 characters
- When multiple combinations are possible, it selects the longest match
- The application prioritizes finding words in the vocabulary lists rather than individual characters
- Statistics help you track your vocabulary coverage progress 