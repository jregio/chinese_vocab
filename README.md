# Chinese Vocabulary Checker

A simple web application that helps you identify known Chinese characters and words from your vocabulary list.

## Features

- Paste any Chinese text and check it against your vocabulary list
- Known characters/words are highlighted in light blue
- Unknown characters are highlighted in orange
- Multi-character words are detected (up to 4 characters)
- Hover over highlighted words to see pinyin and definition

## How to Use

1. Open `index.html` in a web browser
2. Paste Chinese text into the textarea
3. Click "Check Vocabulary" button
4. The processed text will appear below with appropriate highlighting
5. Hover over blue highlighted characters to see their pronunciation and meaning

## Vocabulary File

The application uses `vocab_ci.txt` which should be in the tab-separated format:
```
character/word    pinyin    definition
```

Example:
```
你    nǐ    you
好    hǎo    good
你好    nǐ haǒ    hello
```

## Notes

- The app checks combinations of up to 4 characters
- When multiple combinations are possible, it selects the longest match
- Make sure the vocab_ci.txt file is in the same directory as the HTML file 