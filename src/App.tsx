import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [convertedText, setConvertedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const arabicToEnglish: { [key: string]: string } = {
    ض: 'q',
    ص: 'w',
    ث: 'e',
    ق: 'r',
    ف: 't',
    غ: 'y',
    ع: 'u',
    ه: 'i',
    خ: 'o',
    ح: 'p',
    ج: '[',
    د: ']',
    ش: 'a',
    س: 's',
    ي: 'd',
    ب: 'f',
    ل: 'g',
    ا: 'h',
    ت: 'j',
    ن: 'k',
    م: 'l',
    ك: ';',
    ط: "'",
    ئ: 'z',
    ء: 'x',
    ؤ: 'c',
    ر: 'v',
    لا: 'b',
    ى: 'n',
    ة: 'm',
    و: ',',
    ز: '.',
    ظ: '/',
    ذ: '`',
    آ: '~',
  };

  const englishToArabic: { [key: string]: string } = {
    q: 'ض',
    w: 'ص',
    e: 'ث',
    r: 'ق',
    t: 'ف',
    y: 'غ',
    u: 'ع',
    i: 'ه',
    o: 'خ',
    p: 'ح',
    '[': 'ج',
    ']': 'د',
    a: 'ش',
    s: 'س',
    d: 'ي',
    f: 'ب',
    g: 'ل',
    h: 'ا',
    j: 'ت',
    k: 'ن',
    l: 'م',
    ';': 'ك',
    "'": 'ط',
    z: 'ئ',
    x: 'ء',
    c: 'ؤ',
    v: 'ر',
    b: 'لا',
    n: 'ى',
    m: 'ة',
    ',': 'و',
    '.': 'ز',
    '/': 'ظ',
    '`': 'ذ',
    '~': 'آ',
  };

  const convertText = (inputText: string): string => {
    const hasArabic = /[\u0600-\u06FF]/.test(inputText);
    const hasEnglish = /[a-zA-Z]/.test(inputText);

    let converted = '';

    if (hasArabic && !hasEnglish) {
      converted = inputText
        .split('')
        .map((char: string) => arabicToEnglish[char] || char)
        .join('');
    } else if (hasEnglish && !hasArabic) {
      converted = inputText
        .split('')
        .map((char: string) => englishToArabic[char.toLowerCase()] || char)
        .join('');
    } else {
      const arabicConverted = inputText
        .split('')
        .map((char: string) => arabicToEnglish[char] || char)
        .join('');

      const englishConverted = inputText
        .split('')
        .map((char: string) => englishToArabic[char.toLowerCase()] || char)
        .join('');

      const arabicChanges =
        inputText.length -
        arabicConverted
          .split('')
          .filter((char: string, i: number) => char === inputText[i]).length;
      const englishChanges =
        inputText.length -
        englishConverted
          .split('')
          .filter((char: string, i: number) => char === inputText[i]).length;

      converted =
        arabicChanges > englishChanges ? arabicConverted : englishConverted;
    }

    return converted;
  };

  const handleSubmit = () => {
    if (!text.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      const result = convertText(text);
      setConvertedText(result);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(convertedText);
  };

  const handleClear = () => {
    setText('');
    setConvertedText('');
  };

  return (
    <>
      <div className='container'>
        <h1>Fix your typing</h1>
        <p>
          Enter your text regardless of the language and it will be fixed for
          other language (English and Arabic ONLY!)
        </p>
        <p className='subtitle'>
          Automatic keyboard layout detection & conversion
        </p>
      </div>

      <div className='form-container'>
        <div className='input-section'>
          <label className='input-label'>Input Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type here... e.g., 'asgd' becomes 'مسجد' or 'شخصخ' becomes 'hello'"
            disabled={isLoading}
            className='input-textarea'
          />
        </div>

        <div className='button-group'>
          <button
            onClick={handleSubmit}
            className={isLoading ? 'loading' : ''}
            disabled={isLoading || !text.trim()}
          >
            {isLoading ? '' : 'Convert Text'}
          </button>
          <button
            onClick={handleClear}
            className='secondary-btn'
            disabled={isLoading}
          >
            Clear
          </button>
        </div>

        {convertedText && (
          <div className='output-section'>
            <label className='input-label'>Converted Text</label>
            <div className='output-container'>
              <textarea
                value={convertedText}
                readOnly
                className='output-textarea'
              />
              <button
                onClick={handleCopy}
                className='copy-btn'
                title='Copy to clipboard'
              >
                📋
              </button>
            </div>
          </div>
        )}
      </div>

      <div className='scroll-indicator'></div>
    </>
  );
}

export default App;
